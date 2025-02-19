import {useEffect, createContext, useRef, useContext} from 'react'
import {channelType, WebSocketContextType, childrenInterface, friendship} from './interfaces'
import {CallbackType} from './types'
import {Message } from './ChatContext'
import { AuthContext } from '@/components/AuhtenticationContext'

export const WebSocketContext = createContext<WebSocketContextType | undefined>(undefined)

export const WebSocketProvider = ({ children }:childrenInterface) => {
    const channels = useRef<channelType>({})
    const socket = useRef<WebSocket>()
    const connected = useRef<boolean>(false)
    const authContextConsumer =  useContext(AuthContext)
    if (!authContextConsumer)
      throw new Error('error occured')

    const AddChannel= (channelName: string, callback: CallbackType) => {
        channels.current[channelName] = callback
    }

    const RemoveChannel = (channelName: string, ) =>
    {
        delete channels.current[channelName]
    }

    const ConnectSocket = ()=>
    {
      const url:string = import.meta.env.VITE_ws_url + '/ws/chat/'
      if (!connected.current)
        socket.current = new WebSocket(url)
  
      if (!socket.current)
        return;
    
      socket.current.onopen = () => {
        connected.current = true
      }
      
      socket.current.onclose = (_event) => {
        connected.current = false
      }
      
      socket.current.onmessage = (message)=>
        {
          try {
            const { type, ...data } = JSON.parse(message.data);
            if (type === 'send_message'){
              if (data.ConversationType == 'Message') {
                const message_received: Message = {
                    id: data.message_id,
                    sender: data.user,
                    content: data.message,
                    timestamp: data.timestamp,
                    isread: data.is_read
                };
                const channelId = data.channel;
                if (channels.current['CHAT'])
                  channels.current['CHAT'](data)
                if (channels.current['CHATROOM'])
                  channels.current['CHATROOM'](message_received, channelId)
              }
            }
            if (type === 'friendship'){
              if(channels.current['NOTIFICATION_ADD_FRIEND'] || channels.current['NOTIFICATION_ACCEPT_FRIEND'])
              {
                const notifData =  JSON.parse(message.data);
                if (notifData['friend_req_status' ] === 'pending')
                {
                  channels.current['NOTIFICATION_ADD_FRIEND'](notifData)
                  if (channels.current['FriendRequestReceived'])
                    channels.current['FriendRequestReceived'](notifData);
                }
                else{
                  channels.current['NOTIFICATION_ACCEPT_FRIEND'](notifData)
                  if (channels.current['FriendRequestAccepted'])
                    channels.current['FriendRequestAccepted'](notifData)
                }
              }
            }

            if (type === 'gameInvitation')
            {
              if(channels.current['NOTIFICATION_GAME_INVITE'])
              {
                const notifData =  JSON.parse(message.data);
                channels.current['NOTIFICATION_GAME_INVITE'](notifData)
              }
            }
            if (type === 'profile_notif')
            {
              const info: friendship = {
                action: data.action,
                sender: data.sender,
                status: data.status

              };
              if (channels.current[info.action])
                channels.current[info.action](info)
              if (info.action === 'NOTIFICATION_UNCONNECT'){
                console.log(message.data)
                channels.current['UPDATE_FRIEND_LIST'](info.sender)
              }
              else{
                console.log(message.data)
                channels.current['UPDATE_FRIENDSHIP'](info)
              }
            }
            if (type === 'message'){
                if (channels.current['UPDATE_CHAT_NOTIF'])
                {
                  const notifData =  JSON.parse(message.data);
                  channels.current['UPDATE_CHAT_NOTIF'](notifData)
                }
                if(channels.current['NOTIFICATION_MESSAGE'])
                {
                  const notifData =  JSON.parse(message.data);
                  channels.current['NOTIFICATION_MESSAGE'](notifData)
                }
            }
            if (type === 'state'){
              const notifData =  JSON.parse(message.data);
              if (channels.current['NOTIFICATION_STATE'])
                channels.current['NOTIFICATION_STATE'](notifData)
            }
            if (type == "NOTIFICATION")
            {
              if(channels.current['NOTIFICATION'])
              {
                const notifData =  JSON.parse(message.data);
                channels.current['NOTIFICATION'](notifData)
              }
            }
        } catch (error) {
            console.error('Error processing WebSocket message:', error);
        }
      }
    }

    useEffect(() => {

      if (authContextConsumer.loggedIn === true)
        ConnectSocket()
      else if (connected.current === true)
          socket.current?.close()

      return () => {
        if (socket.current)
          socket.current.close()
      }
    }, [connected, authContextConsumer.loggedIn])

    return (<WebSocketContext.Provider value={{AddChannel, RemoveChannel, socket}}>
            {children}
        </WebSocketContext.Provider>)
}