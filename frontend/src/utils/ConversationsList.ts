import { useEffect } from "react";
import {ChatSectionContext, Conversation, Message, User} from "./ChatContext"
import {BACKEND, CONVERSATION, MESSAGES_PACKET_SIZE} from './Constants'
import mailman from "./AxiosFetcher";
// let initila the data using the http protocol


export const init_conv = async (setLoading:React.Dispatch<React.SetStateAction<boolean>>,setActive:React.Dispatch<React.SetStateAction<Conversation | undefined>>, setConv:React.Dispatch<React.SetStateAction<Conversation[] | undefined>> , channel_id : number | undefined) =>
{
  console.log("channel____id     ",channel_id)
    let convs : Conversation[]
    let initialized:boolean = false
    let received:boolean = false
  console.log("bool" + initialized)
  if (initialized)
  {
    if (received)
    {
      setLoading(false)
     // setConv(convs)
     // setActive(convs[0])
    }
      return 
  }
  console.log("ola ola")
  initialized = true;
  const data = async () =>
  {
    console.log("strange")
    try {
      const url:string = CONVERSATION + MESSAGES_PACKET_SIZE + '/'
      const request = {
        url: url,
        method: 'GET',
        withCredentials: true,
      }
      const response = await mailman(request)
      console.log(response.data)
      const  holder:Conversation[] =  response.data as Conversation[]
      convs = holder.conversations
      received = true
      setLoading(false)
      setConv(convs)
      if (channel_id != undefined)
      {
        for (const conv of convs) {
          if (conv.channelId === channel_id) {
            setActive(conv)
            break;
          }
        }
      }
    }
    catch (error)
    {
      console.error(error)
      initialized = false;
    }
  }
  await data();
}

// export const UpdateConversation = (request) =>
// {

// }
