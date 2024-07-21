import React, {useEffect, createContext, useRef} from 'react'
import { ws_url } from './Constants'
import {channelType, WebSocketContextType, childrenInterface} from './interfaces'
import {CallbackType} from './types'

// type CallbackType = (message: any) => void
export const WebSocketContext = createContext<WebSocketContextType | unknown>(undefined)

export const WebSocketProvider = ({ children }:childrenInterface) => {
    const channels = useRef<channelType>({})
    const socket = useRef<WebSocket>()
  
    const AddMessage = (channelName: string, callback: CallbackType) => {
      channels.current[channelName] = callback
    }

    const RemoveChannel = (channelName: string) =>
    {
        delete channels.current[channelName]
    }

    useEffect(() => {
      const url:string = ws_url + '/ws/chat/'
      console.log(url)
      socket.current = new WebSocket(url)
  
      socket.current.onopen = () => {
        console.log('Connected')
      }
  
      socket.current.onclose = () => {
        console.log('Connection closed')
      }
  
      socket.current.onerror = (error) => {
        console.error('Error in WebSocket connection', error)
      }
  
      socket.current.onmessage = (message) => {
        const { type, ...data } = JSON.parse(message.data)
        // const channelName: string = `${type}_${data.channel}`
        console.log('type :' + type + '\n- ---> data :' + data.message )
        // if (channels.current[channelName]) {
        //   channels.current[channelName](data)
        // }
        // else
        //     channels.current[type]?.(data)
      }
  
      return () => {
        socket.current?.close()
      }
    }, [])

    return (<WebSocketContext.Provider value={[AddMessage, RemoveChannel]}>
            {children}
        </WebSocketContext.Provider>)
}
