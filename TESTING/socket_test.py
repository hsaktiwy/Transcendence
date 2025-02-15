# import requests
# import asyncio
# import websockets

# error = []

# def login(session, login_url, credentials):
#     """
#     Function to login to the website.

#     Arguments:
#         session: requests.Session() object.
#         login_url: the login endpoint URL.
#         credentials: a dictionary with login fields; adjust as required.

#     Returns:
#         True if login was successful, else False.
#     """
#     try:
#         # Perform the login -- adjust method and fields as required by your site.
#         response = session.post(login_url, data=credentials, verify=False)
#         response.raise_for_status()
#         print(f"Login successful! Status code: {response.status_code}")
#         return True
#     except requests.RequestException as e:
#         print(f"Login failed: {e}")
#         return False

# async def connect_websocket(token: str):
#     ws_url = "wss://localhost:4444/api/ws/chat/"
#     headers = [("Authorization", f"Bearer {token}")]

#     try:
#         async with websockets.connect(ws_url, extra_headers=headers) as websocket:
#             await websocket.send("Hello from Python with JWT!")
#             print("Message sent over WebSocket.")
#             response = await websocket.recv()
#             print(f"Received WebSocket response: {response}")
#     except Exception as e:
#         error.append(f"Error during WebSocket communication: {e}")

# async def operate():
#     # username = "Baki@gmail.com"
#     # password = "Hamza@123"
#     print("Starting operation...")
#     session = requests.Session()
#     host = "https://localhost:4444"
#     login_url = host + "/api/api/user/login/"  # Replace with your login URL
#     credentials = {
#         "email": "Baki@gmail.com",
#         "password": "Hamza@123"
#     }
#     try:
#         token = login(session, login_url, credentials)  # Await the authenticate function
#         print(token)
#         if token:
#             await connect_websocket(token)
#         else:
#             error.append("No token received, cannot connect to WebSocket.")
#     except Exception as e:
#         error.append(f"An error occurred: {e}")

# if __name__ == "__main__":
#     print("Starting the script...")
#     asyncio.run(operate())

#     # Print all collected error messages at the end
#     if error:
#         print("Errors encountered during the process:")
#         for err in error:
#             print(err)

#         # Write errors to a file
#         with open("error_log.txt", "w") as error_file:
#             for err in error:
#                 error_file.write(err + "\n")
#         print("Errors have been logged to error_log.txt.")
#     else:
#         print("No errors encountered.")
    
import requests
import asyncio
import websockets
import ssl
def authenticate(username: str, password: str):
    """
    Authenticate with Django to obtain both CSRF and JWT tokens.

    The process assumes:
      1. A preliminary GET request is made to obtain the CSRF cookie.
      2. A POST request to the JWT endpoint sends credentials along with the CSRF token.
      3. The response sets the JWT access token in the cookies.

    Adjust URLs and cookie names as needed for your Django setup.
    """
    # Create a session to persist cookies
    session = requests.Session()

    # Step 1: GET a page to retrieve the CSRF token in the cookies.
    # Adjust the URL to one that sets the CSRF token.
    # csrf_url = "https://localhost:4444/api/cookie"
    # session.get(csrf_url)

    # Retrieve the CSRF token from the cookies; it's typically named "csrftoken".
    # # csrf_cookie = session.cookies.get("csrftoken")
    # if not csrf_cookie:
    #     raise RuntimeError("CSRF token was not retrieved from the initial request.")

    # Step 2: Authenticate using JWT by sending credentials.
    auth_url = "https://localhost:4444/api/api/user/login/"
    payload = {"email": username, "password": password}

    # Include the CSRF token in the headers
    # headers = {"X-CSRFToken": csrf_cookie}

    response = session.post(auth_url, data=payload, verify=False)
    if response.status_code != 200:
        raise RuntimeError(
            f"Authentication failed: {response.status_code}. Details: {response.text}"
        )

    # Depending on configuration, the JWT might be returned in the JSON response
    # or set as a cookie (here, we assume it is also set as a cookie named 'access_token').
    access_token = session.cookies.get("access_token", None)
    csrf_cookie = session.cookies.get("csrftoken")

    # As a fallback, you might also check the JSON payload for an "access" token.
    if not access_token:
        access_token = response.json().get("access")

    if not access_token:
        raise RuntimeError("Access token was not retrieved during authentication.")

    print("Authentication successful.")
    return csrf_cookie, access_token

async def connect_websocket(csrf_token: str, access_token: str):
    """
    Connect to the Django WebSocket endpoint using the JWT and CSRF tokens.

    The Django backend expects:
      - The CSRF token in the header under 'X-CSRFToken'
      - A Cookie header containing both 'csrftoken' and 'access_token'

    The tokens are passed in the header accordingly.
    """
    # Replace with your actual WebSocket URL.
    ws_url = "wss://localhost:4444/api/ws/chat/"

    # Construct the Cookie header value.
    cookie_value = f"csrftoken={csrf_token}; access_token={access_token}"

    # Prepare the headers required by your Django server.
    headers = [
        ("X-Csrftoken", csrf_token),
        ("Cookie", cookie_value),
    ]

    ssl_context = ssl.SSLContext(ssl.PROTOCOL_TLS_CLIENT)
    ssl_context.check_hostname = False
    ssl_context.verify_mode = ssl.CERT_NONE
    try:
        async with websockets.connect(ws_url, additional_headers=headers, ssl=ssl_context) as websocket:
            print("Connected to WebSocket. You can start sending messages.")
            while True:
                data = input("Enter message (type 'exit' to quit): ")
                if data.lower() == "exit":
                    break

                await websocket.send(data)
                print("Message sent over the WebSocket.")

                # Wait for a response from the server with a timeout
                try:
                    response = await asyncio.wait_for(websocket.recv(), timeout=0.2)  # 5 seconds timeout
                    print("Received response:", response)
                except asyncio.TimeoutError:
                    print("No response received within the timeout period. You can send another message.")
                except websockets.exceptions.ConnectionClosed as e:
                    print("Connection closed:", e)
                    break
                except Exception as e:
                    print("Error receiving response:", e)
                    break

    except Exception as e:
        print("WebSocket error:", e)
def main():
    """
    Orchestrates the authentication and WebSocket connection.
    """
    # Replace with your valid Django credentials.
    username = "Baki@gmail.com"
    password = "Hamza@123"

    try:
        # Step 1: Authenticate and retrieve tokens.
        csrf_token, access_token = authenticate(username, password)

        # Step 2: Connect to the WebSocket using the retrieved tokens.
        asyncio.run(connect_websocket(csrf_token, access_token))
    except Exception as e:
        print("An error occurred:", e)

if __name__ == "__main__":
    main()