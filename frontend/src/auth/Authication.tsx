import React, { useContext } from 'react'
import { BrowserRouter, Routes, Route} from 'react-router-dom'
import { childrenInterface } from '../utils/interfaces';
import RouteProtection from './RouteProtection';
import Login from './Login'
import RegistrationForm from './Registration';
import Game from '../game/Game';

import ChatSection from '../components/ChatSection';
import Settings from '../components/Settings';
import { Toaster, toast } from 'sonner'
import LandingPage from '@/components/LandingPage';
import LandingPage2 from '@/components/Landing/LandingPage2';
import LoadingIndecator from '@/components/Loading';
import RedirectRoute from './RedirectRoute';
import RegisterForm from './RegisterForm';
function Auth(children:childrenInterface)
{
    
    return (
                <>
                    <Toaster position="top-right" richColors expand={true}  closeButton={true} toastOptions={{
                        className: "bg-black/50 backdrop-filter backdrop-blur-sm text-white "
                    }}/>
                    <Routes>
                        <Route path="/*" element={<RouteProtection>{children.children}</RouteProtection>}/>
                        <Route path="/login" element={<Login/>}/>
                        <Route path="/signup" element={<RegisterForm/>}/>
                        <Route path="/home" element={<LandingPage2/>}/>
                        {/* <Route path="/site" element={<Layout><ChatSection/></Layout>}/> */}
                    </Routes>
                </>

          
    )
}

export default Auth;