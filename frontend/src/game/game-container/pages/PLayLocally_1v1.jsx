// import React from "react";
import "./GameOptions.css"; // any extra styling
import PingPongBack from "../components/PingPongBack";
import { Frame } from "../components/Frame";
import { useNavigate } from "react-router-dom";

import React, { useState, useEffect, useContext } from 'react';
import PlayerInput from '../components/PlayerInput';

import { useLocalGamesContext } from '../game/MatchContext';
import { toast } from 'react-toastify';



const PlayLocally_1v1 = () => {
  
  const navigate = useNavigate();

  const { setLocalGamesData } = useLocalGamesContext();


  const [player1Name, setPlayer1Name] = useState('Haskitwy1');
  const [player2Name, setPlayer2Name] = useState('Haskitwy2');


  return (
    <>

      {/* <PingPongBack /> */}
      <div className="main-game-page-container">


      <div className="game-options-container">
        <div className="game-options-header">
          <h1>GAME OPTIONS</h1>
          <p>TAP ON THE NAME OR AVATAR TO CHANGE IT.</p>
        </div>
        
        <div className="players-container">
          <PlayerInput
            playerId={1}
            initialName={player1Name}
            avatarSrc="/GamePub/bottouns/omar.jpg"
            onNameChange={setPlayer1Name}
            position='left'
            />
          
          <PlayerInput
            playerId={2}
            initialName={player2Name}
            avatarSrc="/GamePub/bottouns/le7ya.jpg"
            onNameChange={setPlayer2Name}
            position='right'
            />
        </div>

        <div className="buttona">
            <Frame
                text="Launch Game"
                default_icon='/GamePub/bottouns/default_offline.svg'
                hovered_icon='/GamePub/bottouns/hovered_offline.svg'
                onClick={() => {

                  const playerNames = [player1Name, player2Name];
                  const areNamesValid = playerNames.every(name => (name.length <= 8 && name.length > 0 && !/\s/.test(name))) && new Set(playerNames).size === playerNames.length;
                  
                  if (areNamesValid) {
                    setLocalGamesData({
                      gametype: 'Local', // Local, Multiplayer, Tournament 
                      player1: player1Name,
                      player2: player2Name,
                      player3: null,
                      player4: null,
                      Winner : null
                    });
                    navigate('/game/LocalGame')
                  } else {
                    toast.success('Error: Player names must be unique and less than or equal to 8 characters.')                    
                  }
                }}
            />
        </div>

      </div>
      </div>
    </>
  );
};



export default PlayLocally_1v1;