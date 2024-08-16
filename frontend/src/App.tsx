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
const App = () =>
{
  // const Components :childrenInterface = {site : <Layout>
  //         <ChatSection/>
  //       </Layout>}

  return (
    <BrowserRouter>
      <UserProvider>
        <Auth>
          <WebSocketProvider>
              <Routes>
                    <Route path='/' element={ <Layout>
                      <Settings/>
                      </Layout>
                    }/>
                    <Route path='/chat' element={ <Layout>
                      <ChatSection/>
                      </Layout>
                    }/>
                    <Route path='*' element={<LoadingIndecator/>}/>
              </Routes>
          </WebSocketProvider>
        </Auth>
      </UserProvider>
    </BrowserRouter>
  )
}

export default App


