import { useState, useEffect, useContext } from 'react';
import { motion, Variants } from 'framer-motion';
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import { UserContext } from "./UserContext";
import mailman from '@/utils/AxiosFetcher';
import { WebSocketContext } from '@/utils/WSContext';
import { Loading__ } from "@/auth/Login";
import { IoPersonRemoveOutline } from "react-icons/io5";
import { TbMessage2 } from "react-icons/tb";
import { MdBlock } from "react-icons/md";
import { IoPersonAddOutline } from "react-icons/io5";
import { FiUser } from "react-icons/fi";
import { channel } from 'diagnostics_channel';
import {NotificationPropreties} from './UserContext'
import { ProfileDataInterface, UserDataInterface } from '@/utils/UserDataInterface';
import { SlLock } from "react-icons/sl";
import { friendship } from '@/utils/interfaces';

interface buttonInterface{
  user: UserDataInterface | ProfileDataInterface | undefined
}

function ConnectButton(prop: buttonInterface) {
  const navigate =  useNavigate()
  const [isOpen, setIsOpen] = useState(false);
  const [status, setStatus] = useState("accept");
  const [isblock, setIsbLock] = useState<boolean>(false);
  const [btn_block, setBtn_block] = useState("Block");
  const [isfriend, setIsfriend] = useState("");
  const [FriendRequest, setFriendRequest] = useState("")
  const [friend_req_id, setFriendRequestId] = useState<number>(-1)
  const [loading, setLoading] = useState<boolean>(true)
  const [channelId, setChannelId] = useState<number | undefined>(undefined)
  const [blocker, setBloker] = useState<boolean>(false)

  const {uuid} = useParams();
  const userContextConsumer = useContext(UserContext)

  const SocketContext = useContext(WebSocketContext)
    if (!SocketContext)
        throw new Error('error')
  const {AddChannel,RemoveChannel} = SocketContext
  const handleAcceptClick = () => {
    setIsOpen(true);
    setStatus("accepted");
  };
  
  const getChannelId = async () =>{
      try{
          const req = {
              url: "/chat/conversation/get_channel/"+uuid+'/',
              method: 'GET'
          }
          const resp = await mailman(req)
          const id:number = resp.data.channel_id;
          if (id)
              setChannelId(id);
      }
      catch (error){


      }
  }

  const BlockActionCheck = async ()=>
  {
    if (prop.user){
      try{
        const req = {
          url: "friendship/"+ (isblock ? "unblock":"block")+ "/"+uuid,
          method: "GET",
          withCredentials: true,
        }
        const resp = await mailman(req)
        // userContextConsumer?.blockList.push()
        // console.log('hana ->>>>>', resp)
        const user = prop.user as ProfileDataInterface
        if (!isblock)
        {
          userContextConsumer?.setBlockList(prev=>[...prev, user])
          userContextConsumer?.setFriends(prev=>prev.filter(friend => friend.unique_id!==user.unique_id))
        }
        else
        {
          userContextConsumer?.setBlockList((prev) =>{
            return(
              prev.filter(blocked => blocked.unique_id!== user.unique_id)
            )
          })
          userContextConsumer?.setFriends(prev=>[...prev, user])
        }
        setBtn_block(isblock ? 'Block' : 'Unblock');
        setIsbLock(!isblock)
        const notification = {
          type: 'NotifBlock',
          to : uuid,
          status: isblock
        }
        console.log(notification)
        const message = JSON.stringify(notification)
        SocketContext?.socket?.current?.send(message)
      }
      catch(err)
      {
          console.log("Block status ", err)
      }
    }
    else
      console.log(prop.user)
  }

  const BlockStatusCheck = async ()=>
  {
      try{
        const req = {
          url:'friendship/block_status/'+ uuid,
          method: 'GET',
          withCredentials:true,
        }
        const resp = await mailman(req)
        const  responce:boolean = resp.data['status']
        setIsbLock(responce)
        setBtn_block(responce ? 'UnBlock' : 'Block');
        console.log('block  status  heere  ->>>>', resp.data);
        if(resp.data['blocker'] ===  userContextConsumer?.userData?.unique_id)
        {
            setBloker(true);
        }
        else
          setBloker(false);
      }
      catch(err)
      {
          console.log("Block status ", err)
      }
  }


  const FriendStatusCheck = async ()=>
  {
    try{
        const req = {
          url:'friendship/is/FRIEND/'+ uuid,
          method: 'GET',
          withCredentials:true,
        }
        const resp = await mailman(req)
        const  responce:boolean = resp.data['status']
        setIsfriend(responce ? 'UNFRIEND' : 'CONNECT' );
        console.log("rrrrrr    ----- ,", responce)
        if (responce)
          await getChannelId()
        console.log(resp)
        // if  (responce)
        // {
        const req2 = {
          url:'friendship/status/'+ uuid,
          method: 'GET',
          withCredentials:true,
        }
        
        const resp2 = await mailman(req2)
        const  st:string = resp2.data['status']
        const  sender:boolean = resp2.data['sender']
        const  fr_id:number = resp2.data["friend_req_id"]
        setFriendRequestId(fr_id)
        console.log(resp2)
        if (st === "pending")
          setFriendRequest((sender) ? 'Pending': 'Accept')
        // }
        // console.log(responce)
    }
    catch(err)
    {
        console.log("Friend status ", err)
    }
  }
  useEffect(()=>{
    // and does the main user have block relationship with the searched one (the one in useparam)
    BlockStatusCheck()
    // friendship ? 
    FriendStatusCheck()
    // does we have sent or recieved request, [case 1, case 2]
    // friendship ?
    // does we have
    setLoading(false)
  } , [uuid]);
  // FIRST FETCH DATA ABOUT THE USER
  // CASE 1: NO FRIEND REQUEST STATUS : SEND,BLOCK
  // CASE 2: ...: PENDING
  // CASE 3: FRIEND : UNFRIEND + SENDMESSAGE,BLOCK
  // 

  // add our state update to the socket channel

  useEffect(()=>{
    console.log("FRIENDDDS ====>", userContextConsumer?.friends)
    const FriendRequestAccepted = (data:NotificationPropreties)=>{
      if (data.sender.unique_id == uuid)
      {
        //console.log('ACCEPTED :', uuid, data)
        getChannelId()
        setFriendRequest("")
        setIsfriend("UNFRIEND")
      }
    }
    const FriendRequestReceived = (data:NotificationPropreties)=>{
      if (data.sender.unique_id == uuid)
      {
        // console.log('RECEIVED :', uuid, data)
        setFriendRequestId(data.friend_request_id)
        setFriendRequest('Accept')
      }
    }
  
    const TOCONNECT = (data:friendship)=>{
      console.log('+===========================+++++++++++++++++', data)
      if (data.sender.unique_id == uuid)
      {
        setFriendRequest("")
        setIsfriend("CONNECT")

      }
    }
    const blocknotify = (data:friendship)=>{
        setBloker(false);
        setIsbLock(true);
        userContextConsumer?.setBlockList(prev=>[...prev])
    }
    AddChannel('FriendRequestAccepted', FriendRequestAccepted)
    AddChannel('FriendRequestReceived', FriendRequestReceived)
    AddChannel('NOTIFICATION_UNCONNECT', TOCONNECT)
    AddChannel('NotifBlock', blocknotify)

    return () => {
      // Remove the CHAT call back function when we exist the chat section
      RemoveChannel('FriendRequestAccepted')
      RemoveChannel('FriendRequestReceived')
      RemoveChannel('NOTIFICATION_UNCONNECT')
      RemoveChannel('NotifBlock')

    }
  },[])
  const send_friend_request = ()=>{
    const notification = {
      type: 'NOTIFICATION_ADD_FRIEND',
      to : uuid
    }
    const message = JSON.stringify(notification)
    SocketContext?.socket?.current?.send(message)
    FriendStatusCheck()
  }
  


  const accept_friend_request = async () =>
  {
      try{

          if (friend_req_id != -1)
          {
            const req = {
              url: `/friendship/request/status/set/accept/${friend_req_id}`,
              method: 'GET',
            }
            const resp = await mailman(req)
            userContextConsumer?.fetchFriends()
            const notification = {
              type: 'NOTIFICATION_ACCEPT_FRIEND',
              to : uuid
            }
            const message = JSON.stringify(notification)
            SocketContext?.socket?.current?.send(message)
            setFriendRequest("")
            setIsfriend("UNFRIEND")
            console.log("hmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm?")
            getChannelId()
          }
          // we need to rest all thing to get back to what it should be
      }
      catch(e){
          console.log(e)
      }
  }

  const Cancel_friend_request = async () =>
  {
      try{

          if (friend_req_id != -1)
          {
            const req = {
              url: `/friendship/request/status/set/cancel/${friend_req_id}`,
              method: 'GET',
            }
            const resp = await mailman(req)
            console.log(resp.data)
            const notification = {
              type: 'NOTIFICATION_UNCONNECT',
              to : uuid
            }
            const message = JSON.stringify(notification)
            SocketContext?.socket?.current?.send(message)
            setFriendRequest("")
            setIsfriend("CONNECT")
          }
          // we need to rest all thing to get back to what it should be
      }
      catch(e){
          console.log(e)
      }
  }

  const unfriend_request = async () =>
  {
    try{

        if (friend_req_id != -1)
        {
          const req = {
            url: "friendship/unfriend/"+uuid,
            method: "GET",
            withCredentials: true,
          }
          const resp = await mailman(req)
          console.log(resp.data)
          userContextConsumer?.fetchFriends()
          const notification = {
            type: 'NOTIFICATION_UNCONNECT',
            to : uuid
          }
          const message = JSON.stringify(notification)
          SocketContext?.socket?.current?.send(message)
          setFriendRequest("")
          setIsfriend("CONNECT")
        }
        // we need to rest all thing to get back to what it should be
    }
    catch(e){
        console.log(e)
    }
  }
 
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const unfriendRequest = () => {
    console.log("Unfriend action triggered");
  };


  
  return (
    <>
      {
        loading ? 
          <Loading__/>
        :
        isblock ? <div> {blocker ?
        <li
          className="text-white m-2 px-4 py-2 xl:h-10 xl:px-7 2xl:py-1 font-semibold rounded-xl border border-white/30 text-sm xl:text-md min-w-[120px] duration-200 transition-all active:bg-[#5E97A9] flex cursor-pointer gap-3 items-center justify-center focus:outline-none active:outline-none"
        onClick={BlockActionCheck}>
            <div className='text-xl'>
              <MdBlock/>
            </div>
            <p>{btn_block}</p>
            
        </li>
       : <div className='ext-white m-2 px-4 py-2 xl:h-10 xl:px-7 2xl:py-1 font-semibold rounded-xl border border-white/30 text-sm xl:text-md min-w-[120px] duration-200 transition-all hover:bg-[#5E97A9] flex gap-3 items-center justify-center'>
        <div><SlLock/></div> Locked</div> }
       </div> : 
          <motion.nav
            initial={false}
            animate={isOpen ? "open" : "closed"}
            className="flex flex-col justify-center items-center"
          >
              { isfriend === "UNFRIEND" &&
                <>
                  <div className="relative inline-block">
        <motion.button
          className="text-white m-2 px-4 py-2 xl:h-10 xl:px-7 2xl:py-1 font-semibold rounded-xl border border-white/30 text-sm xl:text-md min-w-[120px] duration-200 transition-all active:bg-[#5E97A9] hover:border-[#5E97A9] flex gap-3 items-center justify-center focus:outline-none active:outline-none"
          whileTap={{ scale: 0.97 }}
          onClick={toggleMenu}
        >
          <div className="text-lg xl:text-xl">
            <FiUser />
                </div>
                <p>Friend</p>
              </motion.button>

              {/* Dropdown Menu */}
              {isMenuOpen && (
                <motion.div
                  className="absolute rounded-lg    text-base right-[-160px]  top-[15%] bg-gradient-to-br from-[#283137] to-[#242729] border border-white/30  transition-all duration-0 animate-pluse-right shadow-lg z-50"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                >
                  <li
                    className='m-4 flex gap-8 hover:text-[#5E97A9] duration-200 transition-all cursor-pointer   '
                      // className="text-white m-2 px-4 py-2 xl:h-10 xl:px-7 2xl:py-1 font-semibold rounded-xl border border-white/30 text-sm xl:text-md min-w-[120px] duration-200 transition-all active:bg-[#5E97A9] hover:border-[#5E97A9] flex gap-3 items-center justify-center focus:outline-none active:outline-none"

                    onClick={unfriend_request}
                  >
                    <div className='text-lg xl:text-xl '>
                      <IoPersonRemoveOutline/>
                    </div>
                    <p >Unfriend</p>
                    
                  </li>
                  <li
                  className='m-4 flex gap-8 hover:text-[#5E97A9] duration-200 transition-all cursor-pointer '
                // className="m-2 px-4 py-2 xl:h-10 xl:px-7 2xl:py-1 font-semibold rounded-xl border border-white/30 text-sm xl:text-md min-w-[120px] hover:border-[#5E97A9] flex gap-3 items-center justify-center "
                onClick={BlockActionCheck}
              >
                    <div className='text-xl'>
                      <MdBlock/>
                    </div>
                    <p>{btn_block}</p>
                    
              </li>
                </motion.div>
              )}
            </div>
                  {/* <motion.button
                      className="text-white m-2 px-4 py-2 xl:h-10 xl:px-7 2xl:py-1 font-semibold rounded-xl border border-white/30 text-sm xl:text-md min-w-[120px] duration-200 transition-all active:bg-[#5E97A9] hover:border-[#5E97A9] flex gap-3 items-center justify-center focus:outline-none active:outline-none"
                      whileTap={{ scale: 0.97 }}
                    onClick={unfriend_request}
                  >
                    <div className='text-lg xl:text-xl '>
                      <IoPersonRemoveOutline/>
                    </div>
                    <p >UnFriend</p>
                    
                  </motion.button> */}
                  <Link to="/chat/" state={{channel_id : channelId}}>
                    <motion.button
                      className="text-white m-2 px-4 py-2 xl:h-10 xl:px-7 2xl:py-1 font-semibold rounded-xl border border-white/30 text-sm xl:text-md min-w-[120px] duration-200 transition-all active:bg-[#5E97A9] hover:border-[#5E97A9] flex gap-3 items-center justify-center focus:outline-none active:outline-none   "
                      whileTap={{ scale: 0.97 }}

                    >
    
                      <div className='text-xl '>
                        <TbMessage2/>
                      </div>
                      <p>Message</p>
                      
                    </motion.button>
                  </Link>
                </>
              }
              { isfriend === "CONNECT" && FriendRequest === "" &&
                <>
                  <motion.button
                    className="text-white m-2 px-4 py-2 xl:h-10 xl:px-7 2xl:py-1 font-semibold rounded-xl border border-white/30 text-sm xl:text-md min-w-[120px] duration-200 transition-all active:bg-[#5E97A9] hover:border-[#5E97A9] flex gap-3 items-center justify-center focus:outline-none active:outline-none  "
                    whileTap={{ scale: 0.97 }}
                    onClick={send_friend_request}
                  >
                    <div className='text-xl '>
                      <IoPersonAddOutline/>
                    </div>
                    <p>Connect</p>
                  </motion.button>
                </>
              }
              {status !== "UNFRIEND" && FriendRequest !== "" &&
                <>
                  <motion.button
                    className="text-white m-2 px-4 py-2 xl:h-10 xl:px-7 2xl:py-1 font-semibold rounded-xl border border-white/30 text-sm xl:text-md min-w-[120px] duration-200 transition-all active:bg-[#5E97A9] hover:border-[#5E97A9] flex gap-3 items-center justify-center focus:outline-none active:outline-none  "
                    whileTap={{ scale: 0.97 }}

                    onClick={()=>{(FriendRequest == "Accept" && accept_friend_request())}}
                  >
                    {FriendRequest}
                  </motion.button>
                  <motion.button
                    className="text-white m-2 px-4 py-2 xl:h-10 xl:px-7 2xl:py-1 font-semibold rounded-xl border border-white/30 text-sm xl:text-md min-w-[120px] duration-200 transition-all active:bg-[#5E97A9] hover:border-[#5E97A9] flex gap-3 items-center justify-center focus:outline-none active:outline-none  "
                    whileTap={{ scale: 0.97 }}

                    onClick={()=>{Cancel_friend_request()}}
                  >
                    Cancel
                  </motion.button>
                  {/* <li
                  className='m-4 flex gap-8 hover:text-[#5E97A9] duration-200 transition-all cursor-pointer '
                // className="m-2 px-4 py-2 xl:h-10 xl:px-7 2xl:py-1 font-semibold rounded-xl border border-white/30 text-sm xl:text-md min-w-[120px] hover:border-[#5E97A9] flex gap-3 items-center justify-center "
                onClick={BlockActionCheck}
              >
                    <div className='text-xl'>
                      <MdBlock/>
                    </div>
                    <p>{btn_block}</p>
                    
              </li> */}
                </>
              }
          </motion.nav>
        }
      </>
  );
}

export default ConnectButton;
