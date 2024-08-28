import React from "react";
import '../components-Profile/style-component.css'
import SideBar  from'../components-Profile/side-bar.tsx'
import SearchInfoProfile from '../components-Profile/serach-infos-profile.tsx'
import SearchNavBar from '../components-Profile/nav-bar-search.tsx'
function DesktopVersion()
{
    return(
        <>
            <div className="hidden ml-9 2xl:mx-20 2xl:block">
                            {/* <SearchNavBar/> */}
                            <div className="h-[88vh] grid grid-rows-25 ">
                                    <div className="grid-container  grid  grid-cols-12 ">
                                        <div className="grid-item col-span-2 m-5 bg-[#2B2F32] min-w-[265px] flex  flex-col  justify-center items-center rounded-2xl h-[500px] ">
                                                <img className="size-[200px] " src="./images/profile-gray (1).svg" />
                                                <div className=" flex  mt-5 flex-col justify-center ">
                                                    <h1 className="font-bold text-[150%]">Hamza Chahboune</h1>
                                                    <h1 className="mx-auto font-normal text-gray-300">@hachahbo</h1>
                                                </div>
                                                <button className="m-7  px-14 py-3 font-semibold rounded-xl bg-[#5E97A9]">Connect</button>
                                        </div>
                                        <div className="grid-item col-span-7 p-5 ">

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

                                    <div className="row-span-11">
                                        <div className="grid h-[46vh] grid-container1 gap-4 grid-cols-12  ">
                                            <div className=" grid-item1 col-span-3 pl-5 ">
                                                
                                                    <div className="h-full bg-[#2B2F32] p-8 rounded-2xl  ">
                                                        <div className="h-full rounded-2xl w-full bg-[#1D1E22] flex flex-col justify-center items-center">
                                                            <div>
                                                                    <h1 className="font-medium mb-[15px] text-xl">Total Wins/Loses</h1>
                                                            </div>
                                                            <div className=" mb-5">
                                                                    <img  src="./images/Group 19.svg"></img>
                                                                    <div className="h-[100px] bg-[#2B2F32] p-6 mt-4 gap-3 rounded-2xl flex flex-col justify-center items-center">
                                                                            <div className="h-1/2 w-full  flex justify-center items-center ">
                                                                                <div className="w-32  rounded-2xl h-6  bg-[#5E97A9] flex justify-between items-center px-4 font-medium text-sm ">Wins</div>
                                                                                <h1 className="ml-14 font-normal">54%</h1>
                                                                            </div>
                                                                            <div className="h-1/2 w-full  flex justify-between items-center ">
                                                                                <div className="w-28  rounded-2xl h-6  bg-[#444444] flex items-center  px-4 font-medium text-sm ">Loses</div>
                                                                                <h1 className="ml-14 font-normal">46%</h1>
                                                                            </div>
                                                                    </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                            </div>
                                            <div className="  grid-item1 col-span-6 ">
                                                    <div className="h-full bg-[#2B2F32] p-5  rounded-2xl flex justify-center items-center ">
                                                        <img src="./images/chart-big-one(1).svg" alt="" />
                                                    </div>
                                            </div>
                                        <div className="grid-item1 col-span-3 ">
                                                <div className="h-full bg-[#2B2F32] p-5 rounded-2xl flex justify-center items-center ">
                                                <div className="h-full rounded-2xl p-7 w-full bg-[#1D1E22] flex flex-col justify-center items-center">
                                                        <div className="w-full">
                                                                <h1 className="font-semibold  mb-2 text-2xl">Rank</h1>
                                                                <div className="border-rank  w-full  bg-[#5E97A9] h-[1px] rounded-full "></div>
                                                        </div>
                                                        <div className=" w-full m-1">
                                                            <div className="h-16 gap-3  px-5 flex justify-between items-center">
                                                                <h1 className="  text-xl font-medium">#1</h1>
                                                                <div className="min-w-32 w-[300px] h-full  flex items-center">
                                                                    <img className="w-11" src="./images/profile-gray.svg" alt="" />
                                                                    <div className="mx-3">
                                                                            <h1 className="font-semibold">Hamza Chahboune</h1>
                                                                            <h1 className="font-medium text-xs">@hachahbo</h1>
                                                                    </div>
                                                                </div>
                                                                <img src="./images/plus.svg" alt="" />
                                                            </div>
                                                            <div className="border-rank my-1 w-full  bg-[#5E97A9] h-[1px] rounded-full "></div>
                                                        </div>
                                                        <div className=" w-full m-1">
                                                            <div className="h-16 gap-3  px-5 flex justify-between items-center">
                                                                <h1 className="  text-xl font-medium">#1</h1>
                                                                <div className="min-w-32 w-[300px] h-full  flex items-center">
                                                                    <img className="w-11" src="./images/profile-gray.svg" alt="" />
                                                                    <div className="mx-3">
                                                                            <h1 className="font-semibold">Hamza Chahboune</h1>
                                                                            <h1 className="font-medium text-xs">@hachahbo</h1>
                                                                    </div>
                                                                </div>
                                                                <img src="./images/plus.svg" alt="" />
                                                            </div>
                                                            <div className="border-rank my-1 w-full  bg-[#5E97A9] h-[1px] rounded-full "></div>
                                                        </div>
                                                        <div className=" w-full m-1">
                                                            <div className="h-16 gap-3  px-5 flex justify-between items-center">
                                                                <h1 className="  text-xl font-medium">#1</h1>
                                                                <div className="min-w-32 w-[300px] h-full  flex items-center">
                                                                    <img className="w-11" src="./images/profile-gray.svg" alt="" />
                                                                    <div className="mx-3">
                                                                            <h1 className="font-semibold">Hamza Chahboune</h1>
                                                                            <h1 className="font-medium text-xs">@hachahbo</h1>
                                                                    </div>
                                                                </div>
                                                                <img src="./images/plus.svg" alt="" />
                                                            </div>
                                                            <div className="border-rank my-1 w-full  bg-[#5E97A9] h-[1px] rounded-full "></div>
                                                        </div>
                                                        <div className=" w-full m-1">
                                                            <div className="h-16 gap-3  px-5 flex justify-between items-center">
                                                                <h1 className="  text-xl font-medium">#1</h1>
                                                                <div className="min-w-32 w-[300px] h-full  flex items-center">
                                                                    <img className="w-11" src="./images/profile-gray.svg" alt="" />
                                                                    <div className="mx-3">
                                                                            <h1 className="font-semibold">Hamza Chahboune</h1>
                                                                            <h1 className="font-medium text-xs">@hachahbo</h1>
                                                                    </div>
                                                                </div>
                                                                <img src="./images/plus.svg" alt="" />
                                                            </div>
                                                            <div className="border-rank my-1 w-full  bg-[#5E97A9] h-[1px] rounded-full "></div>
                                                        </div>
                                                        <div className=" w-full m-1">
                                                            <div className="h-16 gap-3  px-5 flex justify-between items-center">
                                                                <h1 className="  text-xl font-medium">#1</h1>
                                                                <div className="min-w-32 w-[300px] h-full  flex items-center">
                                                                    <img className="w-11" src="./images/profile-gray.svg" alt="" />
                                                                    <div className="mx-3">
                                                                            <h1 className="font-semibold">Hamza Chahboune</h1>
                                                                            <h1 className="font-medium text-xs">@hachahbo</h1>
                                                                    </div>
                                                                </div>
                                                                <img src="./images/plus.svg" alt="" />
                                                            </div>
                                                            <div className="border-rank my-1 w-full  bg-[#5E97A9] h-[1px] rounded-full "></div>
                                                        </div>
                                                    </div>
                                                </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
        </>
    )
}
export default DesktopVersion