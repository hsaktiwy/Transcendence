import React, { useState, useEffect, useContext } from 'react';
import "./PreRemote.css";
import { useLocation, useNavigate } from "react-router-dom";

import { useRemoteGameContext } from '../game/MatchContext';

import { WebSocketContext } from '../../../utils/WSContext';


const PreInvite = () => {
  const navigate = useNavigate();
  const webSContext = useContext(WebSocketContext);
  const [docket, setDocket] = useState(null)

  const { setReomteGameData } = useRemoteGameContext();
  const { ReomteGameData } = useRemoteGameContext();
  const location = useLocation()
  const backendPath = import.meta.env.VITE_BACKEND.substring(0, import.meta.env.VITE_BACKEND.length - 1)

  let INVITE_TEXT = '';
  let show = false;

  useEffect(()=>{
        let ready = false
        let tmpsocket = null
        let tgameSocket = null
        if (ReomteGameData.form_game_invite === true){
            INVITE_TEXT = ReomteGameData.inviter_login + ' VS ' + ReomteGameData.invited_login
            show = true
        try{    
            tmpsocket = new WebSocket(import.meta.env.VITE_ws_url + '/ws/server-endpoint-socket/' + 'invite/' + ReomteGameData.invited_id);
            
            tmpsocket.onopen = () => {
            };
            tmpsocket.onclose = (err) => {
                if (err.code !== 1000){
                    navigate('/game/PreRemote');
                }
            };
            tmpsocket.onerror = (error) => {
                navigate('/game/PreRemote');
            };
            tmpsocket.onmessage = (event) => {
                const data = JSON.parse(event.data);
                
                if (data['type'] === 'room_created') {

                ReomteGameData.room_name = data['room_name'];
                ReomteGameData.role      = data['role'];
                ReomteGameData.my_user   = data['user_name'];
                ReomteGameData.opponent  = data['opponent_name'];
                ReomteGameData.p1_id     = data['my_id'];
                ReomteGameData.p2_id     = data['opponent_id'];
                
                //send_notif // room_name: data['room_name']
                const req = {
                    type:  "GAME_INVITE",
                    room_name: data['room_name'],
                    receiver : data['opponent_id'],
                }
                if (webSContext && webSContext.socket && webSContext.socket.current && webSContext.socket.current.readyState === WebSocket.OPEN)
                {
                    webSContext.socket.current.send(JSON.stringify(req))
                }
                
                tgameSocket = new WebSocket(import.meta.env.VITE_ws_url + '/ws/ping-pong/room/' + data['room_name']);
                
                tgameSocket.onopen = () => {
                    
                };
                tgameSocket.onclose = () => {
                };
                tgameSocket.onerror = (error) => {
                    if (tmpsocket && tmpsocket.readyState === WebSocket.OPEN){
                        tmpsocket.close()
                    }
                    navigate('/game/PreRemote');
                };
                tgameSocket.onmessage = (event) => {
                    const data = JSON.parse(event.data);
                    if (data['type'] === 'match_found') {
                        ready = true
                        
                        ReomteGameData.inviting = true
                        ReomteGameData.gameSocket = tgameSocket
                        ReomteGameData.form_game_invite = false
                        
                        
                        if (tmpsocket && tmpsocket.readyState === WebSocket.OPEN){
                            tmpsocket.close()
                        }
                        setReomteGameData(ReomteGameData);
                        navigate('/game/RemoteGame');
                    }
                }
            };
        }
        
        }catch(error){
            navigate('/game/PingPong_Lobby');
        }
    }
    else{
        show = false
        navigate('/game/PingPong_Lobby')
    }

        return(() => {
            if (tmpsocket && tmpsocket.readyState === WebSocket.OPEN){
                tmpsocket.close()
            }
            if (!ready){
                if (tgameSocket && tgameSocket.readyState === WebSocket.OPEN){
                    tgameSocket.close()
                }
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