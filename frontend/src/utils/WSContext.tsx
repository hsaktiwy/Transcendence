import React, {useEffect, createContext, useRef, useState, useContext} from 'react'
import { ws_url } from './Constants'
import {channelType, WebSocketContextType, childrenInterface, defaultContextValue} from './interfaces'
import {CallbackType} from './types'
import {Message } from './ChatContext'

let inc: number = 222222 // desable the id that amine use later else we will use this 
// type CallbackType = (message: any) => void
export const WebSocketContext = createContext<WebSocketContextType | undefined>(undefined)

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
        connected.current = true
      }
      
      socket.current.onclose = () => {
        console.log('Connection closed')
        connected.current = false
        ReconnectSocket()
      }
      
      socket.current.onmessage = (message)=>
        {
        console.log('Connected' + socket.current?.protocol)
          try {
            const { type, ...data } = JSON.parse(message.data);
            if (type === 'send_message'){
              if (data.ConversationType == 'Message') {
                  const message_received: Message = {
                      id: data.message_id,
                      sender: data.user,
                      content: data.message,
                  };
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
              }
            }
            if (type === 'friendship'){
              if(channels.current['NOTIFICATION_ADD_FRIEND'])
              {
                const notifData =  JSON.parse(message.data); 
                channels.current['NOTIFICATION_ADD_FRIEND'](notifData)

              }
            }
            if (type === 'message'){
              if(channels.current['NOTIFICATION_MESSAGE'])
              {
                const notifData =  JSON.parse(message.data);
                channels.current['NOTIFICATION_MESSAGE'](notifData)
  
              }
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
