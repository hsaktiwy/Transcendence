


// const itemVariants: Variants = {
//      open: {
//     opacity: 1,
//     y: 0,
//     transition: { type: "spring", stiffness: 300, damping: 24 }
//   },
//   closed: {
//     opacity: 0,
//     y: 20,
//     transition: { duration: 0.2 }
//   }
// };

// function ConnectButton() {
//   const [isOpen, setIsOpen] = useState(false);

//   return (
//     <motion.nav initial={false} animate={isOpen ? "open" : "closed"}>
//       <motion.button
//         className="text-white m-3 px-9 py-2 xl:h-12 xl:px-14 2xl:py-1 font-semibold rounded-2xl bg-[#5E97A9]"
//         whileTap={{ scale: 0.97 }}
//         onClick={() => setIsOpen(!isOpen)}
//       >
//         Accept
//       </motion.button>

//       {isOpen && (
//         <motion.div
//           className="mt-2"
//           variants={itemVariants}
//           initial="closed"
//           animate="open"
//         >
//           <motion.button
//             className="bg-[#1D1E22] text-white px-9 py-2 xl:h-12 xl:px-10 2xl:py-1 font-semibold rounded-2xl"
//             whileTap={{ scale: 0.97 }}
//           >
//             Send Message
//           </motion.button>
//         </motion.div>
//       )}
//     </motion.nav>
//   );
// }
  

//   export default ConnectButton


import { useState, useEffect, useContext } from 'react';
import { motion, Variants } from 'framer-motion';
import { useParams } from "react-router-dom";
import { UserContext } from "./UserContext";
import mailman from '@/utils/AxiosFetcher';
import { WebSocketContext } from '@/utils/WSContext';
import { Loading__ } from "@/auth/Login";
import { IoPersonRemoveOutline } from "react-icons/io5";
import { TbMessage2 } from "react-icons/tb";
import { MdBlock } from "react-icons/md";
import { IoPersonAddOutline } from "react-icons/io5";





const itemVariants: Variants = {
     open: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 300, damping: 24 }
  },
  closed: {
    opacity: 0,
    y: 20,
    transition: { duration: 0.2 }
  }
};


function ConnectButton() {
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
  // const [isOpen, setIsOpen] = useState(false);

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
        console.log(resp)
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
                  <motion.button
                    className="text-white m-3 px-9 py-2 xl:h-12 xl:px-14 2xl:py-1 font-semibold rounded-2xl border border-white/30 w-[180px] hover:border-[#5E97A9] flex gap-3 items-center justify-center "
                    whileTap={{ scale: 0.97 }}
                    onClick={unfriend_request}
                  >
                    <div className='text-xl '>
                      <IoPersonRemoveOutline/>
                    </div>
                    <p>UnFriend</p>
                    
                  </motion.button>
                  <motion.button
                    className="text-white m-3 px-9 py-2 xl:h-12 xl:px-14 2xl:py-1 font-semibold rounded-2xl bg-[#5E97A9] w-[180px] flex gap-3 items-center justify-center"
                    whileTap={{ scale: 0.97 }}

                    onClick={handleAcceptClick}
                  >
                    <div className='text-xl '>
                      <TbMessage2/>
                    </div>
                    <p>Message</p>
                  </motion.button>
                </>
              }
              { isfriend === "CONNECT" && FriendRequest === "" &&
                <>
                  <motion.button
                    className="text-white m-3 px-9 py-2 xl:h-12 xl:px-14 2xl:py-1 font-semibold rounded-2xl bg-[#5E97A9] w-[180px] flex gap-3 items-center justify-center cursor-pointer"
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
                    className="text-white m-3 px-9 py-2 xl:h-12 xl:px-14 2xl:py-1 font-semibold rounded-2xl bg-[#5E97A9] w-[180px]"
                    whileTap={{ scale: 0.97 }}

                    onClick={()=>{(FriendRequest == "Accept" && accept_friend_request())}}
                  >
                    {FriendRequest}
                  </motion.button>
                  <motion.button
                    className="text-white m-3 px-9 py-2 xl:h-12 xl:px-14 2xl:py-1 font-semibold rounded-2xl bg-[#5E97A9] min-w-[120px]"
                    whileTap={{ scale: 0.97 }}

                    onClick={()=>{Cancel_friend_request()}}
                  >
                    Cancel
                  </motion.button>
                </>
              }
              <motion.button
                className="text-white m-3 px-9 py-2 xl:h-12 xl:px-14 2xl:py-1 font-semibold rounded-2xl bg-[#5E97A9] w-[180px] flex gap-3 items-center justify-center"
                onClick={BlockActionCheck}
              >
                    <div className='text-xl'>
                      <MdBlock/>
                    </div>
                    <p>{btn_block}</p>
                    
              </motion.button>

          </motion.nav>
        }
      </>
  );
}

export default ConnectButton;
