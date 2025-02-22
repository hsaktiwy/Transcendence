
import React, { useEffect } from "react";
import "./ChessWinner.css";

import { Frame } from "../components/Frame";
import { useNavigate } from "react-router-dom";


import { useRemoteGameContext } from '../game/MatchContext';
import { useLocalGamesContext } from '../game/MatchContext';

const ChessWinner = () => {
  

    const navigate = useNavigate();
    let winner = '';
    
    const { ReomteGameData } = useRemoteGameContext();
    const { LocalGamesData } = useLocalGamesContext();
    

    useEffect( () => {
        if ((ReomteGameData.winner === null || ReomteGameData.winner === undefined)
          && (LocalGamesData.gametype === null  || LocalGamesData.gametype === undefined)
        ){
          navigate('/game/Chess_Lobby');
        };
        
      }
    )

    
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
              <h1 >{winner}</h1>
            </div>
            <div className="button-container-w">
              <Frame
                text="Main Game Page"
                default_icon='/GamePub/bottouns/default_offline.svg'
                hovered_icon='/GamePub/bottouns/hovered_offline.svg'
                onClick={() => {
                  navigate('/game/Chess_Lobby')
                }}
              />
            </div>
          </div>
        </div>
      </>
    );
  };
  

export default ChessWinner;