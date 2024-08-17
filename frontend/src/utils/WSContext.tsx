import React, {useEffect, createContext, useRef, useState, useContext} from 'react'
import { ws_url } from './Constants'
import {channelType, WebSocketContextType, childrenInterface} from './interfaces'
import {CallbackType} from './types'
import {Message } from './ChatContext'

let inc: number = 222222 // desable the id that amine use later else we will use this 
// type CallbackType = (message: any) => void
export const WebSocketContext = createContext<WebSocketContextType | unknown>(undefined)

export const WebSocketProvider = ({ children }:childrenInterface) => {
    const channels = useRef<channelType>({})
    const socket = useRef<WebSocket>()
    const connected = useRef<boolean>(false)
    const [inc, setInc] = useState(200000);

    /// ??
    // const chatContext = useContext(ChatSectionContext);
    // if (!chatContext) throw new Error('ChatSectionContext not found');
    /// ??

    const AddChannel= (channelName: string, callback: CallbackType) => {
      channels.current[channelName] = callback
    }

    const RemoveChannel = (channelName: string, ) =>
    {
        delete channels.current[channelName]
    }

    const ConnectSocket = ()=>
    {
      const url:string = ws_url + '/ws/chat/'
      console.log(url)
      console.log ('------------>' + connected)
      if (!connected.current)//
        socket.current = new WebSocket(url)
  
      socket.current.onopen = () => {
        console.log('Connected')
        connected.current = true
      }
  
      socket.current.onclose = () => {
        console.log('Connection closed')
        connected.current = false
        ReconnectSocket()
      }

      socket.current.onmessage = (message)=>
      {
          try {
            const { type, ...data } = JSON.parse(message.data);
            // const channelId = data.channel;
            console.log('allo' + message.data)
            console.log(channels.current['CHATROOM'])
            console.log(channels.current['CHAT'])
            if (data.ConversationType == 'Message') {
                const message_received: Message = {
                    id: data.message_id,
                    sender: data.user,
                    content: data.message,
                };
                // setInc(prevInc => prevInc + 1);
                // // Assuming chatContext.setConvs is a state update function
                // chatContext.setConvs((prevConvs: Conversation[]) => {
                //     const updatedConvs = prevConvs.map(conv =>
                //         conv.channelId === channelId
                //             ? { ...conv, LastUpdate: data.LastUpdate ,messages: [...conv.messages, message_received] }
                //             : conv
                //     );
                //     updatedConvs.sort((a, b)=>{
                //       const DateA = new Date(a.LastUpdate) 
                //       const DateB = new Date(b.LastUpdate)
                //       console.log(DateA)
                //       console.log(DateB)
                //       return DateB - DateA;
                //     })
                //     console.log('Updated convs:', updatedConvs);
                // Also update the active conversation if it's the same as the channelId
                const channelId = data.channel;
                console.log("wa zbi "+ channelId)
                if (channels.current['CHAT'])
                {
                  console.log("in :  channels.current['CHAT']")
                  channels.current['CHAT'](data)
                }
                if (channels.current['CHATROOM'])
                {
                  console.log("in :  channels.current['CHATROOM']")
                  channels.current['CHATROOM'](message_received, channelId)
                }
                // return updatedConvs;
                // });
            }
        } catch (error) {
            console.error('Error processing WebSocket message:', error);
        }
      }
    }
    
    const ReconnectSocket = ()=>
    {
          const delay = 1000 // Exponential backoff, max delay 30s
          setTimeout(() => ConnectSocket(), delay)
    }
  
    useEffect(() => {
      ConnectSocket()
      return () => {
        // Close the WebSocket connection when the component is unmounted
        if (socket.current) {
          socket.current.close()
        }
      }
    }, [connected])

    return (<WebSocketContext.Provider value={{AddChannel, RemoveChannel, socket}}>
            {children}
        </WebSocketContext.Provider>)
}
