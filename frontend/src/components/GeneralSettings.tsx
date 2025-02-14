import { useContext, useState, useEffect, FormEvent } from "react";
import { UserContext } from "./UserContext";
import { toast } from 'react-toastify'
import mailman from "../utils/AxiosFetcher";
import GeneralSettingsInput from "./GeneralSettingsInput";
import { AxiosError } from "axios";
import { emailError, firstNameError, lastNameError, signupError, userNameError } from "@/auth/signUpError";

export interface inputInterface{
    name?: keyof SettingsInputsDataInterface,
    type: string,
    errorMessage:string,
    label: string,
    pattern: string,
    required: boolean,
    inputsData?: SettingsInputsDataInterface
}
export interface SettingsInputsDataInterface{
    firstName: string,
    lastName: string,
    email: string,
    login: string
}
export interface SettingsInputsErrorInterface{
  firstName: boolean,
  lastName: boolean,
  email: boolean,
  username:boolean
}
function GeneralSettings(){
    const userContextConsumer = useContext(UserContext)
    if (!userContextConsumer)
        throw new Error("userContext must be used within a UserProvider");
    const [changed, setChanged] = useState<boolean>(false)
    const [inputsData, setInputsData] = useState<SettingsInputsDataInterface>({
      firstName: "",
      lastName: "",
      email: "",
      login: ""
  })
      const [inputsError, setInputError] = useState<SettingsInputsErrorInterface>({
          firstName: false,
          lastName: false,
          email: false,
          username: false
      })
    useEffect(() => {
      if (userContextConsumer?.userData) {
        setInputsData({
          firstName: userContextConsumer.userData.firstName || '',
          lastName: userContextConsumer.userData.lastName || '',
          email: userContextConsumer.userData.email || '',
          login: userContextConsumer.userData.login || ''
        })
      }
    }, [userContextConsumer]);
    const inputs: inputInterface[] = [
      {
        name: "firstName",
        type: "text",
        errorMessage: "First Name should be 3-50 characters long and contain only letters and spaces.",
        label: "First Name",
        pattern: "^(?=.{3,50}$)[A-Za-z]+([ '-][A-Za-z]+)*$",
        required: false,
        inputsData: inputsData
      },
      {
        name: "lastName",
        type: "text",
        errorMessage: "Last Name should be 3-50 characters long and contain only letters and spaces.",
        label: "Last Name",
        pattern: "^(?=.{3,50}$)[A-Za-z]+([ '-][A-Za-z]+)*$",
        required: false,
        inputsData: inputsData
      },
      {
          name: "email",
          type: "email",
          errorMessage: "It should be a valid email address!",
          label: "Email",
          pattern: "[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}" ,
          required: false,
        inputsData: inputsData
      },
      {
          name: "login",
          type: "text",
          errorMessage: "Username must be 3-20 characters and can only contain letters, numbers, and underscores.",
          label: "Username",
          pattern: "^[a-zA-Z0-9_]{3,20}$",
          required: false,
        inputsData: inputsData
      },
    ];
  
    const handleSubmit = async (event: FormEvent) => {
      event.preventDefault();
      try{
        if (!changed){
          toast.warning('No change have been made')
        }
        else if (Object.values(inputsError).includes(true))
        {
          toast.error("Please correct the required fields")
        }
        else{
          setChanged(false)
          const req = {
            url: `/api/user/`,
            method: 'PATCH',
            data : inputsData
          }
          const response =  await mailman(req)
          if (response.status === 200)
            toast.success('Changes have been applied')
            userContextConsumer.setUserData(prev => ({...prev!, ...inputsData}))
          }
      }
      catch (err){
        const customError = err as AxiosError
        const axiosErrorMessage = customError.response?.data as signupError
        if (axiosErrorMessage.email)
            toast.error(emailError)
        if (axiosErrorMessage.login)
            toast.error(userNameError)
        if (axiosErrorMessage.firstName)
            toast.error(firstNameError)
        if (axiosErrorMessage.lastName)
            toast.error(lastNameError)
      }
  };
  
    return (

      <form onSubmit={handleSubmit} className=" general-settings w-[90%] lg:w-[50%] mx-auto border border-white/20 my-4 sm:my-16  h-[1000px] flex-1 bg-gradient-to-b from-slate-300/10 to-cyan-500/10 rounded-xl p-16 flex justify-center flex-col items-center gap-20 relative">
        {/* <div className="absolute left-0 top-0 h-full w-full backdrop-filter bg-black/80 backdrop-blur-2xl z-50 rounded-xl flex justify-center items-center"> 
          <div className="bg-white p-10 text-black">
            you are connected with 42 

          </div>
        </div> */}
        <div className="flex gap-20 justify-center items-center flex-wrap">
          {
            inputs.filter((_item, index)=>index <=1).map((input, index) =>{
              return(
                <GeneralSettingsInput key={index+1} {...input} value={inputsData[input.name!]} setInputsData={setInputsData} setChanged={setChanged} changed={changed} inputsError={inputsError} setInputError={setInputError}/>
              )
            })
          }
        </div>
        <div className="flex gap-20 justify-center items-center flex-wrap">
        {
            inputs.filter((_item, index)=>index > 1).map((input, index) =>{
              return(
                <GeneralSettingsInput  key={index+1} {...input} value={inputsData[input.name!]} setInputsData={setInputsData} setChanged={setChanged} changed={changed} inputsError={inputsError} setInputError={setInputError}/>
              )
            })
        }
        </div>
        <div className="relative flex gap-8 flex-wrap justify-center items-center">
            <button 
              type="submit" 
              className=" w-[150px] bg-[#5E97A9]/70 px-4 py-2 rounded-xl border-0 outline-none  focus:outline-0 focus:border-0 hover:opacity-75 focus:opacity-75">
                Save Changes
            </button>
            <button type="button" className="w-[150px] bg-black/35 px-4 py-2 rounded-xl border-0 outline-none  focus:outline-0 focus:border-0 hover:opacity-75 focus:opacity-75" onClick={() =>{
                setInputsData({
                  firstName: userContextConsumer.userData?.firstName || '',
                  lastName: userContextConsumer.userData?.lastName || '',
                  email: userContextConsumer.userData?.email || '',
                  login: userContextConsumer.userData?.login || ''
                })
              changed ? toast.warning('Changes have been declined') : toast.warning('No change have been made')
            }}>
                Cancel
            </button>
        </div>
      </form>
    );
}
       
export default GeneralSettings