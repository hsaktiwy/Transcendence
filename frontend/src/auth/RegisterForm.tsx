import React, { useContext, useEffect, useState } from 'react';
import { BACKEND, LOGIN_PATH, INIT_CSRFTOKEN_PATH } from '../utils/Constants';
import { cookies } from './Cookie';
import { useNavigate } from 'react-router-dom';
import mailman from '../utils/AxiosFetcher'
// import { user_id } from '../utils/Constants';
// import { toast } from 'sonner'
import { UserContext } from '../components/UserContext';
import { AuthContext, LoginDataInterface, LoginError, LoginResp, signUpDataInterface } from '@/components/AuhtenticationContext';
import LoadingIndecator from '@/components/Loading';
import { resolve } from 'path';
import { LuEye } from "react-icons/lu";
import { LuEyeOff } from "react-icons/lu";
import { motion } from 'framer-motion';
import background from 'astro-bg.png';
import { Loading__ } from './Login';
import { Link } from 'react-router-dom';
import { AxiosError } from 'axios';
import { userNameError, emailError, passError } from './signUpError';
import FormInput from './Registration/RegisterInput';
import { toast } from 'react-toastify';

export interface inputInterface{
    name?: keyof inputsDataInterface,
    type: string,
    errorMessage:string,
    label: string,
    pattern: string,
    required: boolean,
    inputsData?: inputsDataInterface
}
export interface inputsDataInterface{
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    password2: string
}
export interface inputsErrorInterface{
    firstName: boolean,
    lastName: boolean,
    email: boolean,
    password: boolean,
    password2: boolean
}
const RegisterForm = () =>{
    const AuthContextConsummer = useContext(AuthContext)
    if (!AuthContextConsummer)
        throw new Error("invalid scope");
    const Navigate = useNavigate();
    const [inputsData, setInputsData] = useState<inputsDataInterface>({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        password2: ""
    })
    const [inputsError, setInputError] = useState<inputsErrorInterface>({
        firstName: true,
        lastName: true,
        email: true,
        password: true,
        password2: true
    })
    const inputs: inputInterface[] = [
        {
          name: "firstName",
          type: "text",
          errorMessage: "First name should be 3-50 characters",
          label: "First Name",
          pattern: "^.{3,50}$",
          required: true,
          inputsData: inputsData
        },
        {
          name: "lastName",
          type: "text",
          errorMessage: "Last name should be 3-50 characters",
          label: "Last Name",
          pattern: "^.{3,50}$",
          required: true,
          inputsData: inputsData
        },
        {
            name: "email",
            type: "email",
            errorMessage: "It should be a valid email address!",
            label: "Email",
            pattern: "[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}" ,
            required: true,
          inputsData: inputsData
        },
        {
          name: "password",
          type: "password",
          errorMessage: "Password should be 8-20 characters and include at least 1 letter, 1 number and 1 special character!",
          label: "Password",
          pattern: "^.{3,50}$",
          required: true,
          inputsData: inputsData
        },
        {
          name: "password2",
          type: "password",
          errorMessage: "Passwords don't match!",
          label: "Confirm Password",
          pattern: inputsData.password,
          required: true,
          inputsData: inputsData
        },
      ];
    const [loading, setLoading] = useState<boolean>(false);
    const [registred, setRegistred] = useState<boolean>(false);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try{
            const request = {
                url: '/api/user/register/',
                method: 'POST',
                withCredentials: true,
                data: inputsData
            }
            const resp = await mailman(request)
            toast.success(resp.data.message)
            setRegistred(true)
        }
        catch (err) {
            interface signupError {
                firstName: string[]
                lastName: string[],
                login: string[],
                email: string[],
                password: string[],
                password2: string[]
            }
            const axiosError = err as AxiosError
            const axiosErrorMessage = axiosError.response?.data as signupError
            if (axiosErrorMessage.login)
                toast.error(userNameError)
            if (axiosErrorMessage.email)
                toast.error(emailError)
            if (axiosErrorMessage.password || axiosErrorMessage.password2)
                toast.error(passError)
        }

    }


    const FormFade = () => {
        return (
            {
                formInitial: {
                    opacity: 0,
                    y: 100, 
                },
                formAnimate :{
                    opacity: 1,
                    y: 0,
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
    useEffect(() => {
        if (AuthContextConsummer.loggedIn === true)
            Navigate('/')
    }, [AuthContextConsummer.loggedIn, Navigate])

    useEffect(() => {
        if (registred)
            Navigate('/login')
    }, [registred])

    return (
            AuthContextConsummer.loggedIn === undefined ? <LoadingIndecator/> : 
                <div className={`flex flex-col items-center 2xl:items-end justify-center min-h-screen font-poppins text-white   2xl:pr-80 relative`}>
                    <motion.form 
                        variants={FormFade()}
                        initial="formInitial"
                        animate="formAnimate"
                        onSubmit={handleSubmit}
                        className=" p-6 rounded-lg shadow-lg max-w-screen-sm lg:w-[600px]  ">
                        <div className='form-header  text-4xl font-semibold text-white tracking-wider mb-[50px] flex flex-col gap-4 justify-center items-center'>
                            <h1 >Hey! Happy to see you here</h1>
                            <p className='text-lg font-normal '>Create your account now</p>
                        </div>
                        {
                                inputs.map((input, index)=> {
                                    return(
                                        <FormInput key={index + 1} {...input} value={inputsData[input.name!]} setInputsData={setInputsData} inputsError={inputsError} setInputError={setInputError}/>
                                    )
                                })
                        }
                        <div className='flex flex-col gap-6 mt-9 justify-center items-center'>
                        <button
                                type="submit"
                                disabled={Object.values(inputsError).includes(true) ? true : false }
                                className=" relative w-full group border-none bg-white/95 text-black text-lg font-bold py-2 px-4 rounded-2xl hover:bg-white transition-all duration-150"
                                >
                                
                                <span>Sign Up</span>
                                <style >{`
                                    .group:hover::after {
                                    display: ${Object.values(inputsError).includes(true) ? 'inline-block' : 'none'};
                                    font-size: 12px;
                                    font-weight: 500;
                                    content: 'Please correct or complet the required fields ';
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
                            <div className='h-[80px] flex flex-col gap-4 justify-center items-center text-white'>
                                <p>You have an account ? <Link to='/login' className='text-slate-200 inline-block ml-2  hover:text-[#5E97A9] duration-100 cursor-pointer'>Sign in</Link></p>
                            </div>
                            <div>

                            </div>
                        </div>
                    </motion.form>
                </div> 
            

    );}

export default RegisterForm