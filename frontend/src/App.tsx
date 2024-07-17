// import { useState } from 'react'
// import NavBar from './components/NavBar'
// import Layout from './Layout'
// import ChatSection from './components/ChatSection'
import Auth from './auth/Authication'
//import { childrenInterface } from './utils/interfaces'
import Layout from './Layout'
import ChatSection from './components/ChatSection'
const App = () =>
{
  // const Components :childrenInterface = {site : <Layout>
  //         <ChatSection/>
  //       </Layout>}
  return (
      <Auth>
        <Layout>
          <ChatSection/>
        </Layout>
      </Auth>
  )
}

export default App


