// Login.tsx
import React, { useState } from 'react';
import { Backend } from '../utils/Contants';
import { getCookie } from './Cookie';
import { useEffect } from 'react';

const Login = () => {
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [csrfToken, setCsrfToken] = useState<string>('');

    useEffect(() => {
        const fetchCsrfToken = async () => {
            const csrft = await getCookie('csrftoken');
            setCsrfToken(csrft);
        };

        fetchCsrfToken();
    }, []);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const url:string = Backend + "auth/login/"
        const credential  :string = `username=${username}&password=${password}`
        //console.log("csrft : " + csrfToken + " " + credential)
        try{
            console.log("csrft : " + csrfToken + " " + credential)
            const response = await fetch(url, 
                {
                    method: 'POST',
                    headers:
                    {
                        'Content-Type': "application/json",
                        'X-CSRFToken' : csrfToken,
                        'Cookie' : "csrftoken="+csrfToken
                    }
                    ,
                    credentials: "same-origin",
                    body: JSON.stringify({username: username, password: password}),
                });
            if (!response.ok)
                throw new Error(`HTTP error! Status: ${response.status}`)
            const jsonformat = response.json();
            console.log(jsonformat);
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
