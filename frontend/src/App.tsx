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
const App = () =>
{
  // const Components :childrenInterface = {site : <Layout>
  //         <ChatSection/>
  //       </Layout>}

  return (
    <BrowserRouter>
        <Auth>
          <WebSocketProvider>
            <UserProvider>
                <Routes>
                      <Route path='/'  element={ <Layout/>}>
                        <Route index element={ <Dashboard/>}/>
                        <Route path='/chat' element={ <ChatSection/>}/>
                        <Route path='/profile/:username' element={ <ProfileTest/>}/>
                      </Route>
                      <Route path='*' element={<LoadingIndecator/>}/>
                </Routes>
           </UserProvider>
          </WebSocketProvider>
      </Auth>
    </BrowserRouter>
  )
}

export default App


