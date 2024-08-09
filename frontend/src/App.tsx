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
const App = () =>
{
  // const Components :childrenInterface = {site : <Layout>
  //         <ChatSection/>
  //       </Layout>}

  return (
    <UserProvider>
      <Auth>
        <WebSocketProvider>
          <Layout>
            <ChatSection/>
            {/* <Settings/> */}
          </Layout>
        </WebSocketProvider>
      </Auth>
    </UserProvider>
  )
}

export default App


