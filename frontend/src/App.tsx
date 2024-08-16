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
import Game from './game/Game'
const App = () =>
{
  // const Components :childrenInterface = {site : <Layout>
  //         <ChatSection/>
  //       </Layout>}
  return (
      <BrowserRouter>
        <Auth>
          <WebSocketProvider>
            <Layout>
                <Routes>
                  <Route path='/' element={ <ChatSection/>}/>
                  <Route path='/Game' element={<Game />}/>
                </Routes>
            </Layout>
          </WebSocketProvider>
        </Auth>
      </BrowserRouter>
  )
}

export default App


