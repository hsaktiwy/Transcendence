import React, { useState, useEffect, useContext } from 'react';
import "./PreRemote.css";
import PingPongBack from "../components/PingPongBack";
import { Frame } from "../components/Frame";
import { useNavigate } from "react-router-dom";
// import { useMatchContext } from '../game/MatchContext';

import { useRemoteGameContext } from '../game/MatchContext';

import { UserContext } from '../../../components/UserContext'


const PreRemote = () => {
  const navigate = useNavigate();
  const [isSearching, setIsSearching] = useState(false);
  const [matchSocket, setMatchSocket] = useState(null);

  const { setReomteGameData } = useRemoteGameContext();
  const { ReomteGameData } = useRemoteGameContext();
  
  const backendPath = import.meta.env.VITE_BACKEND.substring(0, import.meta.env.VITE_BACKEND.length - 1)

  const user = useContext(UserContext)

  const username = user?.userData?.login;
  // const userId = user?.userData.;
  const image = user?.userData?.profile_pic;

  const UserId = user?.userData?.state;

  console.log("==> USERNAME : <", username, ">, image : <", image, ">, id : <", UserId, ">");

  let INVITE_TEXT = '';
  let show = false;
  console.log('===> is from game invite : ', ReomteGameData.form_game_invite);
  if (ReomteGameData.form_game_invite === true){
      INVITE_TEXT = ReomteGameData.inviter_login + ' VS ' + ReomteGameData.invited_login
      show = true
    //sending user's and it's opponent (invitee) infos to the backend and inform it it's not a normal matchmaking (setting room's status to INVITE_ROOM) retreive the room name in the frontend
    //fire a notification to the invited with th room name
    
    ///initiate the connection to the consumer telling it about the game
      
      // Create WebSocket connection

      useEffect(()=>{
        if (ReomteGameData.form_game_invite === true){

          const socket = new WebSocket(import.meta.env.VITE_ws_url + '/server-endpoint-socket/' + 'invite/' + ReomteGameData.invited_id);
          console.log("==>", import.meta.env.VITE_ws_url + '/server-endpoint-socket/' + 'invite/' + ReomteGameData.invited_id);
          
          socket.onopen = () => {
            console.log("Matchmaking WebSocket Connected");
          };
          
          socket.onmessage = (event) => {
            const data = JSON.parse(event.data);
            console.log("==> message received from the backend !");
            
            if (data['type'] === 'room_created') {
              console.log("=> room_created:");
              console.log("   => room_name     :", data['room_name']);
              console.log("   => my_role       :", data['role']);
              console.log("   => user_name     :", data['user_name']);
              console.log("   => opponent_name :", data['opponent_name']);
              console.log("   => my_id         :", data['my_id']);
              console.log("   => opponent_id   :", data['opponent_id']);
              
              //send notification the opponent, sending (room_name, ...)
              //send_notif // room_name: data['room_name']

              // useEffect( () => {
        
              console.log("===> trying to connect to : ", import.meta.env.VITE_ws_url + '/ping-pong/room/Bit_n3as');
              
              const tgameSocket = new WebSocket(import.meta.env.VITE_ws_url + '/ping-pong/room/Bit_n3as');
              
              tgameSocket.onopen = () => {
                  console.log("Connected to the game room:", 'Bit_n3as');
              };
              tgameSocket.onclose = () => {
                  console.log("Socket Disconnected !");
                };
              tgameSocket.onmessage = (event) => {
                const data = JSON.parse(event.data);
                if (data['type'] === 'match_found') {
                  console.log('====> match begin ...');

                  // Update Reomte context
                  setReomteGameData({
                    room_name: data['room_name'],
                    // role     : data['role'],
                    my_user  : data['user_name'],
                    // opponent : data['opponent_name'],
                    // p1_id    : data['my_id'],
                    // p2_id    : data['opponent_id'],
                    // winner   : null
                  });
                  
                  // Close the socket and navigate to RemoteGame
                  socket.close();
                  tgameSocket.close()
                  navigate('/game/RemoteGame');
                }
              }
            };
          }
          // setMatchSocket(socket);
        }
      }, [ReomteGameData.form_game_invite])


  }
  else{
    show = false
  }

  const startMatchmaking = () => {
    setIsSearching(true);
    
    // Create WebSocket connection
    const socket = new WebSocket(import.meta.env.VITE_ws_url + '/server-endpoint-socket/');
    console.log("==>", import.meta.env.VITE_ws_url + '/server-endpoint-socket/');
    
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
          room_name: 'Bit_n3as',
          // room_name: data['room_name'],
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
        {show && (
          <>
            <div className="players-container-r">
              <div className="invite-header">
                <h1 style={{fontSize:'35px'}} >{INVITE_TEXT}</h1>
                <p>Waiting for you friend to join ...</p>
              </div>
              <div className="circle-image">
                <img
                  src={backendPath + ReomteGameData.inviter_image}
                  alt="Inviter"
                  />
              </div>
              <span className="versus">VS</span>
              <div className="circle-image">
                <img
                  src={backendPath + ReomteGameData.invited_image}
                  alt="Invited"
                  />
              </div>
            </div>
          </>
        )}
        
        {!show && (<div className="players-container-r">
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
          </div>)}
        </center>
        
      </div>
      </div>
    </>
  );
};

export default PreRemote;