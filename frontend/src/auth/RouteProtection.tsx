import { useContext, useRef, useState } from 'react';
import {Navigate} from 'react-router-dom';
import { useEffect } from 'react';
import { BACKEND, SESSION_CHECKPATH } from '../utils/Constants';
import { childrenInterface } from '../utils/interfaces';
import React from 'react'
import mailman from '../utils/AxiosFetcher';
import { UserContext } from '../components/UserContext';
import { AuthContext } from '@/components/AuhtenticationContext';
import LoadingIndecator from '@/components/Loading';
// const [Auth, setAuth] = useState<number>(-1);


// useEffect( () =>
//     {
//         if (Auth === -1)
//         {
//             console.log('check-|>>')
//             check()
//         }
//     }, [Auth]
// );
// // identify if the user is already authenticated
// //! if yes check if the sessionid is coreect
//     //! if yes return
// const  check = async () =>
// {
//     const url:string = BACKEND + SESSION_CHECKPATH
//     try {
//         const request = {
//             url: url,
//             withCredentials: true
//         }
//         const response = await mailman(request)
//         await console.log("response from protect   :", response.data)
//         setAuth(1)
//     } catch (error) {
//         setAuth(0)
//         console.error(`Error checking session: ${error}`);
//     }
// }
// if (Auth === -1)
// {
//     return (
//         <div>
//             Checking credentials ...
//         </div>
//     )
// }
// // cause our fucntion is async we will need something to wait untell it finished 
// //* at the end if the user is authenticated reurn the children else Navigate to login
function RouteProtection(children: childrenInterface)
{

    // const checkLoggedInUser = async () => {
    //     try{
    //         const req = {
    //             url: '/api/user/check/',
    //             method: 'GET',
    //             withCredentials: true,
    //         }
    //         const resp = await mailman(req)
    //         AuthContextConsummer?.setLoggedIn(true)
    //     }
    //     catch(error){
    //         AuthContextConsummer?.setLoggedIn(false)
    //     }
    // } 
    const AuthContextConsummer = useContext(AuthContext)
    if (!AuthContextConsummer)
        throw new Error("invalid scope");

    // useEffect(() =>{
    //     if (!AuthContextConsummer?.loggedIn){
    //         console.log("ZZZZZKNAXAHIOHACOH")
    //         AuthContextConsummer?.checkLoggedInUser()
    //     }
    // },[AuthContextConsummer?.loggedIn])
   return AuthContextConsummer.loggedIn !== undefined ? AuthContextConsummer.loggedIn ? (<>{children.children}</>) : (<><Navigate to='/login'/></>) : <LoadingIndecator/>

}

export default RouteProtection;