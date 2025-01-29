import React, { useState, useEffect, useContext } from 'react';
import "./PreRemote.css";
import PingPongBack from "../components/PingPongBack";
import { Frame } from "../components/Frame";
import { useNavigate } from "react-router-dom";
import { useMatchContext } from '../game/MatchContext';
import { useRemoteGameContext } from '../game/MatchContext';

import { UserContext } from '../../../components/UserContext'


const PreRemote = () => {
  const navigate = useNavigate();
  const [isSearching, setIsSearching] = useState(false);
  const [matchSocket, setMatchSocket] = useState(null);
  
  const { setMatchData } = useMatchContext();
  const { setReomteGameData } = useRemoteGameContext();
  

  const user = useContext(UserContext)

  const username = user?.userData?.login;
  // const userId = user?.userData.;
  const image = user?.userData?.profile_pic;

  const UserId = user?.userData?.state;

  console.log("==> USERNAME : <", username, ">, image : <", image, ">, id : <", UserId, ">");
  

  const startMatchmaking = () => {
    setIsSearching(true);
    
    // Create WebSocket connection
    const socket = new WebSocket(import.meta.env.VITE_ws_url + '/server-endpoint-socket/' + username);
    console.log("==>", import.meta.env.VITE_ws_url + '/server-endpoint-socket/');
    
    socket.onopen = () => {
      console.log("Matchmaking WebSocket Connected");
    };
    
    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      
      if (data['type'] === 'match_found') {
        console.log("=> Match Found:");
        console.log("   => room_name     :", data['room_name']);
        console.log("   => my_id         :", data['my_id']);
        console.log("   => opponent_id   :", data['opponent_id']);
        console.log("   => user_name     :", data['user_name']);
        console.log("   => user_image    :", data['user_image']);
        console.log("   => opponent_name :", data['opponent_name']);
        console.log("   => opponent_image:", data['opponent_image']);
        
        // Update match context
        setMatchData({
          roomName: data['room_name'],
          myId: data['my_id'],
          opponentId: data['opponent_id'],
        });
        
        
        // Update Reomte context
        setReomteGameData({
          player1 : data['user_name'],
          player2 : data['opponent_name'],
          p1_image: data['user_image'],
          p2_image: data['opponent_image'],
          winner  : null
        });
        // Close the socket and navigate to RemoteGame
        socket.close();
        setIsSearching(false);
        navigate('/game/RemoteGame');
      }
    };
    
    socket.onerror = (error) => {
      console.error("WebSocket Error:", error);
      setIsSearching(false);
    };
    
    socket.onclose = () => {
      console.log("Matchmaking WebSocket Closed");
    };
    
    setMatchSocket(socket);
  };

  const cancelMatchmaking = () => {
    if (matchSocket) {
      matchSocket.close();
      setIsSearching(false);
    }
  };

  useEffect(() => {
    // Cleanup socket on component unmount
    return () => {
      if (matchSocket) {
        matchSocket.close();
      }
    };
  }, [matchSocket]);

  return (
    <>

      {/* <PingPongBack /> */}
      <div className="main-game-page-container">


      <div className="game-options-container-r">
        <div className="game-options-header-r">
          <h1>GAME OPTIONS</h1>
          <p>TAP ON THE NAME OR AVATAR TO CHANGE IT.</p>
        </div>
        <center>
          <div className="players-container-r">
            <div className="buttona-r">
              {!isSearching ? (
                <Frame
                  text="Find An Opponent"
                  default_icon='/GamePub/bottouns/default_offline.svg'
                  hovered_icon='/GamePub/bottouns/hovered_offline.svg'
                  onClick={startMatchmaking}
                />
              ) : (
                <Frame
                  text="Searching... (Cancel)"
                  default_icon='/GamePub/bottouns/default_offline.svg'
                  hovered_icon='/GamePub/bottouns/hovered_offline.svg'
                  onClick={cancelMatchmaking}
                />
              )}
            </div>
          </div>
        </center>
        
      </div>
      </div>
    </>
  );
};

export default PreRemote;