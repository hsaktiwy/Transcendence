import { BrowserRouter,Routes, Route} from 'react-router-dom'
import Auth from './auth/Authication'
//import { childrenInterface } from './utils/interfaces'
import Layout from './Layout'
import ChatSection from './components/ChatSection'
import { WebSocketProvider } from './utils/WSContext'
import Settings from './components/Settings'
import UserProvider from './components/UserContext'
import Dashboard from './components/Dashboard'
import LoadingIndecator from './components/Loading'
import { SkeletonTheme } from 'react-loading-skeleton'

import 'react-loading-skeleton/dist/skeleton.css'
import ProfileTest from './components/ProfileTest'

// import Profile from './components/Profile'
import AuthProvider from './components/AuhtenticationContext'


// import GameCenter from './game/GameUi'





import RemoteGame from './game/game-container/game/RemoteScene.jsx';
// import WebSocketComponent from './game/game-container/game/Matchmaking.jsx';

import Lobby from './game/game-container/pages/Lobby.jsx';


import PlayLocally_1v1 from './game/game-container/pages/PLayLocally_1v1.jsx';

import LocalGame from './game/game-container/game/LocalScene.jsx';

import Tournament from './game/game-container/pages/Tournament.jsx';

import PreTournament from './game/game-container/pages/PreTournament.jsx';

import Winner from './game/game-container/pages/Winner.jsx';

import PreRemote from './game/game-container/pages/PreRemote.jsx';

import { RemoteGameProvider } from './game/game-container/game/MatchContext.jsx';

import { LocalGamesProvider } from './game/game-container/game/MatchContext.jsx';

import PreMultiplayerGame from './game/game-container/pages/PreMultiplayerGame.jsx';

import MultiplayerGame from './game/game-container/game/Multiplayer.jsx';

import ChessLobby from './game/game-container/chess/LobbyChess.jsx';

import LocalChessGame from './game/game-container/chess/LocalSceneChess.jsx';

import ChessPreRemote from './game/game-container/chess/remote/ChessPreRemote.jsx';

import ChessRemoteGame from './game/game-container/chess/remote/ChessRemoteScene.jsx';

import MainGamePage from './game/game-container/pages/MainGamePage.jsx';

import ChessPreLocal from './game/game-container/chess/ChessPreLocal.jsx';

import ChessWinner from './game/game-container/chess/ChessWinner.jsx';

// import Backgrounds from './game/game-container/components/Backgounds.jsx';




const App = () =>
{
  // const Components :childrenInterface = {site : <Layout>
  //         <ChatSection/>
  //       </Layout>}

  return (
  
  <SkeletonTheme baseColor="#242b2f" highlightColor="#444">
    <BrowserRouter>
      {/* <Backgrounds/> */}
        <AuthProvider>
          <Auth>
            <WebSocketProvider>
              <UserProvider>
                <RemoteGameProvider >
                  <LocalGamesProvider>
                    <Routes>
                      <Route path='/'  element={ <Layout/>}>
                      <Route path='/profile/:uuid' element={ <ProfileTest/>}/>
                      <Route index element={ <Dashboard/>}/>
                      <Route path='/chat' element={ <ChatSection/>}/>
                      <Route path='/settings' element={ <Settings/>}/>

                      <Route path='/game' element={<MainGamePage />}/>
                      <Route path='/game/PingPong_Lobby' element={<Lobby />}/>
                      <Route path='/game/PlayLocally_1v1' element={<PlayLocally_1v1 />}/>
                      <Route path='/game/LocalGame' element={<LocalGame />}/>
                      <Route path='/game/PreRemote' element={<PreRemote />}/>
                      <Route path='/game/RemoteGame' element={<RemoteGame />}/>
                      <Route path='/game/Winner' element={<Winner />}/>
                      <Route path='/game/PreMultiplayer' element={<PreMultiplayerGame />}/>
                      <Route path='/game/Multiplayer' element={<MultiplayerGame />}/> 
                      
                      <Route path='/game/PreTournament' element={<PreTournament />}/>
                      <Route path='/game/Tournament' element={<Tournament />}/>

                      <Route path='/game/Chess_Lobby' element={<ChessLobby />}/>
                      <Route path='/game/ChessPreLocal' element={<ChessPreLocal />}/>
                      <Route path='/game/ChessPreRemote' element={<ChessPreRemote />}/>
                      <Route path='/game/ChessLocally' element={<LocalChessGame />}/>
                      <Route path='/game/ChessRemoteGame' element={<ChessRemoteGame />}/>
                      <Route path='/game/ChessWinner' element={<ChessWinner />}/>
                      
                      </Route>

                      <Route path='*' element={<LoadingIndecator/>}/>
                    </Routes>
                  </LocalGamesProvider>
                </RemoteGameProvider>
              </UserProvider>
            </WebSocketProvider>
          </Auth>
        </AuthProvider>
      </BrowserRouter>
    </SkeletonTheme>

  )
}

export default App
