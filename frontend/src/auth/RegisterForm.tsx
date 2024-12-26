import React, { useContext, useEffect, useState } from 'react';
import { BACKEND, LOGIN_PATH, INIT_CSRFTOKEN_PATH } from '../utils/Constants';
import { cookies } from './Cookie';
import { useNavigate } from 'react-router-dom';
import mailman from '../utils/AxiosFetcher'
// import { user_id } from '../utils/Constants';
import { toast } from 'sonner'
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

export interface inputsDataInterface{
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    password2: string
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
    interface inputInterface{
        name: keyof inputsDataInterface,
        type: string,
        errorMessage:string,
        label: string,
        pattern: string,
        required: boolean,
    }
    const inputs: inputInterface[] = [
        {
          name: "firstName",
          type: "text",
          errorMessage: "First name should be 3-16 characters and shouldn't include any special character or number!",
          label: "First N ame",
          pattern: "^[A-Za-z]{3,16}$",
          required: true,
        },
        {
          name: "lastName",
          type: "text",
          errorMessage: "Last name should be 3-16 characters and shouldn't include any special character or number!",
          label: "Last Name",
          pattern: "^[A-Za-z]{3,16}$",
          required: true,
        },
        {
            name: "email",
            type: "email",
            errorMessage: "It should be a valid email address!",
            label: "Email",
            pattern: "[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}" ,
            required: true,
        },
        {
          name: "password",
          type: "password",
          errorMessage: "Password should be 8-20 characters and include at least 1 letter, 1 number and 1 special character!",
          label: "Password",
          pattern: `^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$`,
          required: true,
        },
        {
          name: "password2",
          type: "password",
          errorMessage: "Passwords don't match!",
          label: "Confirm Password",
          pattern: inputsData.password,
          required: true,
        },
      ];
    
    const [username, setUsername] = useState<string>('');
    const [firstName, setFirstName] = useState<string>('');
    const [lastName, setLasttName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [password2, setPassword2] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const [registred, setRegistred] = useState<boolean>(false);

    const handleSubmitWith42 = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.preventDefault();
        window.location.href =
            "https://api.intra.42.fr/oauth/authorize?client_id=u-s4t2ud-70dc836346e26f4efb68c4811174ea4d330c4830fa5ddcb7a61e415640aa7041&redirect_uri=https%3A%2F%2Flocalhost%2Flogin%2F&response_type=code";
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
 
        const signUpData : signUpDataInterface = {
            firstName: firstName,
            lastName: lastName,
            login: username,
            email: email,
            password: password,
            password2: password2
        }
        try{
            const request = {
                url: '/api/user/register/',
                method: 'POST',
                withCredentials: true,
                data: signUpData
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

    const [hide, setHide] = useState<boolean>(true)
    const [passFocus, setPassFocus] = useState<boolean>(false)
    const [hide2, setHide2] = useState<boolean>(true)
    const [passFocus2, setPassFocus2] = useState<boolean>(false)
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
    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputsData({ ...inputsData, [e.target.name]: e.target.value });
      };
    const onFocus = (e: React.FocusEvent<HTMLInputElement>) => {
        if (e.target.name === 'password')
            setPassFocus(true)
        else if (e.target.name === 'password2')
            setPassFocus2(true)
      };
    const onBlur = (e:React.FocusEvent<HTMLInputElement>) => {
        if (e.target.name === 'password')
            setPassFocus(false)
        else if (e.target.name === 'password2')
            setPassFocus2(false)
      };
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
                        <div className="mb-4 flex items-center  justify-center gap-11 w-full">
                            <div className='w-[46%]'>
                                <label htmlFor="firstName" className="block text-white font-bold mb-2">First Name:</label>
                                <input
                                    autoComplete='off'
                                    type="firstName"
                                    id="firstName"
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                    required
                                    className="bg-slate-900 w-full px-3 py-2 text-white outline-none rounded-2xl  duration-75 border border-slate-200 focus:border-slate-900 focus:bg-slate-200 focus:text-black"
                                    />
                            </div> 
                             <div className='w-[46%]'>
                                <label htmlFor="lastName" className="block text-white font-bold mb-2">Last Name:</label>
                                <input
                                    autoComplete='off'
                                    type="lastName"
                                    id="lastName"
                                    value={lastName}
                                    onChange={(e) => setLasttName(e.target.value)}
                                    required
                                    className="bg-slate-900 w-full px-3 py-2 text-white outline-none rounded-2xl  duration-75 border border-slate-200 focus:border-slate-900 focus:bg-slate-200 focus:text-black"
                                    />
                            </div>
                            {/* {
                                inputs.filter((input)=>{input.name === 'firstName' || input.name === 'lastName'}).map((input, index)=> {
                                    return(
                                        <FormInput key={index + 1} {...input} value={inputsData[input.name]} onChange={onChange}/>
                                    )
                                })
                            } */}
                        </div>
                        {/* {
                                inputs.filter((input)=>{input.name !== 'firstName' || input.name !== 'lastName'}).map((input, index)=> {
                                    return(
                                        <FormInput key={index + 1} {...input} value={inputsData[input.name]} onChange={onChange}/>
                                    )
                                })
                        } */}
                        <div className="mb-6 relative ">
                            <label htmlFor="username" className="block text-white font-bold mb-2">Username:</label>
                            <input
                                autoComplete='off'
                                type='username'
                                id="username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                                className="bg-slate-900 w-full px-3 py-2 text-white outline-none rounded-2xl  duration-75 border border-slate-200 focus:border-slate-900 focus:bg-slate-200 focus:text-black "
                            />
                        </div>
                        <div className="mb-6 relative ">
                            <label htmlFor="email" className="block text-white font-bold mb-2">Email:</label>
                            <input
                                autoComplete='off'
                                type='email'
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="bg-slate-900 w-full px-3 py-2 text-white outline-none rounded-2xl  duration-75 border border-slate-200 focus:border-slate-900 focus:bg-slate-200 focus:text-black "
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
                                className="bg-slate-900 w-full px-3 py-2 text-white outline-none rounded-2xl  duration-75 border border-slate-200 focus:border-slate-900 focus:bg-slate-200 focus:text-black "
                                onFocus={()=>{
                                    setPassFocus(true)
                                }}
                                onBlur={() =>{
                                    setPassFocus(false)
                                }}
                            />
                            <div className={`p-4 absolute right-1 -translate-y-[50%] top-[70%] cursor-pointer duration-75 ${passFocus ? 'text-black' : 'text-white' }`} onClick={() =>{
                                setHide(!hide)
                            }}>
                                {hide ? <LuEyeOff/> : <LuEye/>}
                            </div>
                        </div>
                        <div className="mb-6 relative ">
                            <label htmlFor="confirmPassword" className="block text-white font-bold mb-2">Confirm Your Password:</label>
                            <input
                                type={hide2  ? 'password' : 'text'}
                                id="confirmPassword"
                                value={password2}
                                onChange={(e) => setPassword2(e.target.value)}
                                required
                                className="bg-slate-900 w-full px-3 py-2 text-white outline-none rounded-2xl  duration-75 border border-slate-200 focus:border-slate-900 focus:bg-slate-200 focus:text-black "
                                onFocus={()=>{
                                    setPassFocus2(true)
                                }}
                                onBlur={() =>{
                                    setPassFocus2(false)

                                }}
                            />
                            <div className={`p-4 absolute right-1 -translate-y-[50%] top-[70%] cursor-pointer duration-75 ${passFocus2 ? 'text-black' : 'text-white' }`} onClick={() =>{
                                setHide2(!hide2)
                            }}>
                                {hide2 ? <LuEyeOff/> : <LuEye/>}
                            </div>
                        </div>

                        <div className='flex flex-col gap-6 mt-9 justify-center items-center'>

                            <button type="submit" className="w-full  bg-white text-black text-lg font-bold py-2 px-4 rounded  hover:scale-105  duration-150">
                                Sign up
                            </button>
                            <div className='h-[30px] flex items-center justify-evenly w-full'>
                                <div className=' w-[45%] bg-white h-[1px]'></div>
                                <p className='w-[5%] text-white'> or </p>
                                <div className=' w-[45%] bg-white h-[1px]'></div>
                            </div>
                            <button type="submit" className=" border border-slate-200 w-full font-lg bg-[#131313] text-white font-bold py-2 px-4 rounded hover:scale-105 duration-150" onClick={handleSubmitWith42}>
                            {!loading ? <p >Sign up with <img src="42.png" alt="42-logo" className='inline-block mx-3'/></p> : <Loading__/>}
                            </button>
                            <div className='h-[80px] flex flex-col gap-4 justify-center items-center text-white'>
                                <p>You have an account ? <Link to='/login' className='text-slate-200 inline-block ml-2  hover:text-[#5E97A9] duration-100 cursor-pointer'>Sign in</Link></p>
                            </div>
                        </div>
                    </motion.form>
                </div> 
            

    );}

export default RegisterForm