import React, { useContext, useEffect, useState } from 'react';
import { useNavigate} from 'react-router-dom';
import mailman from '../utils/AxiosFetcher'
import { toast } from 'react-toastify'
import { AuthContext} from '@/components/AuhtenticationContext';
import LoadingIndecator from '@/components/Loading';
import { motion } from 'framer-motion';
import { FaArrowRight } from "react-icons/fa6";
import { inputInterface } from './RegisterForm';
import FormInput from './Registration/RegisterInput';
interface SetUsernameProps{
    email: string,
    setNeedLogin: React.Dispatch<React.SetStateAction<boolean | undefined> >
}
const Username = (prop: SetUsernameProps) => {
    const AuthContextConsummer = useContext(AuthContext)
    if (!AuthContextConsummer)
        throw new Error("invalid scope");
    const Navigate = useNavigate();
    const [username, setUsername] = useState<string>('');
    const {email, setNeedLogin} = prop
    const [usernameError, setUsernameError] = useState<boolean>(true)
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try{
            const data = {
                email: email,
                login: username
            }
            const req = {
                url: '/api/setusername/',
                method: 'PATCH',
                withCredentials: true,
                data: data
            }
            const resp = await mailman(req)
            if(resp.status === 200){
                setNeedLogin(false)
            }
        }
        catch(error){
            toast.error("Invalid username or already exists! Try again")
        }

    }
    const usernameInput : inputInterface = {
        type: "text",
        errorMessage: "Username must be 3-20 characters and can only contain letters, numbers, and underscores.",
        label: "Username",
        pattern: "^[a-zA-Z0-9_]{3,20}$",
        required: true,
    }

    useEffect(() => {
        if (AuthContextConsummer.loggedIn === true)
            Navigate('/')
    }, [AuthContextConsummer.loggedIn, Navigate])
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

                <div className={`flex  justify-center 2xl:justify-between items-center min-h-screen font-poppins text-white    relative`}>
                            <motion.form 
                                variants={FormFade()}
                                initial="formInitial"
                                animate="formAnimate"
                                onSubmit={handleSubmit}
                                className=" p-10  shadow-lg max-w-screen-sm lg:w-[500px]   bg-white/10 backdrop-filter backdrop-sm border border-white/20 rounded-3xl">
                                <div className='form-header  text-4xl font-semibold text-white tracking-wider mb-[50px] flex flex-col gap-4 justify-center items-center'>
                                    <h1 >One more step!</h1>
                                    <p className='text-lg font-normal '>Please Enter a username</p>
                                </div>
                                    <FormInput {...usernameInput} value={username} setInput={setUsername} usernameError={usernameError} setUSernameError={setUsernameError}/>

                                <div className='flex flex-col gap-6 mt-9 justify-center items-center'>

                                    <button type="submit"
                                            disabled= {usernameError ? true : false}
                                            className=" relative group w-full  bg-white/90 text-black text-[18px] font-semibold py-2 px-4 rounded-2xl hover:bg-white transition-all border-0  duration-150 flex justify-center gap-5 items-center">
                                        <p>Get Started</p>
                                        <div>
                                            <FaArrowRight/>
                                        </div>
                                        <style >{`
                                            .group:hover::after {
                                            display: ${usernameError ? 'inline-block' : 'none'};
                                            font-size: 12px;
                                            font-weight: 500;
                                            content: 'Please enter a correct username ';
                                            position: absolute;
                                            bottom: -90%;
                                            left: 50%;           /* 50% from the left */
                                            transform: translateX(-50%);
                                            color: white;
                                            background-color: rgb(239 68 68 / 0.75);
                                            padding: 4px;
                                            border-radius: 0.75rem;
                                            width: 300px;
                                            animation: slideUpFadeIn 0.5s ease-out forwards;
                                            }
                                `}</style>
                                        
                                    </button>
                                </div>
                            </motion.form>
                    

                </div> 
            

    );
};

export default Username;