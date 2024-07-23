// import { useState } from 'react'
// import NavBar from './components/NavBar'
// import Layout from './Layout'
// import ChatSection from './components/ChatSection'
import Auth from './auth/Authication'
//import { childrenInterface } from './utils/interfaces'
import Layout from './Layout'
import ChatSection from './components/ChatSection'
import LandingPage from './components/LandingPage'
const App = () =>
{
  // const Components :childrenInterface = {site : <Layout>
  //         <ChatSection/>
  //       </Layout>}
  return (
    
      <Layout>
        <ChatSection/>
      </Layout>
        // <LandingPage/>
 
  )
}

export default App


