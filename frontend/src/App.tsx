// import { useState } from 'react'
// import NavBar from './components/NavBar'
// import Layout from './Layout'
// import ChatSection from './components/ChatSection'
import Auth from './auth/Authication'
//import { childrenInterface } from './utils/interfaces'
import Layout from './Layout'
import ChatSection from './components/ChatSection'
import { WebSocketProvider } from './utils/WSContext'
import Settings from './components/Settings'
import UserProvider from './components/UserContext'
import { BrowserRouter,Routes, Route } from 'react-router-dom'
import Dashboard from './components/Dashboard'
import LoadingIndecator from './components/Loading'
import { SkeletonTheme } from 'react-loading-skeleton'
import ProfileTest from './components/ProfileTest'
import TopBar from './components//website/mobileVersion/topBar'
// import Profile from './components/Profile'
import AuthProvider from './components/AuhtenticationContext'
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
                        <Route path='/profile/:username' element={ <TopBar/>}/>
                        <Route index element={ <Dashboard/>}/>
                        <Route path='/chat' element={ <ChatSection/>}/>
                        <Route path='/settings' element={ <Settings/>}/>
                      </Route>
                      <Route path='*' element={<LoadingIndecator/>}/>
                </Routes>
           </UserProvider>
          </WebSocketProvider>
        </Auth>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App


