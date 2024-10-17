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
import { LuEye } from "react-icons/lu";
import { LuEyeOff } from "react-icons/lu";

const Loading__ = () => {
    return (
        <div className="flex justify-center items-center h-full w-full ">
            <div className="w-[40px] h-[40px] border-4 border-[#5E97A9] border-solid border-t-transparent rounded-full animate-spin"></div>
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
    const handleSubmitWith42 = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
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
    const [hide, setHide] = useState<boolean>(true)

    return (
        AuthContextConsummer.loggedIn != undefined ?
            <div className="flex flex-col items-center justify-center min-h-screen font-poppins text-white">
                <form onSubmit={handleSubmit} className="bg-gradient-to-br from-[#323339] via-[#28292F] to-[#232628] p-6 rounded-lg shadow-lg w-full max-w-sm">
                    <div className='form-header text-center text-5xl font-semibold text-white/70 tracking-wider mb-10'>
                        <h1>LOGIN</h1>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="username" className="block text-white font-bold mb-2">Username:</label>
                        <input
                            autoComplete='off'
                            type="username"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                            className="bg-[#131313]/50 w-full px-3 py-2   outline-none rounded-2xl  duration-75 border border-[#131313]/50 focus:border-[#5E97A9]"
                        />
                    </div>
                    <div className="mb-6 relative ">
                        <label htmlFor="password" className="block text-white font-bold mb-2">Password:</label>
                        <input
                            type={hide  ? 'password' : 'text'}
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="bg-[#131313]/50 w-full px-3 py-2   outline-none rounded-2xl  duration-75 border border-[#131313]/50 focus:border-[#5E97A9]"
                        />
                        <div className='p-4 absolute right-1 -translate-y-[50%] top-[70%] cursor-pointer duration-75' onClick={() =>{
                            setHide(!hide)
                        }}>
                            {hide ? <LuEyeOff/> : <LuEye/>}
                        </div>
                    </div>
                    <div className='flex flex-col gap-6 mt-9'>

                        <button type="submit" className="w-full  bg-white text-black text-lg font-bold py-2 px-4 rounded  opacity-70 hover:opacity-100  duration-75">
                            Login
                        </button>
                        <button type="submit" className="w-full  bg-[#131313] text-white font-bold py-2 px-4 rounded opacity-70 hover:opacity-100  duration-75" onClick={handleSubmitWith42}>
                        {!loading ? <p >Login with <img src="42.png" alt="42-logo" className='inline-block mx-3'/></p> : <Loading__/>}
                        </button>
                    </div>
                </form>
                {/* <form onSubmit={handleSubmitWith42}>
                </form> */}
            </div> :
            <LoadingIndecator />

    );
};

export default Login;
