import React, { useContext, useEffect, useState } from "react";
import { FiEdit2 } from "react-icons/fi";
import { LuEye } from "react-icons/lu";
import { LuEyeOff } from "react-icons/lu";
import { GoQuestion } from "react-icons/go";
import { BsPhoneFlip } from "react-icons/bs";
import TwoFA from "./TwoFA";
import mailman from "@/utils/AxiosFetcher";
import { toast } from "react-toastify";
import { AxiosError } from "axios";
import { oldPassError, pass2Error, passError, signupError } from "@/auth/signUpError";
import { UserContext } from "./UserContext";

interface PasswordInputInterface{
    old_password:string,
    password: string,
    password2:string
}
interface PasswordErrorInterface{
    old_password: boolean,
    password: boolean,
    password2:boolean
}
function SecuritySettings(){
    const passwordError = "Password should be 8-20 characters long and include at least 1 uppercase, 1 lowercase, 1 number, and 1 special character."
    const [hide, setHide] = useState<boolean[]>([true, true, true])
    const userContextConsumer = useContext(UserContext)
    const [inputsData, setInputsData] = useState<PasswordInputInterface>({
        old_password : "",
        password:"",
        password2:""
    })
    const [inputsError, setInputsError] = useState<PasswordErrorInterface>({
        old_password: false,
        password:false,
        password2:false
    })
    if (!userContextConsumer)
        throw new Error("invalid scope")
    const {userData} = userContextConsumer

    
    const handleOnBlur = (e: React.FocusEvent<HTMLInputElement>) =>{
        const {password, password2, old_password} = inputsData
        const pattern =  "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,20}$"
        const inputRegex = new RegExp(pattern)
        if (e.target.id === 'password')
        {
            if (password.length){
                
                if(!inputRegex.test(password))
                    setInputsError({...inputsError, password: true})
                else
                    setInputsError({...inputsError, password: false})
            }
        }
        else if (e.target.id === 'old_password'){
            if (old_password.length){
                
                if(!inputRegex.test(old_password))
                    setInputsError({...inputsError, old_password: true})
                else
                    setInputsError({...inputsError, old_password: false})
            }
        }
        else if(e.target.id === 'password2'){
            if (password2.length && password.length){
                if (password!== password2)
                    setInputsError({...inputsError, password2: true})
                else
                    setInputsError({...inputsError, password2: false})
            }
        }
    }
    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) =>{
        const inputKey = e.target.id
        setInputsData({...inputsData,[inputKey]:e.target.value})
    }
 

    
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) =>{
        event.preventDefault();
        if (!inputsData.old_password.length || !inputsData.password.length || !inputsData.password2.length){
          toast.warning('please complete the required fields')
        }
        else if (Object.values(inputsError).includes(true))
        {
          toast.error("Please correct the required fields")
        }
        else{
            const toastId = toast.loading("Updating infos...");
            try{
      
                const req = {
                  url: `/api/user/`,
                  method: 'PATCH',
                  data : inputsData
                }
                const response =  await mailman(req)
                if (response.status === 200)
                    toast.update(toastId, { render: "Password changed successfully", type: "success", isLoading: false, autoClose: 3000 });
                    resetPass()
                
            }
            catch (err){
                toast.update(toastId, { render: "invalid credentials. Try Again!", type: "error", isLoading: false, autoClose: 3000 });
                // toast.error("invalid credentials. Try Again!")
            }
        }
    }
    const resetPass = () =>{
        setInputsData({
            old_password: "",
            password: "",
            password2: ""
        })
        setInputsError({
            old_password: false,
            password:false,
            password2: false
        })
    }
    return(
        <div className="   border border-white/20 w-[90%] lg:w-[60%] xl:w-[85%] xxl:w-[60%] mx-auto security-settings my-4 sm:my-2 flex-1   bg-gradient-to-b from-slate-300/10 to-cyan-500/10 rounded-xl flex flex-col gap-10">
            <div className=" px-4 sm:px-10 py-4 flex justify-center 2xl:justify-between  items-center 2xl:items-start gap-8 2xl:gap-0 relative flex-col 2xl:flex-row ">
                <h1 className="text-2xl pt-4 text-center sm:text-start">Change Password</h1>
                {/* <div className="absolute top-0 left-0 w-full h-full backdrop-filter backdrop-blur-[2px] z-40  flex justify-center items-center">
                    <div className="p-10 bg-gradient-to-br from-[#323339] via-[#28292F] to-[#232628] text-white text-lg font-semibold rounded-xl w-[700px] text-center">
                        <h1 className="text-2xl font-semibold ">You are using a third-party Authentication you can't change the account passoword</h1>
                    </div>
                </div> */}

                <form onSubmit={handleSubmit} className="flex flex-col gap-8  ">
                    <div className="relative w-full 2xl:w-[780px] m-4 sm:m-0">
                        <label htmlFor="oldPassword"></label>
                        <input disabled={userData?.oauth} autoComplete='off' value={inputsData.old_password} id="old_password" type={hide[0]  ? 'password' : 'text'} placeholder="Old Password" className="bg-black/35 backdrop-filter backdrop-blur-sm rounded-2xl py-2 px-4  w-[90%] sm:w-full border border-white/20 outline-none focus:border focus:border-transparent focus:outline-1 focus:outline-[#5E97A9]" onChange={handleOnChange} onBlur={handleOnBlur}/>
                        <div className=" p-4 text-lg duration-100  absolute right-[10%] sm:right-1 text-white -top-[8%] cursor-pointer " onClick={() =>{
                            setHide(prev => {
                                const newArr = [...prev]
                                newArr[0] = !newArr[0]
                                return newArr
                            })
                        }}>
                            {hide[0] ? <LuEyeOff/> : <LuEye/>}
                        </div>
                        <span className={`${inputsError.old_password ? 'visible' : 'invisible'} text-[12px] p-[3px] text-red-500 break-words inline-block`}>{"Old " + passwordError}</span>
                    </div>
                    <div className="relative w-full 2xl:w-[780px] m-4 sm:m-0">
                        <label htmlFor="newPassword"></label>
                        <input disabled={userData?.oauth} autoComplete='off' value={inputsData.password} id='password' type={hide[1]  ? 'password' : 'text'} placeholder="New Password" className="bg-black/35 backdrop-filter backdrop-blur-sm rounded-2xl py-2 px-4  w-[90%] sm:w-full border border-white/20 outline-none focus:border focus:border-transparent focus:outline-1 focus:outline-[#5E97A9]" onChange={handleOnChange} onBlur={handleOnBlur}/>
                        <div className=" p-4 text-lg duration-100  absolute right-[10%] sm:right-1 text-white -top-[8%] cursor-pointer " onClick={() =>{
                            setHide(prev => {
                                const newArr = [...prev]
                                newArr[1] = !newArr[1]
                                return newArr
                            })
                        }}>
                            {hide[1] ? <LuEyeOff/> : <LuEye/>}
                        </div>
                        <span className={`${inputsError.password ? 'visible' : 'invisible'} text-[12px] p-[3px] text-red-500 break-words inline-block`}>{passwordError}</span>
                    </div>
                        <div className="flex justify-start items-center text-white/70 opacity-70 gap-5 px-4">
                            <span className="inline-block  text-xl"><GoQuestion/></span>
                            <p className=" ">Your Password must be different to previously used password</p>
                        </div>
                    <div className="relative w-full 2xl:w-[780px] m-4 sm:m-0">
                        <label htmlFor="confirmNewPassword"></label>
                        <input disabled={userData?.oauth} autoComplete='off' value={inputsData.password2} id='password2' type={hide[2]  ? 'password' : 'text'} placeholder="Confirm New Password" className="bg-black/35 backdrop-filter backdrop-blur-sm rounded-2xl py-2 px-4  w-[90%] sm:w-full border border-white/20 outline-none focus:border focus:border-transparent focus:outline-1 focus:outline-[#5E97A9]" onChange={handleOnChange} onBlur={handleOnBlur}/>
                        <div className=" p-4 text-lg duration-100  absolute right-[10%] sm:right-1 text-white -top-[8%] cursor-pointer " onClick={() =>{
                            setHide(prev => {
                                const newArr = [...prev]
                                newArr[2] = !newArr[2]
                                return newArr
                            })
                        }}>
                            {hide[2] ? <LuEyeOff/> : <LuEye/>}
                        </div>
                        <span className={`${inputsError.password2 ? 'visible' : 'invisible'} text-[12px] p-[3px] text-red-500 break-words inline-block`}>Passwords do not match</span>
                    </div>
                    {
                        userData?.oauth ? 
                        <div className="text-lg">Password updates are not allowed for accounts linked to a third-party provider. </div>
                        :
                        <div className="submit-container self-center 2xl:self-end flex gap-6 flex-wrap items-center justify-center">

                            <button type='submit' className="w-[150px] bg-[#5E97A9]/70 px-4 py-2 rounded-xl  border-0 outline-none  focus:outline-0 focus:border-0 hover:opacity-75 focus:opacity-75">Save Changes</button>
                            <button type='button' className="w-[150px]  px-4 py-2 rounded-xl  bg-black/35 border-0 outline-none  focus:outline-0 focus:border-0 hover:opacity-75 focus:opacity-75" onClick={resetPass}>Cancel</button>

                        </div>
                    }
                </form>
            </div>
            <TwoFA/>
        </div>
    )
}


export default SecuritySettings