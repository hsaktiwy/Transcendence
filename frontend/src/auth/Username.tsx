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
interface SetUsernameProps{
    email: string,
    password: string,
    setNeedLogin: React.Dispatch<React.SetStateAction<boolean> >
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
                                        type="text"
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
                                </div>
                            </motion.form>
                    

                </div> 
                // <ThreeScene/>
            

    );
};

export default Username;