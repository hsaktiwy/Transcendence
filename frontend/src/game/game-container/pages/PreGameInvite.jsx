import React, { useState, useEffect, useContext } from 'react';
import "./PreRemote.css";
import { useNavigate } from "react-router-dom";

import { useRemoteGameContext } from '../game/MatchContext';

import { WebSocketContext } from '../../../utils/WSContext';


const PreInvite = () => {
  const navigate = useNavigate();
  const webSContext = useContext(WebSocketContext);
  const [docket, setDocket] = useState(null)

  const { setReomteGameData } = useRemoteGameContext();
  const { ReomteGameData } = useRemoteGameContext();
  
  const backendPath = import.meta.env.VITE_BACKEND.substring(0, import.meta.env.VITE_BACKEND.length - 1)

  let INVITE_TEXT = '';
  let show = false;

  console.log('===> is from game invite : ', ReomteGameData.form_game_invite);
  
  
  useEffect(()=>{
      console.log("==>> Reneredddd ! ", ReomteGameData.form_game_invite);
        let tmpsocket = null
        if (ReomteGameData.form_game_invite === true){
            INVITE_TEXT = ReomteGameData.inviter_login + ' VS ' + ReomteGameData.invited_login
            show = true
            tmpsocket = new WebSocket(import.meta.env.VITE_ws_url + '/ws/server-endpoint-socket/' + 'invite/' + ReomteGameData.invited_id);
            console.log("==>", import.meta.env.VITE_ws_url + '/ws/server-endpoint-socket/' + 'invite/' + ReomteGameData.invited_id);
            
            tmpsocket.onopen = () => {
                console.log("Inviting WebSocket Connected");
                // setDocket(tmpsocket)
            };
            tmpsocket.onclose = () => {
                console.log("==> Inviting Socket Disconnected !");
            };
            tmpsocket.onerror = (error) => {
                console.error("WebSocket Error:", error);
                navigate('/game/PreRemote');
            };
            tmpsocket.onmessage = (event) => {
                const data = JSON.parse(event.data);
                console.log("==> message received from the backend !", data);
                
                if (data['type'] === 'room_created') {
                // tmpsocket.close()
                console.log("=> room_created:");
                console.log("   => room_name     :", data['room_name']);
                console.log("   => my_role       :", data['role']);
                console.log("   => user_name     :", data['user_name']);
                console.log("   => opponent_name :", data['opponent_name']);
                console.log("   => my_id         :", data['my_id']);
                console.log("   => opponent_id   :", data['opponent_id']);

                ReomteGameData.room_name = data['room_name'];
                ReomteGameData.role      = data['role'];
                ReomteGameData.my_user   = data['user_name'];
                ReomteGameData.opponent  = data['opponent_name'];
                ReomteGameData.p1_id     = data['my_id'];
                ReomteGameData.p2_id     = data['opponent_id'];
                // setReomteGameData({
            // });
                
                //send notification the opponent, sending (room_name, ...)
                //send_notif // room_name: data['room_name']
                const req = {
                    type:  "GAME_INVITE",
                    room_name: data['room_name'],
                    receiver : data['opponent_id'],
                    
                    
                    // p1_id    : data['opponent_id'],
                    // p2_id    : data['my_id'],
                    
                    // my_user  : data['opponent_name'],
                    // opponent : data['user_name'],
                }
                console.log(JSON.stringify(req))
                if (webSContext && webSContext.socket)
                {
                    webSContext.socket.current.send(JSON.stringify(req))
                }
                
                
                
                console.log("===> trying to connect to : ", import.meta.env.VITE_ws_url + '/ws/ping-pong/room/' + data['room_name']);
                
                const tgameSocket = new WebSocket(import.meta.env.VITE_ws_url + '/ws/ping-pong/room/' + data['room_name']);
                
                tgameSocket.onopen = () => {
                    console.log("Connected to the game room:", data['room_name']);
                    
                };
                tgameSocket.onclose = () => {
                    console.log("==> ", data['room_name'], " room Socket Disconnected !");
                };
                tgameSocket.onerror = (error) => {
                    if (tmpsocket && tmpsocket.readyState === WebSocket.OPEN){
                        tmpsocket.close()
                    }
                    console.error("WebSocket Error:", error);
                    navigate('/game/PreRemote');
                };
                tgameSocket.onmessage = (event) => {
                    const data = JSON.parse(event.data);
                    if (data['type'] === 'match_found') {
                        console.log('====> match begin ...');
                        
                        ReomteGameData.inviting = true
                        ReomteGameData.gameSocket = tgameSocket
                        // ReomteGameData.form_game_invite = false
                        
                        // Update Reomte context
                        
                        if (tmpsocket && tmpsocket.readyState === WebSocket.OPEN){
                            tmpsocket.close()
                        }
                        setReomteGameData(ReomteGameData);
                        navigate('/game/RemoteGame');
                    }
                }
                };
            }
        }
        else{
            show = false
            navigate('/game/PingPong_Lobby')
        }

        return(() => {
            if (tmpsocket && tmpsocket.readyState === WebSocket.OPEN){
                tmpsocket.close()
                // ReomteGameData.form_game_invite = false
            }
        })

    }, [ReomteGameData.form_game_invite])


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
        
        </center>
        
      </div>
      </div>
    </>
  );
};

export default PreInvite;