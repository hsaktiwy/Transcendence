
import { Routes, Route} from 'react-router-dom'
import { childrenInterface } from '../utils/interfaces';
import RouteProtection from './RouteProtection';
import Login  from './Login'




import { Toaster} from 'sonner'

import LandingPage2 from '@/components/Landing/LandingPage2';


import RegisterForm from './RegisterForm';
import { ToastContainer } from 'react-toastify';
function Auth(children:childrenInterface)
{
    
    return (
                <>
                    <Toaster position="top-right" richColors expand={true}  closeButton={true} toastOptions={{
                        className: "bg-black/50 backdrop-filter backdrop-blur-sm text-white "
                    }}/>
                    <ToastContainer
                        position="top-right"
                        autoClose={2000}
                        hideProgressBar={false}
                        newestOnTop={false}
                        closeOnClick={false}
                        rtl={false}
                        pauseOnFocusLoss
                        draggable
                        pauseOnHover
                        theme="light"
                    />
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