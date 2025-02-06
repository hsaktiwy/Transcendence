import {Conversation} from "./ChatContext"
import mailman from "./AxiosFetcher";
// let initila the data using the http protocol


export const init_conv = async (setLoading:React.Dispatch<React.SetStateAction<boolean>>,setActive:React.Dispatch<React.SetStateAction<Conversation | undefined>>, setConv:React.Dispatch<React.SetStateAction<Conversation[] | undefined>> , channel_id : number | undefined) =>
{
  console.log("channel____id     ",channel_id)
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
    console.log("hmm: ", import.meta.env.VITE_MESSAGES_PACKET_SIZE)
    try {
      const url:string = import.meta.env.VITE_CONVERSATION + import.meta.env.VITE_MESSAGES_PACKET_SIZE + '/'
      const request = {
        url: url,
        method: 'GET',
        withCredentials: true,
      }
      const response = await mailman(request)
      console.log(response.data)
      const  conversations:Conversation[] =  response.data.conversations as Conversation[]
      received = true
      setLoading(false)
      setConv(conversations)
      if (channel_id !== undefined) {
        const activeConversation = conversations.find(conv => conv.channelId === channel_id)
        if (activeConversation) {
          setActive(activeConversation)
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
