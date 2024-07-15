import { useState } from 'react'
import NavBar from './components/NavBar'
import Layout from './Layout'
import ChatSection from './components/ChatSection'
import Auth from './auth/Authication'
import { childrenInterface } from './utils/interfaces'

const App = () =>
{
  const Components :childrenInterface = {children : <Layout>
          <ChatSection/>
        </Layout>}
  return (
      <Auth element={Components}/>
  )
}

export default App


