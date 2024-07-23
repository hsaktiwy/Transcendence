import { useState } from 'react';
import {Navigate} from 'react-router-dom';
import { useEffect } from 'react';
import { BACKEND, SESSION_CHECKPATH } from '../utils/Contants';
import { childrenInterface } from '../utils/interfaces';
import React from 'react'

function RouteProtection(children: childrenInterface)
{
    const [Auth, setAuth] = useState<number>(-1);

    useEffect( () =>
        {
            if (Auth === -1)
            {
                console.log('check-|>>')
                check()
            }
        }, [Auth]
    );
    // identify if the user is already authenticated
    //! if yes check if the sessionid is coreect
        //! if yes return
    const  check = async () =>
    {
        const url:string = BACKEND + SESSION_CHECKPATH
        try {
            const response = await fetch(url, {
                credentials: "include"
            });

            if (response.ok) {
                setAuth(1);
            } else {
                setAuth(0);
                console.error(`Failed to check session: ${response.status}`);
            }
        } catch (error) {
            setAuth(0);
            console.error(`Error checking session: ${error}`);
        }
    }
    if (Auth === -1)
    {
        return (
            <div>
                Checking credentials ...
            </div>
        )
    }
    // cause our fucntion is async we will need something to wait untell it finished 
    //* at the end if the user is authenticated reurn the children else Navigate to login
   return Auth === 1 ? (<>{children.children}</>) : (<><Navigate to='/login'/></>)

}

export default RouteProtection;