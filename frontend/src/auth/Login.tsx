// Login.tsx
import React, { useContext, useEffect, useState } from 'react';
import { BACKEND, LOGIN_PATH, INIT_CSRFTOKEN_PATH } from '../utils/Constants';
import {  cookies } from './Cookie';
import { useNavigate } from 'react-router-dom';
import mailman from '../utils/AxiosFetcher'
// import { user_id } from '../utils/Constants';
import { UserContext } from '../components/UserContext';
const Login = () => {
    const Navigate = useNavigate();
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    // const userContextConsumer = useContext(UserContext)
    // if (!userContextConsumer)
    //     throw new Error("useUser must be used within a UserProvider");
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const url:string = BACKEND + LOGIN_PATH
        const credential  :string = `username=${username}&password=${password}` 
        let csrfToken:string = cookies.get('csrftoken');
        console.log("ola : " + csrfToken)
        // this code part will check if we have csrftoken in cookies else we demand new one from the backend 
        if (!csrfToken || csrfToken.length == 0)
        {
            try {
                const url = BACKEND + INIT_CSRFTOKEN_PATH;
                const request = {
                        url: url,
                        method: 'GET',
                        withCredentials: true
                }
                const response = await mailman(request)
                const data = response.data;
                csrfToken = data.csrfToken;
                console.log('CSRF Token:', csrfToken);
            } catch (error) {
                console.error('Error fetching CSRF token:', error);
            }
        }
        if (csrfToken.length > 0)
        {
            try{
                console.log("csrft : " + csrfToken + " " + credential)
                const request = {
                    url: url,
                    method: 'POST',
                    headers:
                    {
                        "Content-Type": "application/x-www-form-urlencoded",
                        'X-CSRFToken' : csrfToken,
                    },
                    data: credential,
                    withCredentials: true,
                }
                const response = await mailman(request)
                // userContextConsumer?.setUserId(response.data['user_id'])
                console
                localStorage.setItem("id", response.data['user_id'])
                Navigate('/')
            }
            catch (err)
            {   
                console.error("Error : \n" + err)
            }
        }
    }

    return (
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
        </div>
    );
};

export default Login;
