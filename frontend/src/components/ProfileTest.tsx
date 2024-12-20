import React from "react";

import './style-component.css'
import SideBar  from'./website/components-Profile/side-bar.tsx'
import SearchInfoProfile from './website/components-Profile/serach-infos-profile.tsx'
import ProfileOverView from './website/components-Profile/ProfileOverView'
import StatsComponent from './website/components-Profile/statsComponents'
import Achievements from "@/components/Achievements.tsx";
import { ChartFile } from "@/components/Chartfile.tsx";
import { PieChartFile } from "@/components/PieChart.tsx";
import { LineCharFile } from "@/components/lineChart.tsx";
import RankFile from "@/components/rankfile.tsx";
import { axiosPath ,BACKEND } from "../utils/Constants";

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

const ProfileTest  = () =>{
    const SocketContext = useContext(WebSocketContext)
    if (!SocketContext)
        throw new Error('error')
   const [profileData, setProfileData] = useState<UserDataInterface | ProfileDataInterface | undefined>(undefined)
   const {username} = useParams();
   const userContextConsumer = useContext(UserContext)
   if (!userContextConsumer)
    throw new Error("userContext must be used within a UserProvider");

   const fetchUserData = async () =>{
    try{
        const req = {
            url: `/api/users/${username}/`,
            method: 'GET',
        }
        const resp = await mailman(req)
        const {
            login,
            email,
            firstName,
            lastName,
            state,
            last_visit,
            profile_pic,
        } = resp.data
        console.log("sss ====???? ",resp.data)

        setProfileData({
            login,
            email,
            firstName,
            lastName,
            state,
            last_visit,
            profile_pic,
        })
        
    }
    catch (err){
        console.error("dddddd======????",err)
    }

}
   useEffect(() =>{
    if (userContextConsumer?.userData?.login !== username){
        fetchUserData()
    }
    else{
        setProfileData(userContextConsumer?.userData)
    }
   },[username])

    return(

    <>
        <div className="lg:mb-0 pb-20 font-poppins 2xl:my-[20px] p-3 lg:ml-[70px]   dashboard-container  md:h-[1700px] xl:h-[1200px] 2xl:h-[1150px] text-white w-[90%] lg:w-[calc(100%-160px)] my-[20px] 2xl:p-10 2xl:pt-0 lg:mx-[50px] absolute top-[80px] left-[50%] -translate-x-[50%] lg:-translate-x-0 lg:left-[80px] grid md:grid-cols-12 md:grid-rows-12 xl:grid-cols-12 xl:grid-rows-12 2xl:grid-cols-12 2xl:grid-rows-12 gap-4">
                <div className=" rounded-2xl  row-span-1 justify-center items-center   md:col-span-12 md:row-span-3  xl:row-span-4 2xl:col-span-12   xxl:row-span-6 xxl:col-span-9 grid grid-cols-12 ">
                   <div className="h-full   col-span-12 sm:col-span-3 bg-gradient-to-br from-[#2f3a41] to-[#2B2F32]  shadow-3xl shadow-[#22333869] rounded-xl 2xl:col-span-2 flex flex-col justify-center items-center">
                            <div className=" pt-4 h-full  col-span-2  flex  flex-col  justify-center items-center rounded-2xl ">
                                <img className="size-28  sm:size-28 md:size-32 xl:size-38  xxl:size-42 rounded-full" src={`${axiosPath}${profileData?.profile_pic}`} alt="user-image" />
                                        <div className=" flex  mt-5 flex-col justify-center ">
                                            <h1 className=" sm:text-[100%] text-center font-bold  xxl:text-[120%]">{profileData?.firstName} {profileData?.lastName}</h1>
                                            <h1 className="sm:text-[80%] text-center font-normal text-gray-300">@{profileData?.login}</h1>
                                        </div>
                                            {userContextConsumer?.userData?.login != username && <ConnectButton/>}
                            </div>
                   </div>
                   <div className=" h-full mt-4 sm:mt-0  col-span-12 sm:col-span-9 sm:pl-4 2xl:col-span-10">
                        <div className="flex  items-center justify-center w-full p-4  sm:h-full  xxl:p-10 bg-gradient-to-br from-[#283137] to-[#242729]  shadow-3xl shadow-[#22333869] rounded-2xl  ">
                            <div className="w-full  h-full  grid grid-rows-2 ">
                                <div className=" bg-[url('6205261.jpg')] bg-cover bg-center shadow-md   px-5 lg:px-10  rounded-3xl grid grid-rows-1 ">
                                    <div className=" h-20 hidden sm:flex items-center xxl:items-end ">
                                        <div className="   h-10 min-w-40 xxl:h-14 xxl:min-w-48 border border-white rounded-2xl sm:flex justify-center items-center">
                                            <div className=" text-xl text-white font-semibold xxl:text-xl ">{`${profileData?.login}`}</div>
                                        </div>
                                    </div>
                                    <div className=" flex flex-col justify-center  items-center mb-7">
                                        <h1 className="text-2xl font-semibold xxl:text-3xl">7.5 Level</h1>
                                        <div className="h-3 w-[100%]  bg-[#444444] rounded-full">
                                            <div className="h-3 w-[53%] bg-[#5E97A9] rounded-full"></div>
                                        </div>
                                    </div>
                                </div>
                                <Achievements/>
                            </div>    
                        </div>
                   </div>
                </div>
                <div className=" md:hidden xxl:block  xl:col-span-4 xl:row-span-4 2xl:col-span-3 xxl:row-span-6">
                    <div className="  rounded-2xl bg-gradient-to-tr from-[#2f3a41] to-[#2B2F32]  shadow-3xl shadow-[#22333869] h-full p-4 ">
                        <MatchHistory/>
                    </div>
                </div>
                 <div className=" p-4 rounded-2xl xxl:px-7 md:hidden xl:block  row-span-4 md:col-span-6 md:row-span-4 xl:col-span-4 xl:row-span-4 2xl:col-span-3  xl:border-white  2xl:border-orange-600 xxl:border-lime-950 xxl:row-span-6 xl:p-3 xxl:p-10 flex justify-center items-center bg-gradient-to-tr from-[#2f3a41] to-[#2B2F32]  shadow-3xl shadow-[#22333869]">
                    <PieChartFile/>
                </div>
                <div className="row-span-4 md:col-span-12  md:row-span-3 rounded-2xl p-4 bg-gradient-to-tr from-[#2f3a41] to-[#2B2F32]  shadow-3xl shadow-[#22333869]  xl:col-span-8 xl:row-span-4 2xl:col-span-9 xxl:row-span-6 xxl:col-span-6">
                    <div className="w-full h-full bg-[#1D1E22] flex flex-col justify-center items-center pb-7 pt-4 px-4 rounded-2xl">
                       <LineCharFile />
                    </div>
                </div>
                <div className="row-span-4 md:col-span-6 md:row-span-3 xl:col-span-4 xl:row-span-4 2xl:col-span-4 2xl:row-span-6 xxl:col-span-3">
                    <RankFile/>
                </div>
                <div className="row-span-2 md:col-span-6 md:row-span-3 xl:col-span-4 xl:row-span-4 2xl:col-span-4 2xl:row-span-5 xxl:hidden">
                    <div className="  rounded-lg bg-gradient-to-tr from-[#2f3a41] to-[#2B2F32]  shadow-3xl shadow-[#22333869] 2xl:h-96  h-full w-full  flex items-center   justify-center p-4">
                        <RadarChartFile/>
                    </div>
                </div>
                <div className=" row-span-2 hidden md:block md:col-span-6 md:row-span-3 xl:col-span-4 xl:row-span-4 2xl:col-span-4 2xl:row-span-5 xxl:hidden">
                <div className="  rounded-2xl bg-gradient-to-tr  from-[#2f3a41] to-[#2B2F32]  shadow-3xl shadow-[#22333869]  2xl:h-96 h-full p-4 ">
                                <MatchHistory/>
                    </div>
                </div>
                <div className="hidden md:block row-span-4 md:col-span-6 md:row-span-3 xl:col-span-4 xl:row-span-4 2xl:col-span-3 2xl:row-span-5 bg-[#2B2F32] rounded-2xl p-4 xl:hidden">
                                <PieChartFile/>
                </div>
            </div>
            {/* add mew component*/}




        </>
    )
}
export default ProfileTest
2