// Login.tsx
import React, { useState } from 'react';
import { BACKEND, LOGIN_PATH, INIT_CSRFTOKEN_PATH } from '../utils/Contants';
import {  cookies } from './Cookie';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const Navigate = useNavigate();
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    // const [csrfToken, setCsrfToken] = useState<string>('');

    // useEffect(() => {
    //     const fetchCsrfToken = async () => {
            
    //     };

    //     fetchCsrfToken();
    // }, [csrfToken]);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const url:string = BACKEND + LOGIN_PATH
        const credential  :string = `username=${username}&password=${password}` //username=hsaktiwy1&password=1234
        //const csrft:string = cookies.get('csrftoken')
        //console.log("csrft : " + csrfToken + " " + credential)
        let csrfToken:string = cookies.get('csrftoken');
        console.log("ola : " + csrfToken)
        // this code part will check if we have csrftoken in cookies else we demand new one from the backend 
        if (!csrfToken || csrfToken.length == 0)
        {
            try {
                const url = BACKEND + INIT_CSRFTOKEN_PATH;
                const response = await fetch(url, { method: 'GET', credentials: 'include' });
        
                if (!response.ok) {
                    throw new Error('Failed to fetch CSRF token');
                }
        
                const data = await response.json();
                const token:string = data.csrfToken;
                if (response.ok)
                {
                    csrfToken = token
                    cookies.set('csrftoken', csrfToken)
                    console.log('CSRF Token:', token); // Optional: Logging the token for verification
                }
            } catch (error) {
                console.error('Error fetching CSRF token:', error);
            }
        }
        if (csrfToken.length > 0)
        {
            try{
                console.log("csrft : " + csrfToken + " " + credential)
                const response = await fetch(url, 
                {
                    method: 'POST',
                    headers:
                    {
                        "Content-Type": "application/x-www-form-urlencoded",
                        'X-CSRFToken' : csrfToken,
                    }
                    ,
                    credentials: "include",
                    body: credential
                });
                if (!response.ok)
                    throw new Error(`HTTP error! Status: ${response.status}`)
                if (response.ok)
                {
                    console.log("boomb has been planted ✅")
                    Navigate('/')
                }
            }
            catch (err)
            {   
                console.error("Error : \n" + err)
            }
        }
    }

    return (
        // <form onSubmit={handleSubmit}>
        //     <div>
        //         <label htmlFor="username">Username:</label>
        //         <input
        //             type="username"
        //             id="username"
        //             value={username}
        //             onChange={(e) => setUsername(e.target.value)}
        //             required
        //         />
        //     </div>
        //     <div>
        //         <label htmlFor="password">Password:</label>
        //         <input
        //             type="password"
        //             id="password"
        //             value={password}
        //             onChange={(e) => setPassword(e.target.value)}
        //             required
        //         />
        //     </div>
        //     <button type="submit">Login</button>
        // </form>
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
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
        </div>
    );
};

export default Login;
