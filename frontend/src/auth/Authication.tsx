import React from 'react'
import { BrowserRouter, Routes, Route} from 'react-router-dom'
import { childrenInterface } from '../utils/interfaces';
import RouteProtection from './RouteProtection';
import Login from './Login'
function Auth({children} : childrenInterface)
{
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<RouteProtection>{children}</RouteProtection>}/>
                    <Route path="/login" element={<Login/>}/>
                </Routes>
            </BrowserRouter>
        </>
    )
}

export default Auth;