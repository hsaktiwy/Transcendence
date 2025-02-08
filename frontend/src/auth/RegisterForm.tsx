import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import mailman from '../utils/AxiosFetcher'
import { AuthContext,} from '@/components/AuhtenticationContext';
import LoadingIndecator from '@/components/Loading';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { AxiosError } from 'axios';
import { userNameError, emailError, passError, signupError } from './signUpError';
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
          errorMessage: "First Name should be 3-50 characters long and contain only letters and spaces.",
          label: "First Name",
          pattern: "^(?=.{3,50}$)[A-Za-z]+([ '-][A-Za-z]+)*$",
          required: true,
          inputsData: inputsData
        },
        {
          name: "lastName",
          type: "text",
          errorMessage: "Last Name should be 3-50 characters long and contain only letters and spaces.",
          label: "Last Name",
          pattern: "^(?=.{3,50}$)[A-Za-z]+([ '-][A-Za-z]+)*$",
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
          errorMessage: "Password should be 8-20 characters long and include at least 1 uppercase, 1 lowercase, 1 number, and 1 special character.",
          label: "Password",
          pattern: "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,20}$",
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
    useEffect(()=>{
        console.log(inputsData)
    },[inputsData])
    return (
            AuthContextConsummer.loggedIn === undefined ? <LoadingIndecator/> : 
                <div className={`flex flex-col items-center justify-center min-h-screen font-poppins text-white relative`}>
                    <motion.form 
                        variants={FormFade()}
                        initial="formInitial"
                        animate="formAnimate"
                        onSubmit={handleSubmit}
                        className=" p-10  shadow-lg max-w-screen-sm lg:w-[600px]  bg-white/10 backdrop-filter backdrop-sm border border-white/20 rounded-3xl">
                        <div className='form-header  text-4xl font-semibold text-white tracking-wider mb-[50px] flex flex-col gap-4 justify-center items-center text-center'>
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