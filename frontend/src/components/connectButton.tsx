// React
// import React from "react";
// import { useState } from "react";
// import { motion, Variants } from "framer-motion";



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
  const [isblock, setIsbLock] = useState("");
  const [isfriend, setIsfriend] = useState("");
  const [FriendRequest, setFriendRequest] = useState("")
  const [friend_req_id, setFriendRequestId] = useState<number>(-1)

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
          setIsbLock(responce ? 'UnBlock' : 'Block');
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
            console.log(resp.data)
            setFriendRequest("")
            setIsfriend("UNFRIEND")
          }
          // we need to rest all thing to get back to what it should be
      }
      catch(e){
          console.log(e)
      }
  }

  return (
    <motion.nav
      initial={false}
      animate={isOpen ? "open" : "closed"}
      className=""
    >
        {/* handle normal cases */}
        {/* <motion.button
          className="text-white m-3 px-9 py-2 xl:h-12 xl:px-14 2xl:py-1 font-semibold rounded-2xl bg-[#5E97A9]"
          whileTap={{ scale: 0.97 }}

          onClick={handleAcceptClick}
        >
          {status === "None" ? "Send" : (status === "Pending" ? "Pending": "Unfriend")} */}
        {/* </motion.button> */}
        {/* handle normal cases */}
        { isfriend === "UNFRIEND" &&
          <>
            <motion.button
              className="text-white m-3 px-9 py-2 xl:h-12 xl:px-14 2xl:py-1 font-semibold rounded-2xl bg-[#5E97A9]"
              whileTap={{ scale: 0.97 }}

              onClick={handleAcceptClick}
            >
              UnFriend
            </motion.button>
            <motion.button
              className="text-white m-3 px-9 py-2 xl:h-12 xl:px-14 2xl:py-1 font-semibold rounded-2xl bg-[#5E97A9]"
              whileTap={{ scale: 0.97 }}

              onClick={handleAcceptClick}
            >
              Message
            </motion.button>
          </>
        }
        { isfriend === "CONNECT" && FriendRequest === "" &&
          <>
            <motion.button
              className="text-white m-3 px-9 py-2 xl:h-12 xl:px-14 2xl:py-1 font-semibold rounded-2xl bg-[#5E97A9]"
              whileTap={{ scale: 0.97 }}

              onClick={send_friend_request}
            >
              Connect
            </motion.button>
          </>
        }
        {status !== "UNFRIEND" && FriendRequest !== "" &&
          <>
            <motion.button
              className="text-white m-3 px-9 py-2 xl:h-12 xl:px-14 2xl:py-1 font-semibold rounded-2xl bg-[#5E97A9]"
              whileTap={{ scale: 0.97 }}

              onClick={()=>{(FriendRequest == "Accept" && accept_friend_request())}}
            >
              {FriendRequest}
            </motion.button>
          </>
        }
        {/* <motion.div
          className=""
          variants={{
            open: {
              clipPath: "inset(0% 0% 0% 0% round 10px)",
              transition: {
                type: "spring",
                bounce: 0,
                duration: 0.7,
                delayChildren: 0.3,
                staggerChildren: 0.05
                  }
                },          closed: { clipPath: "inset(10% 50% 90% 50% round 10px)", transition: { duration: 0.3 } }
          }}
          style={{ pointerEvents: isOpen ? "auto" : "none" }}
        > */}
        <motion.button
          className="text-white m-3 px-9 py-2 xl:h-12 xl:px-14 2xl:py-1 font-semibold rounded-2xl bg-[#5E97A9]"
          whileTap={{ scale: 0.97 }}

          onClick={handleAcceptClick}
        >
          {isblock === "Block" ? "Block" : "Unblock"}
        </motion.button>
        {/* </motion.div> */}
    </motion.nav>
  );
}

export default ConnectButton;
