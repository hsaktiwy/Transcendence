// Login.tsx
import React, { useContext, useEffect, useState } from 'react';
import { BACKEND, LOGIN_PATH, INIT_CSRFTOKEN_PATH } from '../utils/Constants';
import { cookies } from './Cookie';
import { useNavigate } from 'react-router-dom';
import mailman from '../utils/AxiosFetcher'
// import { user_id } from '../utils/Constants';
import { toast } from 'sonner'
import { UserContext } from '../components/UserContext';
import { AuthContext, LoginDataInterface, LoginError, LoginResp } from '@/components/AuhtenticationContext';
import LoadingIndecator from '@/components/Loading';
import { resolve } from 'path';

const Loading__ = () => {
    return (
        <div role="status">
            <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
            </svg>
            <span className="sr-only">Loading...</span>
        </div>
    )
}

const Login = () => {
    const AuthContextConsummer = useContext(AuthContext)
    if (!AuthContextConsummer)
        throw new Error("invalid scope");
    const Navigate = useNavigate();
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false)
    // // const userContextConsumer = useContext(UserContext)
    // // if (!userContextConsumer)
    // //     throw new Error("useUser must be used within a UserProvider");
    // const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    //     event.preventDefault();
    //     const url:string = BACKEND + LOGIN_PATH
    //     const credential  :string = `username=${username}&password=${password}` 
    //     let csrfToken:string = cookies.get('csrftoken');
    //     console.log("ola : " + csrfToken)
    //     // this code part will check if we have csrftoken in cookies else we demand new one from the backend 
    //     if (!csrfToken || csrfToken.length == 0)
    //     {
    //         try {
    //             const url = BACKEND + INIT_CSRFTOKEN_PATH;
    //             const request = {
    //                     url: url,
    //                     method: 'GET',
    //                     withCredentials: true
    //             }
    //             const response = await mailman(request)
    //             const data = response.data;
    //             csrfToken = data.csrfToken;
    //             console.log('CSRF Token:', csrfToken);
    //         } catch (error) {
    //             console.error('Error fetching CSRF token:', error);
    //         }
    //     }
    //     if (csrfToken.length > 0)
    //     {
    //         try{
    //             console.log("csrft : " + csrfToken + " " + credential)
    //             const request = {
    //                 url: url,
    //                 method: 'POST',
    //                 headers:
    //                 {
    //                     "Content-Type": "application/x-www-form-urlencoded",
    //                     'X-CSRFToken' : csrfToken,
    //                 },
    //                 data: credential,
    //                 withCredentials: true,
    //             }
    //             const response = await mailman(request)
    //             // userContextConsumer?.setUserId(response.data['user_id'])
    //             console
    //             localStorage.setItem("id", response.data['user_id'])
    //             Navigate('/')
    //         }
    //         catch (err)
    //         {   
    //             console.error("Error : \n" + err)
    //         }
    //     }
    // }
    const handleSubmitWith42 = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        window.location.href =
            "https://api.intra.42.fr/oauth/authorize?client_id=u-s4t2ud-c6b6242240c2da879e3afe370e67288527613cf82675711a26a3e860f8cc74d0&redirect_uri=http%3A%2F%2Flocalhost%3A5173%2Flogin&response_type=code";
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data: LoginDataInterface = {
            login: username,
            password: password
        }
        console.log(data)
        const resp = await AuthContextConsummer.LoginAction(data)
        if ('errorType' in resp) {
            interface tmp {
                non_field_errors: string[]
            }
            const tmpError = resp.errorType as tmp
            if(tmpError['non_field_errors'] !== undefined)
                toast.error(tmpError['non_field_errors'][0])
            console.log(resp.errorType)
        }
        else {
            toast.success(resp.message)
            console.log(resp)
            AuthContextConsummer.setLoggedIn(true)
            Navigate('/')
        }
    }

    useEffect(() => {
        if (AuthContextConsummer.loggedIn === true)
            Navigate('/')
        // else
        //     AuthContextConsummer.checkLoggedInUser()
    }, [AuthContextConsummer.loggedIn, Navigate])

    const loginwith42 = async (code: string | null) => {
        if (code) {
            setLoading(true)
            try {
                const req = {
                    url: '/api/LoginWithOAuth42/',
                    method: 'POST',
                    data: { code }

                }
                const resp = await mailman(req)

                if (resp.status === 200) {
                    // setLoading(false)
                    location.reload();
                }
                window.history.replaceState({}, document.title, window.location.pathname);
                // Navigate('/')

            }
            catch (error) {
                // setLoading(false);
                console.error('Error:', error)
            }
        }
    }
    useEffect(() => {
        const searchParams = new URLSearchParams(window.location.search);
        const code = searchParams.get('code');

        // if (code) {

        //     try {
        //         const req = {
        //             url : '/api/LoginWithOAuth42/',
        //             method : 'POST',

        //         }
        //         const resp = 
        //     }
        //     catch{

        //     }

        //     const

        //     fetch('http://localhost:8000/api/LoginWithOAuth42/', {
        //         method: 'POST',
        //         headers: {
        //             'Content-Type': 'application/json',
        //         },
        //         body: JSON.stringify({ code }),
        //     })
        //     .then(response => response.json())
        //     .then(data => {
        //         if (data) {
        //             console.log('data', data);
        //         }
        //         window.history.replaceState({}, document.title, window.location.pathname);
        //     })
        //     .catch(error => console.error('Error:', error));
        // }
        loginwith42(code)
    }, [AuthContextConsummer.loggedIn]);

    return (
        AuthContextConsummer.loggedIn != undefined ?
            <div className="flex items-center justify-center min-h-screen ">
                <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm">
                    <div className="mb-4">
                        <label htmlFor="username" className="block text-gray-700 font-bold mb-2">Username:</label>
                        <input
                            type="username"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                        />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="password" className="block text-gray-700 font-bold mb-2">Password:</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                        />
                    </div>
                    <button type="submit" className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600">
                        Login
                    </button>
                </form>
                <form onSubmit={handleSubmitWith42}>
                    <button type="submit" className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600">
                       {!loading ? " Login wih 42" : <Loading__/>}
                    </button>
                </form>
            </div> :
            <LoadingIndecator />

    );
};

export default Login;
