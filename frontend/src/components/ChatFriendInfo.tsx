import { useContext, useState , useEffect} from "react";
import {ChatSectionContext} from "../utils/ChatContext"
import { RadarChartInterFace, UserRankResponse} from "@/utils/interfaces";
import { IoCloseSharp } from "react-icons/io5";

import { VscGame } from "react-icons/vsc";

import { UserContext } from '../components/UserContext';
import mailman from "@/utils/AxiosFetcher";
import { RadarChartFile } from "./RadarChartFile";

import { FiUser } from "react-icons/fi";
import { Link } from 'react-router-dom'
import Achievements from "./Achievements";


import ChatInfoBlocked  from "./blocked/ChatInfoBlocked"

//@ts-ignore
import { useRemoteGameContext } from '../game/game-container/game/MatchContext.jsx';
import { customSubString } from "@/utils/textFromatting.ts";

    ////---------------------------
    function ChatFriendInfo(){
        const { setReomteGameData } = useRemoteGameContext();
        
        const handleChallengeClick = () => {
            setReomteGameData({
                form_game_invite: true,
                inviter_login: inviter?.login,
                invited_login: invited?.login,
                inviter_image: inviter?.profile_pic,
                invited_image: invited?.profile_pic,
                inviter_id   : inviter?.unique_id,
                invited_id   : invited?.unique_id,
            });
        };
    ////---------------------------

    const backendPath:string = import.meta.env.VITE_BACKEND.substring(0, import.meta.env.VITE_BACKEND.length - 1)
    const chatContext = useContext(ChatSectionContext)
    const userContext = useContext(UserContext)

    const inviter = chatContext?.active?.user1;
    const invited = chatContext?.active?.user2;
    
    const [isblock, setIsbLock] = useState<boolean>(false);
    const [radarchartData, setRadarChartData] = useState<RadarChartInterFace | undefined>()
    const [_Status, setStatus] = useState<string>("Block")
    if (!chatContext || !userContext)
     throw new Error('error')


    const [level, setLevel] = useState<UserRankResponse | undefined>();
    
    const fetchLevle = async () =>
        {
            try{
                const req = {
                    url: `/profile/get_rank_user/${uuid}/`,
                    method: 'GET',
                    withCredentials: true,
                }
                const resp = await mailman(req);
                if(resp.data)
                    setLevel(resp.data);
            }
            catch (err){
                console.error("dddddd======????",err)
            }
        }
        

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
                url:'friendship/is/BLOCKED/'+ chatContext.active?.user2.unique_id+'/',
                method: 'GET',
                withCredentials:true,
            }
            const resp = await mailman(req)
            const  responce:boolean = resp.data['status']
            setIsbLock(responce);
            setStatus((responce) ? 'UnBlock' : 'Block')
        }
        catch(err)
        {
            console.error("Block status ", err)
        }
    }
        
    const uuid = chatContext.active?.user2.unique_id
    
    useEffect(()=>{
        BlockStatusCheck()
        fetchMatches()
        fetchLevle()
    },[userContext.action])

    return(
        <>          
        <div className={`rounded-l-xl lg:rounded-l-none rounded-r-3xl border-r-0 lg:border-l-[1px] border-white/20 font-poppins  bg-[#2B2F32] lg:bg-transparent  absolute top-0   h-full  ${chatContext.showProfile ? 'right-0 w-full  lg:w-[279px] xl:w-[379px] 2xl:w-[479px]' : 'w-0 -right-32 none'} transition-all duration-[300ms]  text-white overflow-auto`} tabIndex={chatContext.showProfile ? 0 : -1}
  aria-hidden={!chatContext.showProfile}>
            <div className=" bg-black/35  w-full  overflow-auto relative   ">
                <div id="friend-info-header" className=" m-4 text-[24px]  text-white flex justify-between items-center">

                    <h1 className="text-xl font-semibold">Contact Info</h1>
                    <span className="block text-white cursor-pointer" onClick={() =>{
                        chatContext.setShowProfile(!chatContext.showProfile)
                    }}>
                        <IoCloseSharp/>
                    </span>
                </div>
            </div>
            {
                isblock ? <ChatInfoBlocked/> : 
                <>
                    <div id="friend-info" className="relative m-4 mt-8 bg-gradient-to-br from-[#283137] to-[#242729] rounded-lg flex flex-col justify-center"
                        style={{
                            backgroundImage: chatContext.active ? `url(${backendPath + chatContext.active.user2.CoverProfile})` : '',
                            backgroundSize: 'cover',
                            backgroundPosition: 'center'
                        }}>
                        
                        {/* Background Overlay */}
                        <div className="absolute inset-0 bg-black/50 rounded-lg pointer-events-none"></div>

                        <div className="p-4 profile-info-header z-10 flex flex-col justify-center items-center">
                            <img src={chatContext.active ? backendPath + chatContext.active.user2.profile_pic : ''} 
                                alt="" 
                                className="aspect-square rounded-full object-cover w-28 h-28" />

                            <h1 className="mt-4 font-semibold text-xl">
                                {chatContext.active ? `${customSubString(chatContext.active.user2.firstName + ' ' +chatContext.active.user2.lastName)}` : ''}
                            </h1>

                            <div className="w-full p-3 my-2 flex flex-col rounded-xl py-2 bg-black/30 shadow-ms justify-center items-center">
                                <p className="text-gray-400">
                                    {chatContext.active ? `@${chatContext.active.user2.login}` : ''}
                                </p>
                                <h2>
                                    <span>{chatContext.active ? `${level?.level.toFixed(2)} Level` : ''}</span>
                                </h2>
                                <div className="relative my-3 w-full h-2 bg-white/80 rounded-full">
                                    <div className="absolute top-0 left-0 bg-[#5E97A9] h-full rounded-full" 
                                        style={{ width: chatContext.active ? `${((level?.level ?? 0 - Math.floor(level?.level ?? 0)) * 100).toFixed()}%` : '0%' }}>
                                    </div>
                                </div>
                            </div>
                            <div className="flex gap-8 mt-4 flex-wrap items-center justify-center">
                                <Link to={`/profile/${chatContext.active?.user2.unique_id}`} 
                                    className="cursor-pointer hover:scale-110 duration-150 px-4 py-2 bg-black/30 rounded-xl w-[115px] flex flex-col text-lg justify-center items-center gap-2 text-center">
                                    <span className="text-xl flex items-center gap-1">
                                        <FiUser />
                                        <span className="text-white/70 text-sm">Profile</span>
                                    </span>
                                </Link>
                                <div className={`cursor-pointer hover:scale-110 duration-150 px-4 py-2 bg-black/30 rounded-xl w-[115px] ${userContext.friends.filter(friend=>friend.unique_id === chatContext.active?.user2.unique_id).length === 0 ? 'hidden' : 'flex'}  flex-col text-lg justify-center items-center gap-2 text-center`}>
                                    
                                    {/*SETTTING THE USER CONTEXT TO INVITE*/}

                                    <Link to={`/game/PreInvite`} onClick={handleChallengeClick}>
                                        <span className="text-xl flex items-center gap-1">
                                            <VscGame />
                                            <p className="text-white/70 text-sm">Challenge</p>
                                        </span>
                                    </Link>
                                </div>
                            </div>
                        </div>                
                    </div>

                    <div className="">
                    <div className="mx-3 bg-gradient-to-br from-[#283137]  py-2 to-[#242729] rounded-xl overflow-x-auto whitespace-nowrap flex justify-start items-center px-4">
                        <div className="flex  h-44 2xl:h-60 gap-4">
                            <Achievements uuid={uuid} />
                        </div>
                    </div>


                        <div className=" p-5 z-10 ">
                            <div className=" bg-gradient-to-br from-[#283137] to-[#242729] rounded-xl p-5">
                                <RadarChartFile radarchartData={radarchartData || { wins: 0, lose: 0, _wins: 0, _lose: 0 }} />
                            </div>
                        </div>  
                    </div>
                </>
            }
        </div>

        </>
    )
}

export default ChatFriendInfo;