import React, { useState } from "react";
import { inputsDataInterface } from "../RegisterForm";
import { LuEye } from "react-icons/lu";
import { LuEyeOff } from "react-icons/lu";

interface FormInputPropInterface {
    name?: keyof inputsDataInterface ,
    type: string,
    errorMessage:string,
    label: string,
    pattern: string,
    required: boolean,
    setInputsData?: React.Dispatch<React.SetStateAction<inputsDataInterface> >,
    setInput?: React.Dispatch<React.SetStateAction<string> > ,
    value: string,
    inputsData?: inputsDataInterface
}
const FormInput = (prop: FormInputPropInterface)=>{
    const {value,name, type,label, inputsData ,pattern ,setInputsData, setInput,errorMessage, ...inputProps} = prop
    const [hide, setHide] = useState<boolean>(true)
    const [passFocus, setPassFocus] = useState<boolean>(false)
    const [hide2, setHide2] = useState<boolean>(true)
    const [passFocus2, setPassFocus2] = useState<boolean>(false)
    const [error, setError] = useState<boolean>(false)

    const onBlur = (e: React.FocusEvent<HTMLInputElement>) => {

        if (name === 'password')
            setPassFocus(false)
        else if (name === 'password2')
            setPassFocus2(false)
        if (e.target.name !== 'password2'){
            const inputRegex = new RegExp(pattern)
            if(!inputRegex.test(e.target.value.trim()) && error === false)
                setError(true)
            else if (inputRegex.test(e.target.value) && error === true)
                setError(false)
        }
        else {
            if(inputsData && e.target.value !== inputsData['password'] && error === false)
                setError(true)
            else if (inputsData && e.target.value === inputsData['password'] && error === true)
                setError(false)
        }
    };
    const onFocus = (e: React.FocusEvent<HTMLInputElement>) => {
        if (name === 'password')
            setPassFocus(true)
        else if (name === 'password2')
            setPassFocus2(true)

      };
    const onChange =(e: React.ChangeEvent<HTMLInputElement>) => {
        if (inputsData && setInputsData && name)
            setInputsData({ ...inputsData, [name]: e.target.value.trim() });
        else if (setInput)
            setInput(e.target.value)

    }
    return(
        <div className={`mb-6 relative`}>

            <label htmlFor={name} className="block text-white font-bold mb-2">{label+":"}</label>
            <input
                type={name !== 'password' && name !== 'password2' ? type : ((name === 'password' && hide) || (name === 'password2' && hide2)) ? type : 'text'}
                {...inputProps}
                autoComplete='off'
                onChange={onChange}
                onFocus={onFocus}
                onBlur={onBlur}
                className={` bg-transparent w-full px-3 py-2 text-white outline-none rounded-2xl  duration-75 border ${error ? 'border-red-500' : 'border-slate-200'} focus:border-slate-900 focus:bg-slate-200 focus:text-black`}
                />
            {
                name === 'password' && 
                <div className={`p-4 absolute right-1 -translate-y-[50%] ${error ? 'top-[45%]' : 'top-[70%]'} cursor-pointer duration-75 ${passFocus ? 'text-black' : 'text-white' }`} onClick={() =>{
                    setHide(!hide)
                }}>
                    {hide ? <LuEyeOff/> : <LuEye/>}
                </div>
            }
            {
                name === 'password2' &&
                <div className={`p-4 absolute right-1 -translate-y-[50%] ${error ? 'top-[52%]' : 'top-[70%]'} cursor-pointer duration-75 ${passFocus2 ? 'text-black' : 'text-white' }`} onClick={() =>{
                    setHide2(!hide2)
                }}>
                    {hide2 ? <LuEyeOff/> : <LuEye/>}
                </div>
            }
            <span className={`${error ? 'block' : 'hidden'} text-[12px] p-[3px] text-red-500 `}>{errorMessage}</span>
        </div>
           
    )
    
}

export default FormInput