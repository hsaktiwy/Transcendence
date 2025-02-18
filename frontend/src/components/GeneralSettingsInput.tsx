import React, { useState } from "react";
import { SettingsInputsDataInterface, SettingsInputsErrorInterface } from "./GeneralSettings";
import { FiEdit2 } from "react-icons/fi";

interface FormInputPropInterface {
    name?: keyof SettingsInputsDataInterface ,
    type: string,
    errorMessage:string,
    label: string,
    pattern: string,
    required: boolean,
    setInputsData: React.Dispatch<React.SetStateAction<SettingsInputsDataInterface> >,
    setChanged: React.Dispatch<React.SetStateAction<boolean> > ,
    changed?: boolean 
    value: string,
    inputsData?: SettingsInputsDataInterface,
    inputsError: SettingsInputsErrorInterface,
    setInputError: React.Dispatch<React.SetStateAction<SettingsInputsErrorInterface> >,
}

const GeneralSettingsInput = (prop: FormInputPropInterface)=>{
    const {value,name, type,label, inputsData ,pattern ,setInputsData, setChanged, changed ,errorMessage, inputsError, setInputError, ...inputProps} = prop
    const [error, setError] = useState<boolean>(false)

    const onBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        const inputRegex = new RegExp(pattern)
        if(!inputRegex.test(e.target.value.trim()) && error === false){
          if (name)
            setInputError({...inputsError, [name]: true})
          setError(true)
        }
        else if (inputRegex.test(e.target.value) && error === true){
          if (name){
            setInputError({...inputsError, [name]: false})
            if (inputsData)
              setInputsData({ ...inputsData, [name]: e.target.value.trim() });
          }
          setError(false)
        }
    };
   
    const onChange =(e: React.ChangeEvent<HTMLInputElement>) => {
        if(!changed)
            setChanged(true)
        if (inputsData && setInputsData && name)
            setInputsData({ ...inputsData, [name]: e.target.value });
    }
    return(
        <div className="flex items-center gap-4 justify-center flex-col sm:flex-row">
        <label htmlFor={name} className="w-[100px] self-start ">{label+':'}</label>
        <div className="group relative w-[220px] sm:w-[280px]  h-[70px] flex flex-col gap-2">
          <input
            {...inputProps}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            autoComplete="off"
            className={`border ${error ? 'border-red-500/50' : 'border-white/20'}  bg-black/35 backdrop-filter backdrop-blur-sm rounded-2xl py-1 px-4 flex justify-start items-start w-[220px] sm:w-[280px] outline-none focus:border focus:border-transparent focus:outline-1 focus:outline-[#5E97A9]`}
            />
          <div className=" -z-20 duration-100 invisible group-hover:visible absolute right-1 text-white/80 top-[18%] -translate-y-[18%]">
            <FiEdit2 />
          </div>
        <span className={`${error ? 'block' : 'hidden'} text-[12px] px-[10px] text-red-500 `}>{errorMessage}</span>
        </div>
      </div>
           
    )
    
}

export default GeneralSettingsInput