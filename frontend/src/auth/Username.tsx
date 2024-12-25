// Login.tsx
import React, { useContext, useEffect, useState } from 'react';
import { BACKEND, LOGIN_PATH, INIT_CSRFTOKEN_PATH } from '../utils/Constants';
import { cookies } from './Cookie';
import { useNavigate, Link } from 'react-router-dom';
import mailman from '../utils/AxiosFetcher'
// import { user_id } from '../utils/Constants';
import { toast } from 'sonner'
import { UserContext } from '../components/UserContext';
import { AuthContext, LoginDataInterface, LoginError, LoginResp, LoginTFAResponse } from '@/components/AuhtenticationContext';
import LoadingIndecator from '@/components/Loading';
import { resolve } from 'path';
import { LuEye } from "react-icons/lu";
import { LuEyeOff } from "react-icons/lu";
import { motion } from 'framer-motion';
import background from 'astro-bg.png'
import TfaVerification from './TfaVerification';
import ThreeScene from '@/components/ThreeScene';
import { FaArrowRight } from "react-icons/fa6";


export const Loading__ = () => {
    return (
        <div className="flex justify-center items-center h-full w-full ">
            <div className="w-[40px] h-[40px] border-4 border-[#5E97A9] border-solid border-t-transparent rounded-full animate-spin"></div>
        </div>
    )
}

const Username = () => {
    const AuthContextConsummer = useContext(AuthContext)
    if (!AuthContextConsummer)
        throw new Error("invalid scope");
    const Navigate = useNavigate();
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false)
    const [tfaUser, setTfaUser] = useState<string | undefined>(undefined)
    const handleSubmitWith42 = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.preventDefault();
        window.location.href =
            "https://api.intra.42.fr/oauth/authorize?client_id=u-s4t2ud-70dc836346e26f4efb68c4811174ea4d330c4830fa5ddcb7a61e415640aa7041&redirect_uri=https%3A%2F%2Flocalhost%3A4444%2Flogin%2F&response_type=code";
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data: LoginDataInterface = {
            email: email,
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
            
            if (resp.message === 'tfa needed'){
                const tfaResp = resp as LoginTFAResponse
                setTfaUser(tfaResp.user)
            }
            else{
                toast.success(resp.message)
                console.log(resp)
                AuthContextConsummer.setLoggedIn(true)
            }
            // Navigate('/')
        }
    }

    useEffect(() => {
        if (AuthContextConsummer.loggedIn === true)
            Navigate('/')
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
                    if (resp.data.user)
                        setTfaUser(resp.data.user)
                    else
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
            loginwith42(code)
    }, [AuthContextConsummer.loggedIn]);

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
                    {/* <ThreeScene/> */}
                    
                        {tfaUser === undefined ? 
                            <motion.form 
                                variants={FormFade()}
                                initial="formInitial"
                                animate="formAnimate"
                                onSubmit={handleSubmit}
                                className=" p-6 rounded-lg shadow-lg max-w-screen-sm lg:w-[500px]  ">
                                <div className='form-header  text-4xl font-semibold text-white tracking-wider mb-[50px] flex flex-col gap-4 justify-center items-center'>
                                    <h1 >One more step!</h1>
                                    <p className='text-lg font-normal '>Please Enter a username</p>
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="Username" className="block text-white font-bold mb-2">Username:</label>
                                    <input
                                        autoComplete='off'
                                        type="username"
                                        id="username"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                        className="bg-transparent w-full px-3 py-2 text-white outline-none rounded-2xl  duration-75 border border-slate-200 focus:border-slate-900 focus:bg-slate-200 focus:text-black"
                                    />
                                </div>

                                <div className='flex flex-col gap-6 mt-9 justify-center items-center'>

                                    <button type="submit" className="w-full  bg-white/90 text-black text-[18px] font-semibold py-2 px-4 rounded-2xl hover:bg-white transition-all border-0  duration-150 flex justify-center gap-5 items-center">
                                        <p>Get Started</p>
                                        <div>
                                            <FaArrowRight/>
                                        </div>
                                        
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
                            </motion.form> : <TfaVerification user={tfaUser}/>}
                    

                </div> 
                // <ThreeScene/>
            

    );
};

export default Username;