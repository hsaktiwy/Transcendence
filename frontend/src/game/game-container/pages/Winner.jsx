
// export default Winner;

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
  let Winner = '';
  
  // Remote LOgic
  const { ReomteGameData } = useRemoteGameContext();
  const { LocalGamesData } = useLocalGamesContext();
  
  
  useEffect( () => {
      if ((ReomteGameData.Winner === null || ReomteGameData.Winner === undefined)
        && (LocalGamesData.gametype === null  || LocalGamesData.gametype === undefined)
      ){
        navigate('/game/PingPong_Lobby');
      };
      
    }
  )
  
  console.log("===> Remote Winner : ", ReomteGameData.Winner);
  console.log("===> Local  Winner : ", LocalGamesData.Winner);

  if ((ReomteGameData !== null && ReomteGameData !== undefined) && (ReomteGameData.Winner !== null && ReomteGameData.Winner !== undefined)){
    Winner = ReomteGameData.Winner;
  }
  else if ((LocalGamesData !== null && LocalGamesData !== undefined) && (LocalGamesData.Winner !== null && LocalGamesData.Winner !== undefined)){
    Winner = LocalGamesData.Winner;
  }



  return (
    <>

  <div className="main-game-page-container">
        <div className="game-options-container-w">
          <div className="game-options-header-w Text-wt">
            <h1>Winner</h1>
          </div>
          
          <div className="players-container-w Text-tt">
            {/* Add your game content here */}
            <h1 >{Winner}</h1>
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