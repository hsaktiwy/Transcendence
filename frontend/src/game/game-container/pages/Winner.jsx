
// export default winner;

import React, { useEffect, useState, UserContext } from "react";
import "./Winner.css";
import PingPongBack from "../components/PingPongBack";
import { Frame } from "../components/Frame";
import { useNavigate } from "react-router-dom";


// import { useMatchContext } from './MatchContext';
// import { useRemoteGameContext } from '../game/MatchContext';

// import { useMatchContext } from '../game/MatchContext';

import { useRemoteGameContext } from '../game/MatchContext';
import { useLocalGamesContext } from '../game/MatchContext';



  
const Winner = () => {

  const navigate = useNavigate();
  let winner = '';
  
  // Remote LOgic
  const { ReomteGameData } = useRemoteGameContext();
  const { LocalGamesData } = useLocalGamesContext();
  
  
  useEffect( () => {
      if ((ReomteGameData.winner === null || ReomteGameData.winner === undefined)
        && (LocalGamesData.gametype === null  || LocalGamesData.gametype === undefined)
      ){
        navigate('/game/PingPong_Lobby');
      };
      
    }
  )
  
  console.log("===> Remote winner : ", ReomteGameData.winner);
  console.log("===> Local  winner : ", LocalGamesData.winner);

  if ((ReomteGameData !== null && ReomteGameData !== undefined) && (ReomteGameData.winner !== null && ReomteGameData.winner !== undefined)){
    winner = ReomteGameData.winner;
  }
  else if ((LocalGamesData !== null && LocalGamesData !== undefined) && (LocalGamesData.winner !== null && LocalGamesData.winner !== undefined)){
    winner = LocalGamesData.winner;
  }



  return (
    <>

  <div className="main-game-page-container">
        <div className="game-options-container-w">
          <div className="game-options-header-w Text-wt">
            <h1>winner</h1>
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
                navigate('/game/PingPong_Lobby')
              }}
            />
            {/* <Frame
              text="Re-Match"
              default_icon='/GamePub/bottouns/default_offline.svg'
              hovered_icon='/GamePub/bottouns/hovered_offline.svg'
              onClick={ () => {
                navigate('/game/LocalGame')
              }
              }
            /> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default Winner;