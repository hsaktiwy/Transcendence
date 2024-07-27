import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import Chat from './components/Chat.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App/>
  {/* <App name='User' age={44} isMarried={false} /> */}
  </React.StrictMode>
)
