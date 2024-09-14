import React from "react";
import '../components-Profile/style-component.css'
import SideBar  from'../components-Profile/side-bar.tsx'
import SearchInfoProfile from '../components-Profile/serach-infos-profile.tsx'

import ProfileOverView from '../components-Profile/ProfileOverView'
import StatsComponent from '../components-Profile/statsComponents'
import MobileVersion from "./mobileVersion.tsx";
import DesktopVersion from "./desktopVersion.tsx";
import SearchNavBar from '../components-Profile/nav-bar-search.tsx'
import TabletVersion from "./tabletVersion.tsx";
import SideBarTablet from "./side_bar_tablet.tsx";
import LaptopVersion from "./laptopVersion.tsx";
import Achievements from "@/components/Achievements.tsx";
import { ChartFile } from "@/components/Chartfile.tsx";
import { PieChartFile } from "@/components/PieChart.tsx";
import { LineCharFile } from "@/components/lineChart.tsx";
import RankFile from "@/components/rankfile.tsx";
import { RadarChartFile } from "@/components/RadarChartFile.tsx";

function TopBar()
{
    return(
        <>
            <div className="lg:mb-0  font-poppins 2xl:my-[20px] p-3 lg:ml-[70px]  h-[1200px] dashboard-container  md:h-[1700px] xl:h-[1200px] 2xl:h-[1150px] text-white w-[90%] lg:w-[calc(100%-160px)] my-[20px] 2xl:p-10 lg:mx-[50px] absolute top-[80px] left-[50%] -translate-x-[50%] lg:-translate-x-0 lg:left-[80px] grid md:grid-cols-12 md:grid-rows-12 xl:grid-cols-12 xl:grid-rows-12 2xl:grid-cols-12 2xl:grid-rows-12 gap-4">
                <div className=" rounded-2xl row-span-1 justify-center items-center   md:col-span-12  md:row-span-3  xl:row-span-4 2xl:col-span-9  2xl:row-span-6 xxl:col-span-9 grid grid-cols-12 ">
                   <div className="h-full col-span-3 bg-gradient-to-br from-[#2f3a41] to-[#2B2F32]  shadow-3xl shadow-[#22333869] rounded-xl xxl:col-span-2 flex flex-col justify-center items-center">
                            <div className=" h-full col-span-2  flex  flex-col  justify-center items-center rounded-2xl ">
                                <img className="md:size-36 xl:size-44 2xl:size-48" src="../images/profile-gray (1).svg" />
                                        <div className=" flex  mt-5 flex-col justify-center ">
                                            <h1 className="md:text-[100%] text-center font-bold 2xl:text-[120%]">Hamza Chahboune</h1>
                                            <h1 className="md:text-[80%] text-center font-normal text-gray-300">@hachahbo</h1>
                                        </div>
                                        <button className=" m-3 px-9 py-2 xl:h-12 xl:px-14 2xl:py-1 font-semibold rounded-2xl bg-[#5E97A9]">Connect</button>
                            </div>
                   </div>
                   <div className=" h-full col-span-9 pl-4 xxl:col-span-10">
                   <div className=" rounded-lg  flex   gap-2 w-full h-full">
                        <div className=" text-white  w-full ">
                            <div className="flex items-center justify-center w-full p-4 h-full  2xl:p-10 bg-gradient-to-br from-[#2f3a41] to-[#2B2F32]  shadow-3xl shadow-[#22333869] rounded-2xl  ">
                                                         <div className="w-full h-full  grid grid-rows-2 ">
                                                             <div className=" bg-[#1D1E22] px-5 lg:px-10  rounded-3xl grid grid-rows-2 ">
                                                                <div className=" h-20  flex items-center 2xl:items-end ">
                                                                        <div className="h-10 w-40 2xl:h-14 2xl:w-48 bg-[#5E97A9] rounded-2xl flex justify-center items-center">
                                                                            <div className="text-xl font-semibold 2xl:text-2xl ">Hello  Hamza</div>
                                                                        </div>
                                                                    </div>
                                                                    <div className=" flex flex-col justify-center  items-center mb-7">
                                                                        <h1 className="text-2xl font-semibold 2xl:text-3xl">7.5 Level</h1>
                                                                        <div className="h-3 w-[100%] mt-3 bg-[#444444] rounded-full">
                                                                            <div className="h-3 w-[53%] bg-[#5E97A9] rounded-full"></div>
                                                                        </div>
                                                                    </div>
                                                                 </div>
                                                                        <Achievements/>
                                                         </div>    
                                                     </div>
                                         </div>
                </div>
                   </div>
                </div>
                <div className=" md:hidden 2xl:block  xl:col-span-4 xl:row-span-4 2xl:col-span-3 2xl:row-span-6">
                    <div className="  rounded-2xl bg-gradient-to-tr from-[#2f3a41] to-[#2B2F32]  shadow-3xl shadow-[#22333869] h-full p-4 ">
                    <div className="text-2xl h-full  rounded-2xl bg-[#1D1E22]  font-semibold flex flex-col justify-center items-center p-7">
                            <h1 className=" font-medium"> User Activities</h1>
                            <div className=" p-5 w-[105%] flex justify-center items-center ">
                                <ChartFile/>
                            </div>
                    </div>
                    </div>
                </div>
                <div className=" p-4 rounded-2xl 2xl:px-7 md:hidden xl:block  row-span-4 md:col-span-6 md:row-span-4 xl:col-span-4 xl:row-span-4 2xl:col-span-3 2xl:hidden xxl:block 2xl:row-span-6 xl:p-3 2xl:p-10 flex justify-center items-center bg-gradient-to-tr from-[#2f3a41] to-[#2B2F32]  shadow-3xl shadow-[#22333869]">
                    <PieChartFile/>
                </div>
                <div className="row-span-4 md:col-span-12  md:row-span-3 rounded-2xl p-4 bg-gradient-to-tr from-[#2f3a41] to-[#2B2F32]  shadow-3xl shadow-[#22333869]  xl:col-span-8 xl:row-span-4 2xl:col-span-8 2xl:row-span-6 xxl:col-span-6">
                    <div className="w-full h-full bg-[#1D1E22] flex flex-col justify-center items-center pb-7 pt-4 px-4 rounded-2xl">
                       <LineCharFile />
                    </div>
                </div>
                <div className="row-span-4 md:col-span-6 md:row-span-3 xl:col-span-4 xl:row-span-4 2xl:col-span-4 2xl:row-span-6 xxl:col-span-3">
                    <RankFile/>
                </div>
                <div className="row-span-2 md:col-span-6 md:row-span-3 xl:col-span-4 xl:row-span-4 2xl:col-span-3 2xl:row-span-5 2xl:hidden">
                    <div className="  rounded-lg bg-gradient-to-tr from-[#2f3a41] to-[#2B2F32]  shadow-3xl shadow-[#22333869]  h-full w-full  flex items-center   justify-center p-4">
                        <RadarChartFile/>
                    </div>
                </div>
                <div className=" row-span-2 md:col-span-6 md:row-span-3 xl:col-span-4 xl:row-span-4 2xl:col-span-3 2xl:row-span-5 2xl:hidden">
                <div className="  rounded-2xl bg-gradient-to-tr from-[#2f3a41] to-[#2B2F32]  shadow-3xl shadow-[#22333869]  h-full p-4 ">
                    <div className="text-2xl h-full  rounded-2xl bg-[#1D1E22]  font-semibold flex flex-col justify-center items-center p-5">
                            <h1 className=" font-medium"> User Activities</h1>
                            <div className=" p-5 w-[105%] flex justify-center items-center ">
                                <ChartFile/>
                            </div>
                    </div>
                    </div>
                </div>
                <div className="hidden md:block row-span-4 md:col-span-6 md:row-span-3 xl:col-span-4 xl:row-span-4 2xl:col-span-3 2xl:row-span-5 bg-[#2B2F32] rounded-2xl p-4 xl:hidden">
                                <PieChartFile/>
                </div>
            </div>
        </>
    )
}
export default TopBar 