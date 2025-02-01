import React from "react";
import { Link } from "react-router-dom"

import './style-component.css'
import SideBar  from'./website/components-Profile/side-bar.tsx'
import SearchInfoProfile from './website/components-Profile/serach-infos-profile.tsx'
import ProfileOverView from './website/components-Profile/ProfileOverView'
import StatsComponent from './website/components-Profile/statsComponents'
import Achievements from "@/components/Achievements.tsx";
import { ChartFile } from "@/components/Chartfile.tsx";
import { PieChartFile } from "@/components/PieChart.tsx";
import { LineCharFile } from "@/components/lineChart.tsx";
import RankFile from "./rankFile.tsx";
// import { import.meta.env.VITE_axiosPath ,BACKEND } from "../utils/Constants";
import { RadarChartFile } from "@/components/RadarChartFile.tsx";

import { UserDataInterface, ProfileDataInterface } from "../utils/UserDataInterface";
import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { UserContext } from "./UserContext";
import mailman from "../utils/AxiosFetcher";
import { NotificationPropreties } from "./UserContext";
import { WebSocketContext } from "../utils/WSContext";
import ConnectButton from "./connectButton.tsx";
import { MatchHistory } from "./MatchHistroy.tsx";
import { SkeletonTheme } from 'react-loading-skeleton'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import SkeletonProfile from "./Skeletons/SkeletonProfile.tsx";
import { SlLock } from "react-icons/sl";
import ProfileLocked from "./blocked/Profileblocked.tsx";
import { LoseWins, LinechartData, RadarChartInterFace, MatchHistoryDataInterface } from "@/utils/interfaces.ts";

const ProfileTest  = () =>{
    const SocketContext = useContext(WebSocketContext)
   
    if (!SocketContext)
        throw new Error('error')
    const [profileData, setProfileData] = useState<UserDataInterface | ProfileDataInterface | undefined>(undefined)
    const [channel_id, setChannelId] = useState<number | undefined>(undefined);
    const [isLoading, setIsLoading] = useState(true);
    const [isblock, setIsbLock] = useState<boolean>(false);
    const [matches, setMatches] = useState<LoseWins | undefined>()
    const [lineChartData, setLineChartData] = useState<LinechartData | undefined>()
    const [radarchartData, setRadarChartData] = useState<RadarChartInterFace | undefined>()
    // const [userMatchHistory, setUserMatchHistory] = useState<MatchHistoryDataInterface[]>([]);
    const [matchHistoryType, setMatchHistoryType] = useState<'PONG' | 'CHESS'>('PONG')
    

   const {uuid} = useParams();
   const userContextConsumer = useContext(UserContext)
   if (!userContextConsumer)
    throw new Error("userContext must be used within a UserProvider");
   const {setUserMatchHistory} = userContextConsumer;

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

    const fetchLineChart = async () =>  
    {
        try{
            const req = {
                url: `/profile/get_line_chart/${uuid}/`,
                method: 'GET',
                withCredentials: true,
            }
            const resp = await mailman(req);
            console.log('matches  is here  ma hree : \n', resp.data);
            const fetchedData: LinechartData = {
                user: resp.data.user,
                weekly_match_data: resp.data.weekly_match_data, // This should already be an array
            };
            setLineChartData(fetchedData);
            console.log('hiiii mhere', lineChartData);
            // setMatches(resp.data);
        }
        catch (err){
            console.error("dddddd======????",err)
    }}

    const fetchMatches = async () =>
    {
        try{
            const req = {
                url: `/profile/get_win_lose/${uuid}/`,
                method: 'GET',
                withCredentials: true,
            }
            const resp = await mailman(req);
            console.log('print win and lose mheree pleas : \n', resp.data);
            setMatches(resp.data);
            setRadarChartData(resp.data);
        }
        catch (err){
            console.error("dddddd======????",err)
        }
    }

    const getMatchHistoryData = async (type:string) =>{
        const req = {
            url: `/game/get_matches/${uuid}/${type}`,
            method: 'GET',
          };
          const resp = await mailman(req);
        if (resp.data.Game)
          setUserMatchHistory(resp.data.Game);
    }

   const fetchUserData = async () =>{
    try{
        const user = userContextConsumer.friends.filter(friend=>(friend.unique_id === uuid)); 
        console.log('waaaaaaaa    ',user, "waaaaa2 ",  uuid)
        if (user.length === 0)
        {
            setIsLoading(true);
            const req = {
                url: `/api/users/${uuid}/`,
                method: 'GET',
            }
            
            const resp = await mailman(req)
            const respData: ProfileDataInterface = resp.data
    
            setProfileData(respData)
            // setIsLoading(false);
            // await getChannelId()
        }
        else{
            setProfileData(user[0])
            // await getChannelId()
        }
    }
    catch (err){
        console.error("dddddd======????",err)
    }
  };

  const BlockStatusCheck = async ()=>
    {
        try{
          const req = {
            url:'friendship/is/BLOCKED_BOTH_SIDE/'+ uuid,
            method: 'GET',
            withCredentials:true,
          }
          const resp = await mailman(req)
          const  responce:boolean = resp.data['status']
          setIsbLock(responce)

        //   setBtn_block(responce ? 'UnBlock' : 'Block');
          console.log('hiii ->>>', resp);
        }
        catch(err)
        {
            console.log("Block status ", err)
        }
    }

    const switchMatchHistoryType = ()=>{
        if (matchHistoryType == 'PONG')
        {
            setMatchHistoryType('CHESS')
            getMatchHistoryData('CHESS')
        }
        else
        {
            setMatchHistoryType('PONG')
            getMatchHistoryData('PONG')
        }
    }

   useEffect(() =>{
    if (userContextConsumer?.userData?.unique_id !== uuid){
        fetchUserData().finally(() => {
            // Add a delay of 1.2 seconds before setting isLoading to false
            const timer = setTimeout(() => {
              setIsLoading(false);
            }, 600);
      
            // Cleanup timer
            return () => clearTimeout(timer);
          });
          BlockStatusCheck();
          fetchMatches();
          fetchLineChart();
    }
    else
    {
        setIsbLock(false)
        setProfileData(userContextConsumer?.userData)
        setIsLoading(false)
        fetchLineChart();
        fetchMatches();
    }
   },[uuid, userContextConsumer.blockList])
   useEffect(()=>{
    console.log('-----------------------------------------------------------------------------> reload profile')
   },[])

    return(
        <>
            {isLoading ? (
                <SkeletonProfile />
            ) :  isblock ? <ProfileLocked/> : (
                <div className=" lg:mb-0 pb-20  font-poppins 2xl:my-[20px] p-3 lg:ml-[70px]    dashboard-container  md:h-[1700px] xl:h-[1200px] 2xl:h-[1150px] text-white w-[90%] lg:w-[calc(100%-160px)] my-[20px] 2xl:p-10 2xl:pt-0 lg:mx-[50px] absolute top-[80px] left-[50%] -translate-x-[50%] lg:-translate-x-0 lg:left-[80px] grid md:grid-cols-12 md:grid-rows-12 xl:grid-cols-12 xl:grid-rows-12 2xl:grid-cols-12 2xl:grid-rows-12 gap-4">
                        <div className=" rounded-2xl  row-span-1 justify-center items-center   md:col-span-12 md:row-span-3  xl:row-span-5  2xl:col-span-12   xxl:row-span-6 xxl:col-span-9 grid grid-cols-12 ">
                        <div className="h-full   col-span-12 sm:col-span-3 bg-gradient-to-br from-[#2f3a41] to-[#2B2F32]  shadow-3xl shadow-[#22333869] rounded-xl 2xl:col-span-2 flex flex-col justify-center items-center">
                                    <div className=" pt-4 h-full  col-span-2  flex  flex-col  justify-center items-center rounded-2xl  ">           
                                        <img className="size-24   md:size-28 xl:size-38 aspect-square rounded-full object-cover  xxl:size-42 " src={`${import.meta.env.VITE_axiosPath}${profileData?.profile_pic}`} alt="user-image" />
                                                
                                                <div className=" flex  mt-5 flex-col justify-center ">
                                                    <h1 className=" sm:text-[80%] text-center font-bold  xxl:text-[120%]">{`${profileData?.firstName} ${profileData?.lastName}`} </h1>
                                                    <h1 className="sm:text-[80%] text-center font-normal text-gray-300">@{profileData?.login}</h1>
                                                </div>
                                                {userContextConsumer?.userData?.unique_id === uuid ? (
                                                    <Link to="/settings"> 
                                                        <button className="text-white m-2 px-4 py-2 xl:h-10 xl:px-7 2xl:py-1 font-semibold rounded-xl border border-white/30 text-sm xl:text-md min-w-[120px] duration-200 transition-all active:bg-[#5E97A9] hover:border-[#5E97A9] flex gap-3 items-center justify-center focus:outline-none active:outline-none">
                                                        Edit profile</button>
                                                    </Link> 
                                                    ) : (
                                                        <ConnectButton user={profileData}/> 
                                                    )}
                                    </div>
                        </div>
                        <div className=" h-full mt-4 sm:mt-0  col-span-12 sm:col-span-9 sm:pl-4 2xl:col-span-10">
                                <div className="flex relative items-cente justify-center w-full p-4  sm:h-full  xxl:p-10 bg-gradient-to-br from-[#283137] to-[#242729]  shadow-3xl shadow-[#22333869] rounded-2xl  ">
                                    <div className="w-full  h-full  grid grid-rows-2 ">
                                            <div className="relative bg-cover bg-center shadow-md   px-5 lg:px-10  rounded-3xl grid grid-rows-1 "
                                            style={{ backgroundImage: `url(${import.meta.env.VITE_axiosPath}${profileData?.CoverProfile})`,}}>
                                            <div className="absolute inset-0 bg-black opacity-10 rounded-3xl"></div>
                                                <div className=" h-20 hidden sm:flex items-center xxl:items-end ">
                                                    <div className="  h-8 min-w-36 xxl:h-10 xxl:min-w-36 border border-white/30 rounded-xl sm:flex justify-center items-center">
                                                        <div className=" text-xl text-white font-semibold xxl:text-lg ">{profileData?.login}</div>
                                                    </div>
                                                </div>
                                            <div className=" flex flex-col justify-center  items-center mb-7">
                                                <h1 className="text-2xl font-semibold xxl:text-3xl">7.5 Level</h1>
                                                <div className="h-3 w-[100%]  bg-[#444444] rounded-full">
                                                    <div className="h-3 w-[53%] bg-gradient-to-br from-[#373e37] to-[#5E97A9] rounded-full"></div>
                                                </div>
                                            </div>
                                        </div>
                                        <Achievements uuid={uuid}/>
                                    </div>    
                                   
                                </div>
                        </div>
                        </div>
                        <div className=" md:hidden xxl:block  xl:col-span-4 xl:row-span-4 2xl:col-span-3 xxl:row-span-6">
                            <div className=" relative rounded-2xl bg-gradient-to-tr from-[#2f3a41] to-[#2B2F32]  shadow-3xl shadow-[#22333869] h-full p-4 ">
                                <button onClick={switchMatchHistoryType}>{matchHistoryType}</button>
                                <MatchHistory    />
                            </div>
                        </div>
                        <div className=" relative p-4 rounded-2xl xxl:px-7 md:hidden xl:block  row-span-4 md:col-span-6 md:row-span-4 xl:col-span-4 xl:row-span-4 2xl:col-span-3  xxl:row-span-6 xl:p-3 xxl:p-10 flex justify-center items-center  bg-gradient-to-tr from-[#2f3a41] to-[#2B2F32] shadow-3xl shadow-[#22333869]">
                            <PieChartFile matches={matches}/>
                        </div>
                        <div className="row-span-4 relative md:col-span-12  md:row-span-3 rounded-2xl p-4 bg-gradient-to-tr from-[#2f3a41] to-[#2B2F32]  shadow-3xl shadow-[#22333869]  xl:col-span-8 xl:row-span-4 2xl:col-span-9 xxl:row-span-6 xxl:col-span-6">
                            <div className="w-full  h-full bg-gradient-to-br from-[#242b2f] to-[#1b1e1f]   flex flex-col justify-center items-center pb-7 pt-4 px-4 rounded-2xl">
                                <LineCharFile data={lineChartData} />
                            </div>
                            
                        </div>
                        <div className="row-span-4 relative md:col-span-6 md:row-span-3 xl:col-span-4 xl:h-96 2xl:col-span-4 xxl:h-[548px] xxl:col-span-3">
                            <RankFile/>
                          
                        </div>
                        <div className="row-span-2  md:col-span-6 md:row-span-3 xl:col-span-4 xl:row-span-4 2xl:col-span-4 2xl:row-span-5 xxl:hidden">
                            <div className="  rounded-lg bg-gradient-to-tr from-[#2f3a41] to-[#2B2F32]  shadow-3xl shadow-[#22333869] xl:h-96  h-full w-full  flex items-center   justify-center p-4">
                                  <RadarChartFile radarchartData={radarchartData || { wins: 0, lose: 0, _wins: 0, _lose: 0 }} />
                            </div>
                            
                        </div>
                        <div className=" row-span-2 hidden md:block md:col-span-6 md:row-span-3 xl:col-span-4 xl:row-span-4 2xl:col-span-4 2xl:row-span-5 xxl:hidden">
                            <div className="  rounded-2xl bg-gradient-to-tr  from-[#2f3a41] to-[#2B2F32]  shadow-3xl shadow-[#22333869]  xl:h-96 h-full p-4 ">
                                <MatchHistory />
                            </div>
                        </div>
                        <div className="hidden md:block row-span-4 md:col-span-6 md:row-span-3 xl:col-span-4 xl:row-span-4 2xl:col-span-3 2xl:row-span-5  bg-gradient-to-tr from-[#2f3a41] to-[#2B2F32] rounded-2xl p-4 xl:hidden">
                            <PieChartFile matches={matches}/>
                        </div>
                    </div>
            )}
        </>

    )
}
export default ProfileTest
