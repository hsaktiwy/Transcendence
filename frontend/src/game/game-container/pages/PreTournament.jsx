// import React from "react";
import "./PreRemote"; // any extra styling
import PingPongBack from "../components/PingPongBack";
import { Frame } from "../components/Frame";
import { useNavigate } from "react-router-dom";

import React, { useEffect, useState } from 'react';
import PlayerInput from '../components/PlayerInput';
import { useLocalGamesContext } from '../game/MatchContext';

import './PreTournament.css';



const PreTournament = () => {
  const navigate = useNavigate();

  const [player1Name, setPlayer1Name] = useState('');
  const [player2Name, setPlayer2Name] = useState('');
  const [player3Name, setPlayer3Name] = useState('');
  const [player4Name, setPlayer4Name] = useState('');

  const { setLocalGamesData } = useLocalGamesContext();
  const { LocalGamesData } = useLocalGamesContext();

  const handleLaunch = () => {   
    
    const playerNames = [player1Name, player2Name, player3Name, player4Name];
    const areNamesValid = playerNames.every(name => (name.length <= 8 && name.length > 0 && !/\s/.test(name))) && new Set(playerNames).size === playerNames.length;
    
    if (areNamesValid) {
      setLocalGamesData({
        gametype: 'Tournament', // Local, Multiplayer, Tournament 
        player1: player1Name,
        player2: player2Name,
        playerx1: player1Name,
        playerx2: player2Name,
        player3: player3Name,
        player4: player4Name,
        TBD1   : null,
        TBD2   : null,
        F1_turn: true,
        F2_turn: false,
        FF_turn: false,
        F1_done: false,
        F2_done: false,
        FF_done: false,
        Winner : null
      });
      navigate('/game/Tournament');
    } else {
      alert('Error: Player names must be unique and less than or equal to 8 characters.');
    }
  };

  return (
    <>

      <div className="main-game-page-container">

      <div className="game-options-container">
        <div className="game-options-header">
          <h1>GAME OPTIONS</h1>
          <p>TAP ON THE NAME OR AVATAR TO CHANGE IT.</p>
        </div>

        <div className="players-container">
            <div>
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
                    avatarSrc="/GamePub/bottouns/omar.jpg"
                    onNameChange={setPlayer2Name}
                    position='left'
                    />
            </div>
            <div>
                <PlayerInput
                    playerId={3}
                    initialName={player3Name}
                    avatarSrc="/GamePub/bottouns/le7ya.jpg"
                    onNameChange={setPlayer3Name}
                    position='right'
                    />
                
                <PlayerInput
                    playerId={4}
                    initialName={player4Name}
                    avatarSrc="/GamePub/bottouns/le7ya.jpg"
                    onNameChange={setPlayer4Name}
                    position='right'
                    />
                </div>
            </div>

        <div className="buttona">
            <Frame
                text="Launch The Game"
                default_icon='/GamePub/bottouns/default_offline.svg'
                hovered_icon='/GamePub/bottouns/hovered_offline.svg'
                onClick={handleLaunch}
            />
        </div>

      </div>
      </div>
    </>
  );
};



export default PreTournament;