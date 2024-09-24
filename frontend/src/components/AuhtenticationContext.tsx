import React, { useState, createContext } from "react";
import mailman from "@/utils/AxiosFetcher";
import { AxiosError } from "axios";

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
    loggedIn: boolean,
    setLoggedIn : React.Dispatch<React.SetStateAction<boolean> >,
    LoginAction : (data: LoginDataInterface) => Promise<LoginResp | LoginError>;

}

export const AuthContext = createContext<AuthContextInterface | undefined>(undefined)

const AuthProvider: React.FC<{ children: React.ReactNode}> = ({children}) =>{
    const [loggedIn, setLoggedIn] = useState<boolean>(false)
    const LoginAction = async (data: LoginDataInterface): Promise<LoginResp | LoginError> =>{
        try{
            const request = {
                url: '/api/user/login/',
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
            const loginError: LoginError = {
                message: 'login failed',
                errorType: axiosError.response ? axiosError.response?.data : axiosError.message,
                status: axiosError.response ? axiosError.response.status : 500
            }
            return loginError
        }
    }
    return <AuthContext.Provider value={{loggedIn, setLoggedIn, LoginAction}}>
        {children}
    </AuthContext.Provider>
}
export default AuthProvider