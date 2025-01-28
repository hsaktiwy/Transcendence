
// export default Winner;

import React, { useEffect, useState } from "react";
import "./Winner.css";
import PingPongBack from "../components/PingPongBack";
import { Frame } from "../components/Frame";
import { useNavigate } from "react-router-dom";


// import { useMatchContext } from './MatchContext';
// import { useRemoteGameContext } from '../game/MatchContext';

// import { useMatchContext } from '../game/MatchContext';

import { useRemoteGameContext } from '../game/MatchContext';
// import { UserContext } from '../../../components/UserContext'



// const RemoteGame = () => {
    
  
const Winner = () => {

  const navigate = useNavigate();
  
  // Remote LOgic
  // const { matchData } = useMatchContext();
  const { ReomteGameData } = useRemoteGameContext();

  console.log("===> Winner : ", ReomteGameData.Winner);
  
  // if (ReomteGameData.Winner === null || ReomteGameData.Winner === undefined){
  //     navigate('/game/PingPong_Lobby');
  // };
  
  // const matchId = localStorage.getItem("matchId");
  const [winner, setWinner] = useState(ReomteGameData.Winner)

  useEffect( () => {
    if (ReomteGameData.Winner === null || ReomteGameData.Winner === undefined){
        navigate('/game/PingPong_Lobby');
    };
    
    }, [ReomteGameData.Winner]
  )



  return (
    <>

      {/* <PingPongBack /> */}
  <div className="main-game-page-container">
        <div className="game-options-container-w">
          <div className="game-options-header-w Text-wt">
            <h1>Winner</h1>
          </div>
          
          <div className="players-container-w Text-tt">
            {/* Add your game content here */}
            <h1 >{winner}</h1>
          </div>
          <div className="button-container-w">
            <Frame
              text="Main Game Page"
              default_icon='/GamePub/bottouns/default_offline.svg'
              hovered_icon='/GamePub/bottouns/hovered_offline.svg'
              onClick={() => {
                // localStorage.removeItem('Matches_data');
                // localStorage.removeItem('Matches_history');
                // localStorage.removeItem("matchId")
                navigate('/game/PingPong_Lobby')
              }}
            />
            {/* <Frame
              text="Re-Match"
              default_icon='/GamePub/bottouns/default_offline.svg'
              hovered_icon='/GamePub/bottouns/hovered_offline.svg'
              onClick={() => {
                // localStorage.removeItem('Matches_data');
                // localStorage.removeItem('Matches_history');
                // localStorage.removeItem("matchId")
                navigate('/game/LocalGame')
              }}
            /> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default Winner;