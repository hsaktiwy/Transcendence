// Login.tsx
import React, { useState } from 'react';
import { Backend } from '../utils/Contants';
import {  cookies } from './Cookie';
import { useEffect } from 'react';


const Login = () => {
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [csrfToken, setCsrfToken] = useState<string>('');

    useEffect(() => {
        const fetchCsrfToken = async () => {
            const csrft:string = cookies.get('csrftoken');
            console.log(csrft)
            if (!csrft || csrft.length == 0)
            {
                try {
                const url = Backend + "csrftoken/";
                const response = await fetch(url, { method: 'GET', credentials: 'include' });
        
                if (!response.ok) {
                    throw new Error('Failed to fetch CSRF token');
                }
        
                const data = await response.json();
                const token = data.csrfToken;
                setCsrfToken(token);
                cookies.set('csrftoken', csrft.toString())
                console.log('CSRF Token:', token); // Optional: Logging the token for verification
                } catch (error) {
                console.error('Error fetching CSRF token:', error);
                }
            }
            else
            {
                setCsrfToken(csrft)
            }
        };

        fetchCsrfToken();
    }, [csrfToken]);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const url:string = Backend + "auth/login/"
        const credential  :string = `username=${username}&password=${password}` //username=hsaktiwy1&password=1234
        //const csrft:string = cookies.get('csrftoken')
        //console.log("csrft : " + csrfToken + " " + credential)
        try{
            console.log("csrft : " + csrfToken + " " + credential)
            const response = await fetch(url, 
            {
                method: 'POST',
                headers:
                {
                    //'Content-Type': "application/json",
                    "Content-Type": "application/x-www-form-urlencoded",
                    'X-CSRFToken' : csrfToken,
                }
                ,
                credentials: "include",
                body: credential //JSON.stringify({username: username, password: password}),
            });
            if (!response.ok)
                throw new Error(`HTTP error! Status: ${response.status}`)
            if (response.ok)
                console.log("boomb has been planted ✅")
        }
        catch (err)
        {   
            console.error("Error : \n" + err)
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="username">Username:</label>
                <input
                    type="username"
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
            </div>
            <div>
                <label htmlFor="password">Password:</label>
                <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
            </div>
            <button type="submit">Login</button>
        </form>
    );
};

export default Login;
