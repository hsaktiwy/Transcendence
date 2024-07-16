import React from 'react'
import { BrowserRouter, Routes, Route} from 'react-router-dom'
// import { childrenInterface } from '../utils/interfaces';
import RouteProtection from './RouteProtection';
import Layout from '../Layout'
import ChatSection from '../components/ChatSection'
import Login from './Login'
function Auth()
{
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<RouteProtection/>}/>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/site" element={<Layout><ChatSection/></Layout>}/>
                </Routes>
            </BrowserRouter>
        </>
    )
}

export default Auth;