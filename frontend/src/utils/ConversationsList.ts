import {Conversation} from "./ChatContext"
import mailman from "./AxiosFetcher";

export const init_conv = async (setLoading:React.Dispatch<React.SetStateAction<boolean>>,setActive:React.Dispatch<React.SetStateAction<Conversation | undefined>>, setConv:React.Dispatch<React.SetStateAction<Conversation[] | undefined>> , channel_id : number | undefined) =>
{
    try {
      const url:string = import.meta.env.VITE_CONVERSATION + import.meta.env.VITE_MESSAGES_PACKET_SIZE + '/'
      const request = {
        url: url,
        method: 'GET',
        withCredentials: true,
      }
      const response = await mailman(request)
      const  conversations:Conversation[] =  response.data.conversations as Conversation[]
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
    }
}
