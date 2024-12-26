// import { useState } from 'react'
// import NavBar from './components/NavBar'
// import Layout from './Layout'
// import ChatSection from './components/ChatSection'
import { BrowserRouter,Routes, Route} from 'react-router-dom'
import Auth from './auth/Authication'
//import { childrenInterface } from './utils/interfaces'
import Layout from './Layout'
import ChatSection from './components/ChatSection'
import { WebSocketProvider } from './utils/WSContext'
import Settings from './components/Settings'
import UserProvider from './components/UserContext'
import Dashboard from './components/Dashboard'
import LoadingIndecator from './components/Loading'
import { SkeletonTheme } from 'react-loading-skeleton'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import ProfileTest from './components/ProfileTest'
import TopBar from './components//website/mobileVersion/topBar'
import Game from './game/Game'
// import Profile from './components/Profile'
import AuthProvider from './components/AuhtenticationContext'
import LandingPage2 from './components/Landing/LandingPage2'
import RedirectRoute from './auth/RedirectRoute'
import RegisterForm from './auth/RegisterForm';
import ThreeScene from './components/ThreeScene'
import Profile from './components/website/profile/profile'
import GameCenter from './game/GameUi'

const App = () =>
{
  // const Components :childrenInterface = {site : <Layout>
  //         <ChatSection/>
  //       </Layout>}

  return (
    <BrowserRouter>
      <AuthProvider>
        <Auth>
          <WebSocketProvider>
            <UserProvider>
                <Routes>
                      <Route path='/'  element={ <Layout/>}>
                        <Route path='/profile/:username' element={ <ProfileTest/>}/>
                        <Route index element={ <Dashboard/>}/>
                        <Route path='/chat' element={ <ChatSection/>}/>
                        <Route path='/settings' element={ <Settings/>}/>
                        <Route path='/Game' element={<GameCenter />}/>
                      </Route>
                      <Route path='*' element={<LoadingIndecator/>}/>
                </Routes>
           </UserProvider>
          </WebSocketProvider>
        </Auth>
      </AuthProvider>
    </BrowserRouter>
    // <ThreeScene/>
  )
}

export default App


