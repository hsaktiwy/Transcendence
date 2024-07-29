import React from "react";
import '../components-Profile/style-component.css'
import SideBar  from'../components-Profile/side-bar.tsx'
import SearchInfoProfile from '../components-Profile/serach-infos-profile.tsx'

import ProfileOverView from '../components-Profile/ProfileOverView'
import StatsComponent from '../components-Profile/statsComponents'
import MobileVersion from "./mobileVersion.tsx";
import DesktopVersion from "./desktopVersion.tsx";
import SearchNavBar from '../components-Profile/nav-bar-search.tsx'

function TopBar()
{
    return(
        <>
            {/* <div className="m-4  grid  gap-2 md:grid-cols-12 lg:grid-cols-13 xl:grid-cols-11">
                <div className="min-h-[69px] rounded-lg bg-[#2B2F32]  md:col-span-2 lg:col-span-1 xl:col-span-2  xl:max-w-36">
                    <div className="m-3">
                        <svg className="fill-current  text-white size-10"  xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                        </svg>

                    </div>


                </div>
                <div className="min-h-[100vh] rounded-lg bg-[#2B2F32]  md:col-span-10 lg:col-span-11 xl:col-span-10 ">

                </div>
            </div> */}
            <div className=" m-4 gap-2 flex flex-col md:flex-row h-screen">
                    <aside className="    text-white  w-full md:w-36  md:fixed md:m-4  md:top-0 md:left-0 md:bottom-0">
                        <div  className=" flex items-center  h-16 rounded-lg bg-[#2B2F32]  justify-between  md:hidden">
                            <div className="px-3">
                                    <svg className="fill-current  text-white size-10"  xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                                    </svg>
                            </div>
                            <div className='nav-bar-div  m-4 '>
                            <div className='nav-bar  bg-[#1D1E22]'>
                                <img className="size-image" src="/images/Notification.svg" />
                                <img className="size-image" src="/images/Message.svg" />
                                <img style={{width: '30px'}} className="size-image" src="/images/Group 13.svg" />
                            </div>
                        </div>      
                        </div>
                        <div className="hidden lg:hidden h-full w-full  md:block ">
                            <div className="w-36  min-w-[150px]">
                                <div className="  side-bar-div  lineRight">
                                    <div className="side-bar-div-grid mt-3  flex items-center justify-center">
                                        <img className="w-20" src="/images/Logo (1).svg" />
                                    </div>
                                    <div className="side-bar-div-grid center-sid-bar">
                                        <div className="div-side-bar-icon">
                                            <img className="w-8  " src="/images/Home.svg" />
                                        </div>
                                        <div className="div-side-bar-icon">
                                            <img className="w-8  " src="/images/Message.svg" />
                                        </div>
                                        <div className="div-side-bar-icon">
                                            <img className="w-8  " src="/images/pong_.svg" />
                                        </div>
                                    </div>
                                    <div className="side-bar-div-grid log-out">
                                        <img src="/images/log-out-new.svg" />
                                    </div>
                                </div>

                            </div>
                        </div>
                        <div className="hidden h-full w-full  lg:block ">
                            <SideBar/>
                        </div>
                    </aside>
            
                    <main className="flex-1  rounded-lg mb-5  md:ml-32">

                        <MobileVersion/>
                        <div className="hidden lg:hidden 2xl:mx-20 md:block">
                                <div className='SearchNavBar mb-12 mb-0 lineDown'>
                                    <div className='search-bar-div'>
                                        <input className='px-5 bg-[#2B2F32] w-96 h-10 font-medium rounded-full flex items-center' type='text' placeholder='Search'/>
                                    </div>

                                    <div className='nav-bar-div '>
                                        <div className='nav-bar'>
                                            <img className="w-8" src="/images/Notification.svg" />
                                            <img className="w-8" src="/images/Message.svg" />
                                            <img style={{width: '35px'}} className="size-image" src="/images/Frame 30.png" />
                                            <img style={{width: '25px'}} src="/images/Downarrow.svg" />
                                        </div>
                                    </div>
                                </div>
                                    <div className=" gap-3 h-[340px] grid grid-cols-12 p-4">
                                        <div className=" h-full col-span-4 bg-[#2B2F32] rounded-2xl flex flex-col justify-center items-center">
                                            <img className="w-36" src="/images/profile-gray (1).svg" />
                                            <div className=" flex  mt-2 flex-col justify-center ">
                                                    <h1 className="font-bold text-[80%]">Hamza Chahboune</h1>
                                                    <h1 className="mx-auto font-normal text-[60%] mb-4 text-gray-300">@hachahbo</h1>
                                                </div>
                                                <button className="px-10 py-2 font-semibold text-[80%] rounded-xl bg-[#5E97A9]">Connect</button>
                                        </div>
                                        <div className="h-full col-span-8 p-5 bg-[#2B2F32] rounded-2xl flex flex-col justify-center items-center">
                                            <div className=" h-full w-full">
                                                <div className="  rounded-2xl bg-[#1D1E22] p-1 h-1/2">
                                                        <div className=" h-full rounded-2xl  flex flex-col">
                                                                <div className="h-15 p-4 flex flex-col items-start">
                                                                    <div className="h-9 w-36 bg-[#5E97A9] rounded-md flex justify-center items-center">
                                                                        <div className=" font-semibold text-sm "> Hamza's progress</div>
                                                                    </div>
                                                                </div>
                                                                <div className=" flex flex-col justify-center items-center mb-7">
                                                                    <h1 className="font-semibold text-md">53%</h1>
                                                                    <div className="h-3 w-[90%] mt-1 bg-[#444444] rounded-full">
                                                                        <div className="h-3 w-[53%] bg-[#5E97A9] rounded-full"></div>
                                                                    </div>
                                                                </div>
                                                        </div>
                                                </div>
                                                <div className="h-1/2 grid grid-cols-3 gap-2 py-2 px-4">
                                                            <div className="cardv grid-cols-2">
                                                                    <div className="h-3/5">
                                                                        <div className="h-full bg-[#2B2F32] rounded-xl w-[65%] flex flex-col justify-center items-center">
                                                                            <h1 className="text-2xl font-medium text-[#5E97A9] ">42</h1>
                                                                            <h1 className="text-sm font-medium">Wins</h1>
                                                                        </div>
                                                                    </div>
                                                                    <div className="h-2/5 flex justify-center items-center">
                                                                        <div className="w-[65%] h-[100%]  flex gap-2 flex-col justify-center items-center">
                                                                            <div className="w-[80%] border rounded-full border-b-[2px]"></div>
                                                                            <div className="w-[80%] border rounded-full border-b-[2px]"></div>
                                                                            <div className="w-[80%] border rounded-full border-b-[2px]"></div>
                                                                        </div>
                                                                        <div className="w-[35%] h-[100%] flex justify-center items-center ">
                                                                            <img src="./images/emoji_trophy.svg"/>
                                                                        </div>
                                                                    </div>
                                                            </div>
                                                            <div className="cardv grid-cols-2">
                                                                    <div className="h-3/5">
                                                                        <div className="h-full bg-[#2B2F32] rounded-xl w-[65%] flex flex-col justify-center items-center">
                                                                            <h1 className="text-2xl font-medium text-[#5E97A9] ">42</h1>
                                                                            <h1 className="text-sm font-medium">Wins</h1>
                                                                        </div>
                                                                    </div>
                                                                    <div className="h-2/5 flex justify-center items-center">
                                                                        <div className="w-[65%] h-[100%]  flex gap-2 flex-col justify-center items-center">
                                                                            <div className="w-[80%] border rounded-full border-b-[2px]"></div>
                                                                            <div className="w-[80%] border rounded-full border-b-[2px]"></div>
                                                                            <div className="w-[80%] border rounded-full border-b-[2px]"></div>
                                                                        </div>
                                                                        <div className="w-[35%] h-[100%] flex justify-center items-center ">
                                                                            <img src="./images/emoji_trophy.svg"/>
                                                                        </div>
                                                                    </div>
                                                            </div>
                                                            <div className="cardv grid-cols-2">
                                                                    <div className="h-3/5">
                                                                        <div className="h-full bg-[#2B2F32] rounded-xl w-[65%] flex flex-col justify-center items-center">
                                                                            <h1 className="text-2xl font-medium text-[#5E97A9] ">42</h1>
                                                                            <h1 className="text-sm font-medium">Wins</h1>
                                                                        </div>
                                                                    </div>
                                                                    <div className="h-2/5 flex justify-center items-center">
                                                                        <div className="w-[65%] h-[100%]  flex gap-2 flex-col justify-center items-center">
                                                                            <div className="w-[80%] border rounded-full border-b-[2px]"></div>
                                                                            <div className="w-[80%] border rounded-full border-b-[2px]"></div>
                                                                            <div className="w-[80%] border rounded-full border-b-[2px]"></div>
                                                                        </div>
                                                                        <div className="w-[35%] h-[100%] flex justify-center items-center ">
                                                                            <img src="./images/emoji_trophy.svg"/>
                                                                        </div>
                                                                    </div>
                                                            </div>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                    <div className=" gap-3 h-[290px] px-4 flex justify-center items-center">
                                        <div className="bg-[#2B2F32] h-full w-full rounded-2xl flex justify-center items-center">
                                            <img className="w-[95%] max-w-[640px] " src="./images/Group 21.svg" alt="" />
                                        </div>
                                    </div>
                                    <div className="p-5  gap-3 grid grid-cols-12">
                                        <div className="bg-[#2B2F32]  p-3 rounded-2xl col-span-7">
                                            <div className="p-3 h-[100%] flex items-center flex-col justify-center bg-[#1D1E22] rounded-2xl">
                                                <div className="w-full">
                                                            <h1 className="font-semibold  mb-2 text-base">Rank</h1>
                                                            <div className="border-rank  w-full  bg-[#5E97A9] h-[1px] rounded-full "></div>
                                                </div>
                                                            <div className=" w-full m-1">
                                                                <div className="h-16 gap-3  px-5 flex justify-between items-center">
                                                                    <h1 className="  text-base font-medium">#1</h1>
                                                                    <div className="min-w-32 w-[300px] h-full  flex items-center">
                                                                        <img className="w-11" src="./images/profile-gray.svg" alt="" />
                                                                        <div className="mx-3">
                                                                                <h1 className="font-semibold text-xs">Hamza Chahboune</h1>
                                                                                <h1 className="font-medium text-[10px]">@hachahbo</h1>
                                                                        </div>
                                                                    </div>
                                                                    <img src="./images/plus.svg" alt="" />
                                                                </div>
                                                                <div className="border-rank my-1 w-full  bg-[#5E97A9] h-[1px] rounded-full "></div>
                                                            </div>
                                                            <div className=" w-full m-1">
                                                                <div className="h-16 gap-3  px-5 flex justify-between items-center">
                                                                    <h1 className="  text-base font-medium">#2</h1>
                                                                    <div className="min-w-32 w-[300px] h-full  flex items-center">
                                                                        <img className="w-11" src="./images/profile-gray.svg" alt="" />
                                                                        <div className="mx-3">
                                                                                <h1 className="font-semibold text-xs">Hamza Chahboune</h1>
                                                                                <h1 className="font-medium text-[10px]">@hachahbo</h1>
                                                                        </div>
                                                                    </div>
                                                                    <img src="./images/plus.svg" alt="" />
                                                                </div>
                                                                <div className="border-rank my-1 w-full  bg-[#5E97A9] h-[1px] rounded-full "></div>
                                                            </div>
                                                            <div className=" w-full m-1">
                                                                <div className="h-16 gap-3  px-5 flex justify-between items-center">
                                                                    <h1 className="  text-base font-medium">#3</h1>
                                                                    <div className="min-w-32 w-[300px] h-full  flex items-center">
                                                                        <img className="w-11" src="./images/profile-gray.svg" alt="" />
                                                                        <div className="mx-3">
                                                                                <h1 className="font-semibold text-xs">Hamza Chahboune</h1>
                                                                                <h1 className="font-medium text-[10px]">@hachahbo</h1>
                                                                        </div>
                                                                    </div>
                                                                    <img src="./images/plus.svg" alt="" />
                                                                </div>
                                                                <div className="border-rank my-1 w-full  bg-[#5E97A9] h-[1px] rounded-full "></div>
                                                            </div>

                                            </div>

                                        </div>
                                        <div className="bg-[#2B2F32] flex justify-center items-center p-3 rounded-2xl col-span-5">

                                            <img className="w-[100%]"  src="./images/chart-circle.svg" alt="" />
                                        </div>

                                    </div>
                                    <div className="p-5 pt-0 gap-3  grid grid-cols-12 ">
                                        <div className="bg-[#2B2F32] p-2 rounded-2xl col-span-6 flex justify-center items-center">
                                            <img className="w-[100%]"  src="./images/graf.svg" alt="" />

                                        </div>
                                        <div className="bg-[#2B2F32] p-3 flex items-center justify-center rounded-2xl col-span-6">
                                            <img className="w-[100%]" src="./images/chart-tablet.svg" alt="" />
                                        </div>

                                    </div>
                        </div>
                        <DesktopVersion/>
                        
                    </main>
            </div>
        </>
    )
}
export default TopBar 