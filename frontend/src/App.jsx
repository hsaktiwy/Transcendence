import Chat from './components/Chat'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import './App.css'

function App() {

  return (
    <>
      <div>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<RouteProtection><Chat/></RouteProtection>}>
             
          </Routes>
        </BrowserRouter>
      </div>
    </>
  )
}

export default App
