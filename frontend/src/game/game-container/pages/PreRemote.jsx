import React, { useState, useEffect } from 'react';
import "./PreRemote.css";
import { Frame } from "../components/Frame";
import { useNavigate } from "react-router-dom";

import { useRemoteGameContext } from '../game/MatchContext';



const PreRemote = () => {
  const navigate = useNavigate();
  const [isSearching, setIsSearching] = useState(false);
  const [matchSocket, setMatchSocket] = useState(null);
  const { setReomteGameData } = useRemoteGameContext();

  const startMatchmaking = () => {
    setIsSearching(true);
    
  try {
    const socket = new WebSocket(import.meta.env.VITE_ws_url + '/ws/server-endpoint-socket/');
    
    socket.onopen = () => {
    };
    
    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      
      if (data['type'] === 'match_found') {
        setReomteGameData({
          room_name: data['room_name'],
          role     : data['role'],
          my_user  : data['user_name'],
          opponent : data['opponent_name'],
          p1_id    : data['my_id'],
          p2_id    : data['opponent_id'],
          winner   : null
        });
        socket.close();
        setIsSearching(false);
        navigate('/game/RemoteGame');
      }
    };
    
    socket.onerror = (error) => {
      setIsSearching(false);
    };
    
    socket.onclose = () => {
      setIsSearching(false);
    };
    
    setMatchSocket(socket);

  }catch(error){
      navigate('/game/PingPong_Lobby');
  }

  };

  const cancelMatchmaking = () => {
    if (matchSocket && matchSocket.readyState === 1) {
      matchSocket.close();
      setIsSearching(false);
    }
  };

  useEffect(() => {
    return () => {
      if (matchSocket) {
        matchSocket.close();
      }
    };
  }, [matchSocket]);

  return (
    <>
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