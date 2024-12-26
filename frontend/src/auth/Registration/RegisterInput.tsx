import React, { useState } from "react";
import { inputsDataInterface } from "../RegisterForm";
import { LuEye } from "react-icons/lu";
import { LuEyeOff } from "react-icons/lu";

interface FormInputPropInterface {
    name: keyof inputsDataInterface,
    type: string,
    errorMessage:string,
    label: string,
    pattern: string,
    required: boolean,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
    value: string
}
const FormInput = (prop: FormInputPropInterface)=>{
    const {name, type,label, onChange,errorMessage, ...inputProps} = prop
    const [hide, setHide] = useState<boolean>(true)
    const [passFocus, setPassFocus] = useState<boolean>(false)
    const [hide2, setHide2] = useState<boolean>(true)
    const [passFocus2, setPassFocus2] = useState<boolean>(false)
    const [focused, setFocused] = useState<boolean>(false)

    const onBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        if (e.target.name === 'password')
            setPassFocus(false)
        else if (e.target.name === 'password2')
            setPassFocus2(false)
        setFocused(true);
    };
    const onFocus = (e: React.FocusEvent<HTMLInputElement>) => {
        if (e.target.name === 'password')
            setPassFocus(true)
        else if (e.target.name === 'password2')
            setPassFocus2(true)
      };
    return(
        <div className={`${name === 'firstName' || name === 'lastName' ? 'w-[46%]' : 'mb-6 relative'}`}>

            <label htmlFor={name} className="block text-white font-bold mb-2">{label+":"}</label>
            <input
                type={name !== 'password' && name !== 'password2' ? type : ((name === 'password' && hide) || (name === 'password2' && hide2)) ? type : 'text'}
                {...inputProps}
                autoComplete='off'
                onChange={onChange}
                onFocus={onFocus}
                onBlur={onBlur}
                
                className={`${focused && 'focused'} bg-slate-900 w-full px-3 py-2 text-white outline-none rounded-2xl  duration-75 border border-slate-200 focus:border-slate-900 focus:bg-slate-200 focus:text-black`}
                />
            {
                name === 'password' && 
                <div className={`p-4 absolute right-1 -translate-y-[50%] top-[70%] cursor-pointer duration-75 ${passFocus ? 'text-black' : 'text-white' }`} onClick={() =>{
                    setHide(!hide)
                }}>
                    {hide ? <LuEyeOff/> : <LuEye/>}
                </div>
            }
            {
                name === 'password2' &&
                <div className={`p-4 absolute right-1 -translate-y-[50%] top-[70%] cursor-pointer duration-75 ${passFocus2 ? 'text-black' : 'text-white' }`} onClick={() =>{
                    setHide2(!hide2)
                }}>
                    {hide2 ? <LuEyeOff/> : <LuEye/>}
                </div>
            }
            <span>{errorMessage}</span>
        </div>
           
    )
    
}

export default FormInput