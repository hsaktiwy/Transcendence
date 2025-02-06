

import { AuthContext } from "@/components/AuhtenticationContext";
import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";



function RedirectRoute()
{
    const AuthContextConsummer = useContext(AuthContext)
    if (!AuthContextConsummer)
        throw new Error("invalid scope");

   return  (
    <>
       AuthContextConsummer.loggedIn === true ? <Navigate to='/dashboard'/> : <Navigate to='/'/>
       <Outlet/>
    </>
   )

}

export default RedirectRoute;