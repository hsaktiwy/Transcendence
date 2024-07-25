import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Profile from './website/profile/profile.tsx'
import Dashboard from './website/dashboard/dashboard.tsx'
import Testcmpo from './website/components-Profile/testcmpo.tsx'
import TopBar from './website/mobileVersion/topBar.tsx'

import { motion } from "framer-motion"

import Tmpfile from './tmpfile.tsx'

function App() {

  return (
    <>
      {/* <Tmpfile/> */}
      <TopBar/>
      {/* <Testcmpo/> */}
        {/* <Dashboard/> */}
        {/* <Profile/> */}
        
    </>
  )
}

export default App
