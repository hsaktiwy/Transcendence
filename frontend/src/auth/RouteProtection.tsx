import { useState } from 'react';
import {Navigate} from 'react-router-dom';
import { useEffect } from 'react';
import { Backend } from '../utils/Contants';
import React from 'react'

function RouteProtection()
{
    const [Auth, setAuth] = useState<number>(-1);

    useEffect( () =>
        {
            console.log('wtf')
            check()
        }, []
    );
    // identify if the user is already authenticated
    //! if yes check if the sessionid is coreect
        //! if yes return
    const  check = async () =>
    {
        const url:string = Backend + "api/session/"
        await fetch(url, {
            credentials: "include"
        }).then((res) => {
            setAuth(1)
            console.log(res)
        }).catch((err) =>{
            console.error(err)
            setAuth(0)
        })
    }
    if (Auth == -1)
    {
        return (
            <div>
                Checking credentials ...
            </div>
        )
    }
    // cause our fucntion is async we will need something to wait untell it finished 
    //* at the end if the user is authenticated reurn the children else Navigate to login
   return Auth === 1 ? (<><Navigate to='/site'/></>) : (<><Navigate to='/login'/></>)

}

export default RouteProtection;