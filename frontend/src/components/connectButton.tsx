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

interface buttonInterface{
  channel_id?: number 
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

  const {username} = useParams();
  const userContextConsumer = useContext(UserContext)

  const SocketContext = useContext(WebSocketContext)
    if (!SocketContext)
        throw new Error('error')
  const handleAcceptClick = () => {
    setIsOpen(true);
    setStatus("accepted");
  };
  
  const BlockActionCheck = async ()=>
  {
      try{
        const req = {
          url: "friendship/"+ (isblock ? "unblock":"block")+ "/"+username,
          method: "GET",
          withCredentials: true,
        }
        const resp = await mailman(req)
        console.log('hana ->>>>>', resp)
        setBtn_block(isblock ? 'Block' : 'Unblock');
        setIsbLock(!isblock)
      }
      catch(err)
      {
          console.log("Block status ", err)
      }
  }

  const BlockStatusCheck = async ()=>
  {
      try{
        const req = {
          url:'friendship/is/BLOCKED/'+ username,
          method: 'GET',
          withCredentials:true,
        }
        const resp = await mailman(req)
        const  responce:boolean = resp.data['status']
        setIsbLock(responce)
        setBtn_block(responce ? 'UnBlock' : 'Block');
        // console.log(resp)
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
          url:'friendship/is/FRIEND/'+ username,
          method: 'GET',
          withCredentials:true,
        }
        const resp = await mailman(req)
        const  responce:boolean = resp.data['status']
        setIsfriend(responce ? 'UNFRIEND' : 'CONNECT' );
        console.log(resp)
        // if  (responce)
        // {
        const req2 = {
          url:'friendship/status/'+ username,
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
  } , [username]);
  // FIRST FETCH DATA ABOUT THE USER
  // CASE 1: NO FRIEND REQUEST STATUS : SEND,BLOCK
  // CASE 2: ...: PENDING
  // CASE 3: FRIEND : UNFRIEND + SENDMESSAGE,BLOCK
  // 

  const send_friend_request = ()=>{
    const notification = {
      type: 'NOTIFICATION_ADD_FRIEND',
      to : username
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
              to : username
          }
          const message = JSON.stringify(notification)
          SocketContext?.socket?.current?.send(message)
            setFriendRequest("")
            setIsfriend("UNFRIEND")
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
            url: "friendship/unfriend/"+username,
            method: "GET",
            withCredentials: true,
          }
          const resp = await mailman(req)
          console.log(resp.data)
          userContextConsumer?.fetchFriends()
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
                  <Link to="/chat/" state={{channel_id : prop.channel_id}}>
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
                </>
              }
          </motion.nav>
        }
      </>
  );
}

export default ConnectButton;
