import requests
import os

def login(session, login_url, credentials):
    """
    Function to login to the website.

    Arguments:
        session: requests.Session() object.
        login_url: the login endpoint URL.
        credentials: a dictionary with login fields; adjust as required.

    Returns:
        True if login was successful, else False.
    """
    try:
        # Perform the login -- adjust method and fields as required by your site.
        response = session.post(login_url, data=credentials, verify=False)
        response.raise_for_status()
        print(f"Login successful! Status code: {response.status_code}")
        return True
    except requests.RequestException as e:
        print(f"Login failed: {e}")
        return False

def process_requests(session, request_file, response_file, host):
    """
    Reads requests from a given file, executes them using the active session,
    writes the responses to a file, and accumulates the status counts per request method.

    Arguments:
        session: the authenticated requests.Session() object.
        request_file: path to the file containing requests (one per line).
        response_file: path to the file where responses will be appended.

    File format expectation for request_file:
      Each line should contain a HTTP method and a URL, space-separated.
      Example: GET https://example.com/api/data
    """
    status_counts = {}  # Dictionary to accumulate status code counts per request method

    # Ensure response_file exists (open in append mode creates the file if it doesn't exist)
    with open(response_file, "a") as resp_f:
        # Open and process each line of the request file
        with open(request_file, "r") as req_f:
            for line in req_f:
                line = line.strip()
                if not line or line.startswith("#"):
                    # Skip any empty lines or comments
                    continue
                try:
                    # Expecting format: METHOD URL [optional extra info if needed]
                    # parts = line.split()
                    # if len(parts) < 2:
                    #     print(f"Skipping invalid line: {line}")
                    #     continue
                    methods = [
                        "GET",
                        "POST",
                        "PUT",
                        "DELETE",
                        "PATCH",
                        "HEAD",
                        "OPTIONS",
                        "TRACE",
                        "CONNECT"
                    ]
                    url = host + line

                    # Additional logic could be added here to handle request data or headers if needed
                    for method in methods:
                        # Send the request using the appropriate method
                        print(f"Sending {method} request to {url} ...")
                        resp = session.request(method, url)

                        # Write response details to file
                        resp_f.write("====================================\n")
                        resp_f.write(f"Request: {method} {url}\n")
                        resp_f.write(f"Status Code: {resp.status_code}\n")
                        resp_f.write("Response Body:\n")
                        # Write at most 500 characters of the response for brevity; modify if needed.
                        resp_f.write(resp.text[:500] + "\n\n")

                        # Update the status count for this method
                        if method not in status_counts:
                            status_counts[method] = {}
                        status_counts[method][resp.status_code] = status_counts[method].get(resp.status_code, 0) + 1

                except Exception as e:
                    print(f"Error processing line '{line}': {e}")

    return status_counts

def main():
    # Create a session which will maintain cookies and session info
    session = requests.Session()

    # Define login parameters -- modify these according to your website requirements
    host = "https://10.13.1.16:4444"
    login_url = host + "/api/api/user/login/"  # Replace with your login URL
    credentials = {
        "email": "Baki@gmail.com",
        "password": "Hamza@123"
    }

    if not login(session, login_url, credentials):
        print("Exiting due to login failure.")
        return

    # Define file names
    request_file = "request.txt"
    response_file = "responce.txt"  # As requested, using the spelling from your instructions

    # Check if the request file exists
    if not os.path.isfile(request_file):
        print(f"Request file '{request_file}' not found.")
        return

    # Process the requests and capture the status counts
    status_summary = process_requests(session, request_file, response_file, host)

    # Print the accumulated response status counts for each request method type
    print("\nResponse Status Summary per Request Method:")
    for method, counts in status_summary.items():
        print(f"{method}:")
        for status_code, count in counts.items():
            print(f"  {status_code}: {count}")

if __name__ == "__main__":
    main()