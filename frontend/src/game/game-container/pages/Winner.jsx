
// export default Winner;

import React, { useEffect, useState } from "react";
import "./Winner.css";
import PingPongBack from "../components/PingPongBack";
import { Frame } from "../components/Frame";
import { useNavigate } from "react-router-dom";

const Winner = () => {
  const navigate = useNavigate();
  const matchId = localStorage.getItem("matchId");
  const [winner, setWinner] = useState('')


  useEffect( () => {
      if (matchId === null){
        navigate('/game');
      }
      else{
        const matchData = JSON.parse(localStorage.getItem("Matches_data"));
        setWinner(matchData[matchId].winner);
      }
    }, [matchId]
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
                localStorage.removeItem('Matches_data');
                localStorage.removeItem('Matches_history');
                localStorage.removeItem("matchId")
                navigate('/game/PingPong_Lobby')
              }}
            />
            <Frame
              text="Re-Match"
              default_icon='/GamePub/bottouns/default_offline.svg'
              hovered_icon='/GamePub/bottouns/hovered_offline.svg'
              onClick={() => {
                localStorage.removeItem('Matches_data');
                localStorage.removeItem('Matches_history');
                localStorage.removeItem("matchId")
                navigate('/game/LocalGame')
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Winner;