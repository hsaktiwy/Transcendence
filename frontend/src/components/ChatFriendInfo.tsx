import React, { useContext, useState , useEffect} from "react";
import {ChatSectionContext, ContextType, Conversation, Message} from "../utils/ChatContext"
import { Action, ActionType, RadarChartInterFace} from "@/utils/interfaces";
import { IoCloseSharp } from "react-icons/io5";
import { BsTrophy } from "react-icons/bs";
import { PiPingPongFill } from "react-icons/pi";
import { IoMdStats } from "react-icons/io";
import { IoPersonRemoveOutline } from "react-icons/io5";
import { MdOutlineBlock } from "react-icons/md";
import { VscGame } from "react-icons/vsc";
import { User } from "../utils/ChatContext";
import { UserContext } from '../components/UserContext';
import mailman from "@/utils/AxiosFetcher";
import { RadarChartFile } from "./RadarChartFile";
import { ScrollArea, Scrollbar } from "@radix-ui/react-scroll-area";
import { FiUser } from "react-icons/fi";
import { Link, useParams } from 'react-router-dom'
import Achievements from "./Achievements";




function ChatFriendInfo(){
    const backendPath:string = import.meta.env.VITE_BACKEND.substring(0, import.meta.env.VITE_BACKEND.length - 1)
    const chatContext = useContext(ChatSectionContext)
    const userContext = useContext(UserContext)
    const {username} = useParams();
    const [radarchartData, setRadarChartData] = useState<RadarChartInterFace | undefined>()
    const [Status, setStatus] = useState<string>("Block")
    if (!chatContext || !userContext)
     throw new Error('error')
    const user2_level:number = (Math.random() * 10)
    const fetchMatches = async () =>
        {
            try{
                const req = {
                    url: `/profile/get_win_lose/${chatContext.active?.user2.unique_id}/`,
                    method: 'GET',
                    withCredentials: true,
                }
                const resp = await mailman(req);
                setRadarChartData(resp.data);
            }
            catch (err){
                console.error("dddddd======????",err)
            }
        }
    const BlockStatusCheck = async ()=>
    {
        try{
            const req = {
                url:'friendship/is/BLOCKED/'+ chatContext.active?.user2.unique_id,
                method: 'GET',
                withCredentials:true,
            }
            const resp = await mailman(req)
            const  responce:boolean = resp.data['status']
            setStatus((responce) ? 'UnBlock' : 'Block')
            console.log(resp)
        }
        catch(err)
        {
            console.log("Block status ", err)
        }
    }

    const [achievementsData, setAchievementsData] = useState<Achievements[]>([]);
    const [loading, setLoading] = useState<boolean>(true); // Add a loading state
    const uuid = chatContext.active?.user2.unique_id

    // console.log('unique id  is  here -->>>>>>>>',  uuid);
    
    useEffect(()=>{
        BlockStatusCheck()
        fetchMatches()
        console.log('data fetched ',  radarchartData)
    },[userContext.action, chatContext.active,  /*radarchartData*/])

    return(
        <div className={`rounded-l-xl lg:rounded-l-none rounded-r-3xl border-r-0 lg:border-l-[1px] border-white/20 font-poppins  bg-[#2B2F32] lg:bg-transparent  absolute top-0   h-full  ${chatContext.showProfile ? 'right-0 w-full  lg:w-[279px] xl:w-[379px] 2xl:w-[479px]' : 'w-0 -right-32'} transition-all duration-[300ms]  text-white overflow-auto`}>
            {/* <div className="h-full w-full absolute -z-10 top-0 left-0 bg-black/50 "></div> */}
            <div className=" bg-black/35  w-full  overflow-auto relative   ">
                <div id="friend-info-header" className=" m-4 text-[24px]  text-white flex justify-between items-center">

                    <h1 className="text-xl font-semibold">Contact Info</h1>
                    <span className="block text-white cursor-pointer" onClick={() =>{
                        chatContext.setShowProfile(!chatContext.showProfile)
                    }}>
                        <IoCloseSharp/>
                    </span>
                </div>
                    {/* <div className="bg-white w-[100%] h-[1px] lg:mt-[28px] rounded-full"></div> */}
            </div>
            <div id="friend-info" className=" m-4 mt-8 relative  bg-gradient-to-br from-[#283137] to-[#242729]  rounded-lg flex flex-col justify-center "
                         style={{ backgroundImage: `url(${chatContext.active && backendPath + chatContext.active.user2.CoverProfile})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
                <div className="absolute inset-0 bg-black/50  rounded-lg pointer-events-none"></div>
                <div className=" p-4 profile-info-header z-10 flex flex-col justify-center items-center">
                    <img src={chatContext.active && backendPath + chatContext.active.user2.profile_pic} alt="" className="aspect-square rounded-full object-cover w-28 h-28"  />
                    <h1 className=" mt-4 font-semibold text-xl">{chatContext.active && chatContext.active.user2.firstName + " " + chatContext.active.user2.lastName}</h1>
                    <p className="text-gray-400">{chatContext.active &&  "@" + chatContext.active.user2.login}</p>
                    <div className=" w-full p-3 my-2 flex flex-col rounded-xl py-2 bg-black/30 rounded-xl shadow-ms justify-center items-center ">
                        <h2 className=""><span>{chatContext.active && user2_level.toFixed(2)} Level</span></h2>
                        <div className={` relative my-3 w-full h-2 bg-white/80 rounded-full after:content-[''] after:absolute after:top-0 after:left-0 after:bg-[#5E97A9] after:${chatContext.active && 
                            'w-[' + ((user2_level - (Math.floor(user2_level))) * 100).toFixed().toString() + '%]'} after:h-full after:rounded-full`}>
                        </div>
                    </div>
                    <div className="flex gap-8 mt-4 flex-wrap items-center justify-center ">
                        <Link to={`/profile/${chatContext.active?.user2.unique_id}`} className="cursor-pointer  hover:scale-110 duration-150 px-4  py-2 bg-black/30 rounded-xl  w-[115px] flex flex-col text-lg justify-center items-center gap-2 text-center" >
                            <span className="text-xl flex items-center gap-1">
                                <FiUser/>
                                <span className="text-white/70 text-sm">Profile</span>
                            </span>
                        </Link>
                        <div className="cursor-pointer  hover:scale-110 duration-150 px-4 py-2 bg-black/30 rounded-xl w-[115px] flex flex-col text-lg justify-center items-center gap-2 text-center">
                        <span className="text-xl flex items-center gap-1">
                                <VscGame/>
                                <p className="text-white/70 text-sm">Challenge</p>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="">
                <div className="px-3  h-52">

                    <Achievements  uuid={uuid}/>
                </div>
                {/* <div className="px-5">
                    <ScrollArea className="p-5 bg-gradient-to-br from-[#283137] to-[#242729] rounded-xl w-full overflow-x-auto gap-4 flex">
                    <div className="rounded-xl bg-gradient-to-br from-[#242b2f] to-[#1b1e1f] shadow-md p-3  h-32 w-32  xl:h-48 xl:w-48 ">
                <div className="h-3/5 ">
                    <div className="h-full bg-[#2B2F32] rounded-xl w-[65%] flex flex-col justify-center items-center">
                    <h1 className="text-3xl xxl:text-5xl font-medium text-[#5E97A9]">42</h1>
                    <h1 className="text-lg 2xltext-xl font-medium">Wins</h1>
                    </div>
                </div>
                <div className="h-2/5 flex justify-center items-center">
                    <div className="w-[65%] h-[100%] flex gap-3 flex-col justify-center items-center">
                    <div className="w-[80%] border-b-[2px] border rounded-full xxl:border-b-[3px]"></div>
                    <div className="w-[80%] border-b-[2px] border rounded-full xxl:border-b-[3px]"></div>
                    <div className="w-[80%] border-b-[2px] border rounded-full xxl:border-b-[3px]"></div>
                    </div>
                    <div className="w-[35%] h-[100%] flex justify-center items-center">
                    <img src="../images/emoji_trophy.svg" />
                    </div>
                </div>
                </div>
                <div className="  rounded-xl bg-gradient-to-br from-[#242b2f] to-[#1b1e1f] shadow-md p-3  h-32 w-32  xl:h-48 xl:w-48 ">
                <div className="h-3/5 ">
                    <div className="h-full bg-[#2B2F32] rounded-xl w-[65%] flex flex-col justify-center items-center">
                    <h1 className="text-3xl xxl:text-5xl font-medium text-[#5E97A9]">42</h1>
                    <h1 className="text-lg 2xltext-xl font-medium">Wins</h1>
                    </div>
                </div>
                <div className="h-2/5 flex justify-center items-center">
                    <div className="w-[65%] h-[100%] flex gap-3 flex-col justify-center items-center">
                    <div className="w-[80%] border-b-[2px] border rounded-full xxl:border-b-[3px]"></div>
                    <div className="w-[80%] border-b-[2px] border rounded-full xxl:border-b-[3px]"></div>
                    <div className="w-[80%] border-b-[2px] border rounded-full xxl:border-b-[3px]"></div>
                    </div>
                    <div className="w-[35%] h-[100%] flex justify-center items-center">
                    <img src="../images/emoji_trophy.svg" />
                    </div>
                </div>
                </div>
                    </ScrollArea>
                </div> */}

                <div className=" p-5 z-10 ">
                    <div className=" bg-gradient-to-br from-[#283137] to-[#242729] rounded-xl p-5">
                           <RadarChartFile radarchartData={radarchartData || { wins: 0, lose: 0, _wins: 0, _lose: 0 }} />
                    </div>
                </div>  
            </div>
        </div>
    )
}

export default ChatFriendInfo;