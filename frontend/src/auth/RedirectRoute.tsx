import React from "react";

import { AuthContext } from "@/components/AuhtenticationContext";
import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";

import LandingPage2 from "@/components/Landing/LandingPage2";

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