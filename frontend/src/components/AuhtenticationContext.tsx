import React, { useState, createContext, useEffect } from "react";
import mailman from "@/utils/AxiosFetcher";
import { AxiosError } from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { error, log } from "console";
import { toast } from "sonner";
export interface LoginDataInterface{
    email: string,
    password: string
}
export interface VerifyTFAInterface{
    user: string,
    otp_code: string
}
export interface signUpDataInterface{
    firstName: string,
    lastName: string,
    login: string,
    email: string,
    password: string,
    password2: string,
}

export interface LoginResp{
    message: string,
    email?: string,
    password?: string
}
export interface LoginTFAResponse{
    message: string,
    user: string,
}

export interface LoginError{
    message: string,
    errorType: unknown,
    status: number
}
interface AuthContextInterface{
    loggedIn: boolean | undefined,
    setLoggedIn : React.Dispatch<React.SetStateAction<boolean | undefined> >,
    LoginAction : (data: LoginDataInterface) => Promise<LoginResp | LoginTFAResponse | LoginError>,
    VerifyTFA : (data: VerifyTFAInterface) => Promise<LoginResp >,
    checkLoggedInUser : () => void
    logout : () => void

}

export const AuthContext = createContext<AuthContextInterface | undefined>(undefined)

const AuthProvider: React.FC<{ children: React.ReactNode}> = ({children}) =>{
    const location = useLocation()
    const [loggedIn, setLoggedIn] = useState<boolean | undefined>(undefined)
    const Navigate = useNavigate();
    const LoginAction = async (data: LoginDataInterface): Promise<LoginResp  | LoginTFAResponse | LoginError> =>{
        try{
            const request = {
                url: '/api/user/login/',
                method: 'POST',
                withCredentials: true,
                data: data
            }
            const resp = await mailman(request)
            console.log(resp.data)
            if (resp.data.message === 'username needed'){
                return resp.data
            }
            else if (resp.data.user)
                return resp.data as LoginTFAResponse
            if (!loggedIn)
                setLoggedIn(true)
            return resp.data
        }
        catch (error){
            const axiosError = error as AxiosError
            const loginError: LoginError = {
                message: 'Login failed',
                errorType: axiosError.response ? axiosError.response?.data : axiosError.message,
                status: axiosError.response ? axiosError.response.status : 400
            }
            return loginError
        }
    }
    const VerifyTFA = async (data: VerifyTFAInterface): Promise<LoginResp> =>{
        try{
            const request = {
                url: '/api/user/verify2fa/',
                method: 'POST',
                withCredentials: true,
                data: data
            }
            const resp = await mailman(request)
            if (!loggedIn)
                setLoggedIn(true)
            return resp.data
        }
        catch (error){
            const axiosError = error as AxiosError
            const errorMessage =  axiosError.response?.data as LoginResp
            return {message:errorMessage.message}
    }
}
    const logout =  async () =>{
        if (loggedIn !== undefined){
            try{
                const request = {
                    url: '/api/user/logout/',
                    method: 'GET',
                    withCredentials: true,
                }
                const resp = await mailman(request)
                // if (loggedIn !== undefined && loggedIn === true){
                //     setLoggedIn(false)
                //     toast.info('User Logged out')
                // }
                
                
            }
            catch (error){
                toast.error('error occured')
            }
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
                if(resp.data['message'] && resp.data['message'] === 'user already logged in' && loggedIn === undefined)
                    setLoggedIn(true)

                else if (resp.data['message'] && resp.data['message'] === 'User logged in successfuly' && loggedIn === undefined)
                    setLoggedIn(true)

                else if (resp.data['message'] && resp.data['message'] === 'Anonymous user' && (loggedIn === true || loggedIn === undefined))
                    setLoggedIn(false)

            }
            catch(error){
                if (loggedIn === true)
                    setLoggedIn(false)
            }
  
    }
    useEffect(()=>{
        if (loggedIn === false)
            logout()
    }, [loggedIn])
    useEffect (() =>{
            checkLoggedInUser()
    },[location])
    return <AuthContext.Provider value={{loggedIn, setLoggedIn, LoginAction, VerifyTFA,checkLoggedInUser, logout}}>
        {children}
    </AuthContext.Provider>
}
export default AuthProvider