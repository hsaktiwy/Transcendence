import React, { useState, createContext, useEffect } from "react";
import mailman from "@/utils/AxiosFetcher";
import { AxiosError } from "axios";
import { useLocation } from "react-router-dom";
export interface LoginDataInterface{
    login: string,
    password: string
}

export interface LoginResp{
    message: string
}

export interface LoginError{
    message: string,
    errorType: unknown,
    status: number
}
interface AuthContextInterface{
    loggedIn: boolean | undefined,
    setLoggedIn : React.Dispatch<React.SetStateAction<boolean | undefined> >,
    LoginAction : (data: LoginDataInterface) => Promise<LoginResp | LoginError>,
    checkLoggedInUser : () => void

}

export const AuthContext = createContext<AuthContextInterface | undefined>(undefined)

const AuthProvider: React.FC<{ children: React.ReactNode}> = ({children}) =>{
    const location = useLocation()
    const [loggedIn, setLoggedIn] = useState<boolean | undefined>(undefined)
    const LoginAction = async (data: LoginDataInterface): Promise<LoginResp | LoginError> =>{
        try{
            const request = {
                url: '/api/user/login/',
                method: 'POST',
                withCredentials: true,
                data: data
            }
            const resp = await mailman(request)
            console.log(resp.headers['csrf_token'])
            if (!loggedIn)
                setLoggedIn(true)
            return resp.data
        }
        catch (error){
            const axiosError = error as AxiosError
            const loginError: LoginError = {
                message: 'Login failed',
                errorType: axiosError.response ? axiosError.response?.data : axiosError.message,
                status: axiosError.response ? axiosError.response.status : 500
            }
            return loginError
        }
    }
    const checkLoggedInUser = async () => {
        try{
            const req = {
                url: '/api/user/check/',
                method: 'GET',
                withCredentials: true,
            }
            const resp = await mailman(req)
     
            if(resp.data['message'] && resp.data['message'] === 'user already logged in')
                setLoggedIn(true)
            else
                setLoggedIn(false)


        }
        catch(error){
            setLoggedIn(false)
        }
    }
    useEffect (() =>{
        checkLoggedInUser()
    },[location])
    return <AuthContext.Provider value={{loggedIn, setLoggedIn, LoginAction, checkLoggedInUser}}>
        {children}
    </AuthContext.Provider>
}
export default AuthProvider