// Login.tsx
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import mailman from '../utils/AxiosFetcher'
import { toast } from 'react-toastify'
import { AuthContext, LoginDataInterface, LoginResp, LoginTFAResponse } from '@/components/AuhtenticationContext';
import LoadingIndecator from '@/components/Loading';
import { LuEye } from "react-icons/lu";
import { LuEyeOff } from "react-icons/lu";
import { motion } from 'framer-motion';
import TfaVerification from './TfaVerification';
import Username from './Username';

export const Loading__ = () => {
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
    const [email, setEmail] = useState<string>('');
    const [uuid, setUuid] = useState<string>('');
    const [oauth, setOauth] = useState<boolean>(false);
    const [code, _setCode] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false)
    const [tfaUser, setTfaUser] = useState<string | undefined>(undefined)
    const [needLogin, setNeedLogin] = useState<boolean |  undefined>(undefined)
    const handleSubmitWith42 = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.preventDefault();
        // console.log(import.meta.env.API_REDIRECT)
        window.location.href = import.meta.env.VITE_REDIRECT
    };
    const tryToLogin = async () =>{
        const data: LoginDataInterface = {
            email: email,
            password: password
        }
        console.log(data)
        const toastId = toast.loading("Loading");
        const resp = await AuthContextConsummer.LoginAction(data)
        if ('errorType' in resp) {
            interface tmp {
                non_field_errors: string[]
            }
            const tmpError = resp.errorType as tmp
            if(tmpError['non_field_errors'] !== undefined)
                toast.update(toastId, { render: tmpError['non_field_errors'][0], type: "error", isLoading: false, autoClose: 3000 });
            console.log(resp.errorType)
        }
        else {
            if (resp.message === 'username needed'){
                toast.update(toastId, { render: 'Please Enter a valid username', type: "info", isLoading: false, autoClose: 3000 });
                setNeedLogin(true)
            }
            else if (resp.message === 'tfa needed'){
                toast.update(toastId, { render: 'Please Enter the TFA OTP', type: "info", isLoading: false, autoClose: 3000 });
                const tfaResp = resp as LoginTFAResponse
                setTfaUser(tfaResp.user)
            }
            else{
                toast.update(toastId, { render: resp.message, type: "success", isLoading: false, autoClose: 3000 });
                AuthContextConsummer.setLoggedIn(true)
            }
            // Navigate('/')
        }
    }
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        await tryToLogin()
    }

    useEffect(() => {
        if (AuthContextConsummer.loggedIn === true)
            Navigate('/')
    }, [AuthContextConsummer.loggedIn, Navigate])

    const loginwith42 = async (code: string | null) => {
        if (code) {
           interface DataInterface{
            code?: string,
            uuid?: string,
           }
            const data: DataInterface = {}
            if (needLogin === undefined){
                data.code = code
                setOauth(true)
                setLoading(true)
            }
            else
                data.uuid = uuid
            try {
                const req = {
                    url: '/api/LoginWithOAuth42/',
                    method: 'POST',
                    data: data
                }
                const resp = await mailman(req)
                if (resp.status === 200) {
                    const respData: LoginResp = resp.data
                    if (respData.message === 'username needed'){
                        if (respData.uuid)
                            setUuid(respData.uuid)
                        if(respData.email)
                            setEmail(respData.email)
                        setNeedLogin(true)
                    }
                    else if (resp.data.user)
                        setTfaUser(resp.data.user)
                    else{
                        window.history.replaceState({}, document.title, window.location.pathname);
                        // AuthContextConsummer.setLoggedIn(true)
                        // Navigate('/')
                        location.reload();
                    }
                }

            }
            catch (error) {
                // setLoading(false);
                console.error('Error:', error)
            }
        }
    }
    useEffect(()=>{
        console.log("need loin == ",needLogin)
        if (needLogin! === false)
            if (oauth)
                loginwith42(code)
            else
                tryToLogin()
    }, [needLogin])
    useEffect(() => {
      
            const searchParams = new URLSearchParams(window.location.search);
            const tmpCode = searchParams.get('code');
            if (tmpCode)
                _setCode(tmpCode)
            console.log(`1234   ${tmpCode}`)
    
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
            if (tmpCode)
                loginwith42(tmpCode)
    }, []);
    const [hide, setHide] = useState<boolean>(true)
    const [passFoucs, setPassFocus] = useState<boolean>(false)
    const FormFade = () => {
        return (
            {
                formInitial: {
                    opacity: 0,
                    x: 100, 
                },
                formAnimate :{
                    opacity: 1,
                    x: 0,
                    transition : {
                        duration: 0.5,
                        ease: "easeInOut",
                        type: "spring",
                        stiffness: 100
                    } 
                }
            }
        )
    }
    return (
            AuthContextConsummer.loggedIn === undefined ? <LoadingIndecator/> : 

                <div className={`flex  justify-center 2xl:justify-between items-center min-h-screen font-poppins text-white   2xl:pr-80 relative`}>

                    
                        {tfaUser === undefined  && needLogin === undefined ? 
                            <motion.form 
                                variants={FormFade()}
                                initial="formInitial"
                                animate="formAnimate"
                                onSubmit={handleSubmit}
                                className=" p-6 rounded-lg shadow-lg max-w-screen-sm lg:w-[500px]  ">
                                <div className='form-header  text-4xl font-semibold text-white tracking-wider mb-[50px] flex flex-col gap-4 justify-center items-center'>
                                    <h1 >Welcome Back !</h1>
                                    <p className='text-lg font-normal '>Please Enter your details</p>
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="email" className="block text-white font-bold mb-2">Email:</label>
                                    <input
                                        autoComplete='off'
                                        type="email"
                                        id="username"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                        className="bg-slate-900 w-full px-3 py-2 text-white outline-none rounded-2xl  duration-75 border border-slate-200 focus:border-slate-900 focus:bg-slate-200 focus:text-black"
                                    />
                                </div>
                                <div className="mb-6 relative ">
                                    <label htmlFor="password" className="block text-white font-bold mb-2">Password:</label>
                                    <input
                                        autoComplete='off'
                                        type={hide  ? 'password' : 'text'}
                                        id="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                        className="bg-slate-900 w-full px-3 py-2 text-white outline-none rounded-2xl  duration-75 border border-slate-200 focus:border-slate-900 focus:bg-slate-200 focus:text-black "
                                        onFocus={()=>{
                                            setPassFocus(true)
                                        }}
                                        onBlur={() =>{
                                            setPassFocus(false)

                                        }}
                                    />
                                    <div className={`p-4 absolute right-1 -translate-y-[50%] top-[70%] cursor-pointer duration-75 ${passFoucs ? 'text-black' : 'text-white' }`} onClick={() =>{
                                        setHide(!hide)
                                    }}>
                                        {hide ? <LuEyeOff/> : <LuEye/>}
                                    </div>
                                </div>

                                <div className='flex flex-col gap-6 mt-9 justify-center items-center'>

                                    <button type="submit" className="w-full  bg-white text-black text-lg font-bold py-2 px-4 rounded  hover:scale-105  duration-150">
                                        Sign in
                                    </button>
                                    <div className='h-[30px] flex items-center justify-evenly w-full'>
                                        <div className=' w-[45%] bg-white h-[1px]'></div>
                                        <p className='w-[5%] text-white'> or </p>
                                        <div className=' w-[45%] bg-white h-[1px]'></div>
                                    </div>
                                    <button type="submit" className=" border border-slate-200 w-full font-lg bg-[#131313] text-white font-bold py-2 px-4 rounded hover:border-slate-200 hover:scale-105 duration-150" onClick={handleSubmitWith42}>
                                    {!loading ? <p >Sign in with <img src="42.png" alt="42-logo" className='inline-block mx-3'/></p> : <Loading__/>}
                                    </button>
                                    <div className='h-[80px] flex flex-col gap-4 justify-center items-center text-white'>
                                        <p>Don't have an account ? <Link to='/signup' className='text-slate-200 inline-block ml-2  hover:text-[#5E97A9] duration-100 cursor-pointer'>Sign up</Link></p>
                                        <p>Forget Password ? <span className='text-slate-200 inline-block ml-2  hover:text-[#5E97A9] duration-100 cursor-pointer'>Click here</span></p>
                                    </div>
                                </div>
                            </motion.form> : needLogin === true  || needLogin === false ? <Username email={email} setNeedLogin={setNeedLogin} /> : <TfaVerification user={tfaUser}/>}
                    

                </div> 
  
            

    );
};

export default Login;
