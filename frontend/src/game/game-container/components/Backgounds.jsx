import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import ChessGameBack from '../chess/ChessBack';
import PingPongBack from './PingPongBack';
// import ModelPreview from './ModelPreview';
import '../pages/MainGamePage.css'
import DefaultBack from './DefaultBack';
import ChessPreview from './ChessPreview';
import PingPongPreview from './PingPongPreview';


function Backgrounds() {
  const location = useLocation();
  const navigate = useNavigate();
  
  const OnChessRoute = [
    '/game/Chess_Lobby',
    '/game/ChessPreLocal',
    '/game/ChessPreRemote',
    '/game/ChessWinner'
  ].includes(location.pathname)

  const OnPongRoute = [
    '/game',
    '/game/',
    '/game/PingPong_Lobby',
    '/game/Tournament',
    '/game/PlayLocally_1v1',
    '/game/PreMultiplayer',
    '/game/PreTournament',
    '/game/PreRemote',
    '/game/PreInvite',
    '/game/Winner'
  ].includes(location.pathname)
  

  const show = (location.pathname ===  '/game') || (location.pathname ===  '/game/');
  
  // console.log(location.pathname, ", OnPongRoute : ", OnPongRoute, ", OnChessRoute : ", OnChessRoute, ", show : ", show);

  return (
    <>

        {/* <div className={OnChessRoute ? "" : "hidden-v"}>
          <ChessGameBack />
        </div>
        <div className={OnPongRoute ? "" : "hidden-v"}>
          <PingPongBack />
        </div> */}

        {/* <div className={show ? "" : "hidden-v"}>
          <DefaultBack />
          </div> */}


        {/* <div className="main-game-page-container"> */}
          {/* <div className={show ? "teams-container" : "hidden-v"} >
            <div className="team" onClick={() => {navigate('/game/Chess_Lobby')}}>
              <center>
                <h1>Chess Game</h1>
              </center>
              <ChessPreview />
            </div>
            <div className="team" onClick={() => {navigate('/game/PingPong_Lobby')}}>
              <center>
                <h1>Ping Pong</h1>
              </center>
              <PingPongPreview />
            </div>
          </div> */}
        {/* </div> */}
    </>
  );
}

export default Backgrounds;



