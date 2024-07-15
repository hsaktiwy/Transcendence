import { useState } from 'react'
import NavBar from './components/NavBar'
import Layout from './Layout'
import ChatSection from './components/ChatSection'

const App = () =>
{
  return (
      <Layout>
        <ChatSection/>
      </Layout>
  )
}

export default App


