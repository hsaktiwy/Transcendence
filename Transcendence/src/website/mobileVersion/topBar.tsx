import React from "react";
import '../components-Profile/style-component.css'
import SideBar  from'../components-Profile/side-bar.tsx'
import SearchInfoProfile from '../components-Profile/serach-infos-profile.tsx'
import SearchNavBar from '../components-Profile/nav-bar-search.tsx'
import ProfileOverView from '../components-Profile/ProfileOverView'
import StatsComponent from '../components-Profile/statsComponents'
import MobileVersion from "./mobileVersion.tsx";

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
                        <div className="hidden h-full w-full  md:block ">
                            <SideBar/>
                        </div>
                    </aside>
            
                    <main className="flex-1   rounded-lg mb-5  md:ml-40">

                        <MobileVersion/>
                        <div className="hidden mx-20 md:block">
                            <SearchNavBar/>
                            <div className=" h-[85vh] grid grid-rows-25 ">
                                <div className=" row-span-10">
                                    <div className="grid-container grid  grid-cols-12 ">
                                        <div className="grid-item col-span-2 m-5 bg-[#2B2F32] min-w-[265px] flex  flex-col  justify-center items-center rounded-2xl h-[500px] ">
                                                <img className="size-[248px] " src="./images/Frame 28.svg" />
                                                <div className=" flex  mt-5 flex-col justify-center ">
                                                    <h1 className="font-bold text-[150%]">Hamza Chahboune</h1>
                                                    <h1 className="mx-auto font-normal text-gray-300">@hachahbo</h1>
                                                </div>
                                                <button className="m-7  px-14 py-3 font-semibold rounded-xl bg-[#5E97A9]">Connect</button>
                                        </div>
                                        <div className="grid-item col-span-7 p-5">
                                                <div className="h-full p-10 bg-[#2B2F32] rounded-2xl ">
                                                    <div className="h-full grid grid-rows-2">
                                                        <div className=" bg-[#1D1E22] px-10 h-48 rounded-3xl grid grid-rows-2">
                                                            <div className="h-20  flex items-end">
                                                                <div className="h-14 w-64 bg-[#5E97A9] rounded-2xl flex justify-center items-center">
                                                                    <div className=" font-semibold text-2xl "> Hamza's progress</div>
                                                                </div>
                                                            </div>
                                                            <div className=" flex flex-col justify-center items-center mb-7">
                                                                <h1 className="font-semibold text-3xl">53%</h1>
                                                                <div className="h-3 w-[100%] mt-3 bg-[#444444] rounded-full">
                                                                    <div className="h-3 w-[53%] bg-[#5E97A9] rounded-full"></div>
                                                                </div>
                                                            </div>
                                                    
                                                        </div>
                                                        <div className="gap-9 grid grid-cols-5 px-10 py-2">
                                                            <div className="cardv grid-cols-2">
                                                                <div className="h-3/5">
                                                                    <div className="h-full bg-[#2B2F32] rounded-xl w-[65%] flex flex-col justify-center items-center">
                                                                        <h1 className="text-5xl font-medium text-[#5E97A9] ">42</h1>
                                                                        <h1 className="text-xl font-medium">Wins</h1>
                                                                    </div>
                                                                </div>
                                                                <div className="h-2/5 flex justify-center items-center">
                                                                    <div className="w-[65%] h-[100%]  flex gap-3 flex-col justify-center items-center">
                                                                        <div className="w-[80%] border rounded-full border-b-[3px]"></div>
                                                                        <div className="w-[80%] border rounded-full border-b-[3px]"></div>
                                                                        <div className="w-[80%] border rounded-full border-b-[3px]"></div>
                                                                    </div>
                                                                    <div className="w-[35%] h-[100%] flex justify-center items-center ">
                                                                        <img src="./images/emoji_trophy.svg"/>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="cardv grid-cols-2">
                                                                <div className="h-3/5">
                                                                    <div className="h-full bg-[#2B2F32] rounded-xl w-[65%] flex flex-col justify-center items-center">
                                                                        <h1 className="text-5xl font-medium text-[#5E97A9] ">42</h1>
                                                                        <h1 className="text-xl font-medium">Wins</h1>
                                                                    </div>
                                                                </div>
                                                                <div className="h-2/5 flex justify-center items-center">
                                                                    <div className="w-[65%] h-[100%]  flex gap-3 flex-col justify-center items-center">
                                                                        <div className="w-[80%] border rounded-full border-b-[3px]"></div>
                                                                        <div className="w-[80%] border rounded-full border-b-[3px]"></div>
                                                                        <div className="w-[80%] border rounded-full border-b-[3px]"></div>
                                                                    </div>
                                                                    <div className="w-[35%] h-[100%] flex justify-center items-center ">
                                                                        <img className="mb-4 size-14" src="./images/flag.svg"/>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="cardv grid-cols-2">
                                                                <div className="h-3/5">
                                                                    <div className="h-full bg-[#2B2F32] rounded-xl w-[65%] flex flex-col justify-center items-center">
                                                                        <h1 className="text-5xl font-medium text-[#5E97A9] ">42</h1>
                                                                        <h1 className="text-xl font-medium">Wins</h1>
                                                                    </div>
                                                                </div>
                                                                <div className="h-2/5 flex justify-center items-center">
                                                                    <div className="w-[65%] h-[100%]  flex gap-3 flex-col justify-center items-center">
                                                                        <div className="w-[80%] border rounded-full border-b-[3px]"></div>
                                                                        <div className="w-[80%] border rounded-full border-b-[3px]"></div>
                                                                        <div className="w-[80%] border rounded-full border-b-[3px]"></div>
                                                                    </div>
                                                                    <div className="w-[35%] h-[100%] flex justify-center items-center ">
                                                                        <img src="./images/medaille.svg"/>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="cardv grid-cols-2">
                                                                <div className="h-3/5">
                                                                    <div className="h-full bg-[#2B2F32] rounded-xl w-[65%] flex flex-col justify-center items-center">
                                                                        <h1 className="text-5xl font-medium text-[#5E97A9] ">42</h1>
                                                                        <h1 className="text-xl font-medium">Wins</h1>
                                                                    </div>
                                                                </div>
                                                                <div className="h-2/5 flex justify-center items-center">
                                                                    <div className="w-[65%] h-[100%]  flex gap-3 flex-col justify-center items-center">
                                                                        <div className="w-[80%] border rounded-full border-b-[3px]"></div>
                                                                        <div className="w-[80%] border rounded-full border-b-[3px]"></div>
                                                                        <div className="w-[80%] border rounded-full border-b-[3px]"></div>
                                                                    </div>
                                                                    <div className="w-[35%] h-[100%] flex justify-center items-center ">
                                                                        <img src="./images/pong.svg"/>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="cardv grid-cols-2">
                                                                <div className="h-3/5">
                                                                    <div className="h-full bg-[#2B2F32] rounded-xl w-[65%] flex flex-col justify-center items-center">
                                                                        <h1 className="text-5xl font-medium text-[#5E97A9] ">42</h1>
                                                                        <h1 className="text-xl font-medium">Wins</h1>
                                                                    </div>
                                                                </div>
                                                                <div className="h-2/5 flex justify-center items-center">
                                                                    <div className="w-[65%] h-[100%]  flex gap-3 flex-col justify-center items-center">
                                                                        <div className="w-[80%] border rounded-full border-b-[3px]"></div>
                                                                        <div className="w-[80%] border rounded-full border-b-[3px]"></div>
                                                                        <div className="w-[80%] border rounded-full border-b-[3px]"></div>
                                                                    </div>
                                                                    <div className="w-[35%] h-[100%] flex justify-center items-center ">
                                                                        <img className="mb-2" src="./images/star.svg"/>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>    
                                                </div>
                                        </div>
                                        <div className=" grid-item col-span-3 py-5">
                                                <div className="h-full bg-[#2B2F32] p-5 rounded-2xl flex justify-center items-center ">
                                                    <img src="./images/blue-chart.svg" alt="" />
                                                </div>
                                        </div>
                                    </div>
                                    {/* ------------------------------------------------------------------------------------ */}
                                    <div className=" h-[43vh] grid   row-span-12">
                                        <div className="border"></div>                  
                                    </div>
                                </div>
                            </div>
                        </div>
                    </main>
            </div>
        </>
    )
}
export default TopBar 