import React, { useContext } from 'react'
import { BrowserRouter, Routes, Route} from 'react-router-dom'
import { childrenInterface } from '../utils/interfaces';
import RouteProtection from './RouteProtection';
import Login from './Login'
import RegistrationForm from './Registration';
import ChatSection from '../components/ChatSection';
import Settings from '../components/Settings';
import { Toaster, toast } from 'sonner'
import LandingPage from '@/components/LandingPage';
function Auth(children:childrenInterface)
{
    
    return (
                <>
                    <Toaster position="top-right" richColors expand={true}  closeButton={true} toastOptions={{
                        className: "bg-black/50 backdrop-filter backdrop-blur-sm text-white "
                    }}/>
                    <Routes>
                        <Route path="/*" element={<RouteProtection>{children.children}</RouteProtection>}/>
                        <Route path="/login" element={<LandingPage/>}/>
                        <Route path="/signup" element={<RegistrationForm/>}/>
                        {/* <Route path="/site" element={<Layout><ChatSection/></Layout>}/> */}
                    </Routes>
                </>

          
    )
}

export default Auth;