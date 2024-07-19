import React from 'react'
import { BrowserRouter, Routes, Route} from 'react-router-dom'
import { childrenInterface } from '../utils/interfaces';
import RouteProtection from './RouteProtection';
import Login from './Login'
import RegistrationForm from './Registration';

function Auth(children:childrenInterface)
{
    return (
  
            <div className='min-h-[100vh] h-[100vh]'>

            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<RouteProtection>{children.children}</RouteProtection>}/>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/signup" element={<RegistrationForm/>}/>
                    {/* <Route path="/site" element={<Layout><ChatSection/></Layout>}/> */}
                </Routes>
            </BrowserRouter>
            </div>
    )
}

export default Auth;