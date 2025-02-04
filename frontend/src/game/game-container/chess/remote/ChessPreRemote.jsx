import React, { useState, useEffect } from 'react';
import "./ChessPreRemote.css";
import { Frame } from "../../components/Frame";
import { useNavigate } from "react-router-dom";
import { useRemoteGameContext } from '../../game/MatchContext';

const ChessPreRemote = () => {
  const navigate = useNavigate();
  const [isSearching, setIsSearching] = useState(false);
  const [matchSocket, setMatchSocket] = useState(null);

  const { setReomteGameData } = useRemoteGameContext();

  

  const startMatchmaking = () => {
    setIsSearching(true);
    
    // Create WebSocket connection
    // const socket = new WebSocket('ws://localhost:8000/ws/server-endpoint-socket-chess/');
    const socket = new WebSocket(import.meta.env.VITE_ws_url + '/server-endpoint-socket-chess/');
    // const socket = new WebSocket('ws://10.11.5.2:8000/ws/server-endpoint-socket/');
    
    socket.onopen = () => {
      console.log("Matchmaking WebSocket Connected");
    };
    
    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      
      if (data['type'] === 'match_found') {
        console.log("=> Match Found:");
        console.log("   => room_name   :", data['room_name']);
        console.log("   => my_id       :", data['my_id']);
        console.log("   => opponent_id :", data['opponent_id']);
        console.log("   => color       :", data['color']);
        
        // Update match context

        setReomteGameData({
          room_name: data['room_name'],
          role     : data['role'],
          my_user  : data['user_name'],
          opponent : data['opponent_name'],
          p1_id    : data['my_id'],
          p2_id    : data['opponent_id'],
          color    : data['color'],
          winner   : null
        });
        
        // Close the socket and navigate to RemoteGame
        socket.close();
        setIsSearching(false);
        navigate('/game/ChessRemoteGame');
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

      {/* <ChessGameBack/> */}
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

export default ChessPreRemote;