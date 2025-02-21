import React, { useState, useEffect, useContext } from 'react';
import "./PreRemote.css";
import PingPongBack from "../components/PingPongBack";
import { Frame } from "../components/Frame";
import { useNavigate } from "react-router-dom";
// import { useMatchContext } from '../game/MatchContext';

import { useRemoteGameContext } from '../game/MatchContext';

import { UserContext } from '../../../components/UserContext'
import { WebSocketContext } from '../../../utils/WSContext';


const PreRemote = () => {
  const navigate = useNavigate();
  const [isSearching, setIsSearching] = useState(false);
  const [matchSocket, setMatchSocket] = useState(null);
  const webSContext = useContext(WebSocketContext);
  const { setReomteGameData } = useRemoteGameContext();
  const { ReomteGameData } = useRemoteGameContext();
  
  const backendPath = import.meta.env.VITE_BACKEND.substring(0, import.meta.env.VITE_BACKEND.length - 1)
  const user = useContext(UserContext)

  const startMatchmaking = () => {
    setIsSearching(true);
    
    // Create WebSocket connection
    const socket = new WebSocket(import.meta.env.VITE_ws_url + '/ws/server-endpoint-socket/');
    console.log("==>", import.meta.env.VITE_ws_url + '/ws/server-endpoint-socket/');
    
    socket.onopen = () => {
      console.log("Matchmaking WebSocket Connected");
    };
    
    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      
      if (data['type'] === 'match_found') {
        console.log("=> Match Found:");
        console.log("   => room_name     :", data['room_name']);
        console.log("   => my_role       :", data['role']);
        console.log("   => user_name     :", data['user_name']);
        console.log("   => opponent_name :", data['opponent_name']);
        console.log("   => my_id         :", data['my_id']);
        console.log("   => opponent_id   :", data['opponent_id']);
        
        
        // Update Reomte context
        setReomteGameData({
          // room_name: 'Bit_n3as',
          room_name: data['room_name'],
          role     : data['role'],
          my_user  : data['user_name'],
          opponent : data['opponent_name'],
          p1_id    : data['my_id'],
          p2_id    : data['opponent_id'],
          winner   : null
        });
        // Close the socket and navigate to RemoteGame
        socket.close();
        setIsSearching(false);
        navigate('/game/RemoteGame');
      }
    };
    
    socket.onerror = (error) => {
      // console.error("WebSocket Error:", error);
      setIsSearching(false);
    };
    
    socket.onclose = () => {
      console.log("Matchmaking WebSocket Closed");
      setIsSearching(false);
    };
    
    setMatchSocket(socket);
  };

  const cancelMatchmaking = () => {
    if (matchSocket) {
      matchSocket.close();
      setIsSearching(false);
    }
  };


  // #tbe
  useEffect(() => {
    // Cleanup socket on component unmount
    return () => {
      // setReomteGameData({hello:'hello'})
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