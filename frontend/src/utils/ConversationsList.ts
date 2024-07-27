import { useEffect } from "react";
import Conversations from "../components/Conversations";
import {ChatSectionContext, Conversation, Message, User} from "./ChatContext"
import {BACKEND, CONVERSATION} from './Constants'

// let initila the data using the http protocol
export let convs : Conversation[]
export let initialized:boolean = false
export let received:boolean = false

export const init_conv = (setLoading:React.Dispatch<React.SetStateAction<boolean>>,setActive:React.Dispatch<React.SetStateAction<Conversation | undefined>>, setConv:React.Dispatch<React.SetStateAction<Conversation[] | undefined>>) =>
{
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
      const url:string = BACKEND + CONVERSATION
      const responce =  await fetch(url,{
        credentials: 'include'
      })
      if (!responce.ok)
        throw new Error('Failed to Conversations');
      if (responce.ok)
      {
        received = true
        const  holder:Conversation[] = await responce.json() as Conversation[]
        console.log("bro ")
        setLoading(false)
        convs = holder.conversations
        setConv(convs)
        // console.log(convs[0]);
        // setActive(convs[0])
      }
    }
    catch (error)
    {
      console.error(error)
      initialized = false;
    }
  }
  data();
}

// export const UpdateConversation = (request) =>
// {

// }
