import React from "react";
import { BsTrophy } from "react-icons/bs";
import { MdOutlineStarBorder } from "react-icons/md";
import { PiPingPongFill } from "react-icons/pi";
import { LiaMedalSolid } from "react-icons/lia";
import { BsFire } from "react-icons/bs";



function Dashboard(){
    return(
        <div className="font-poppins dashboard-container  w-[calc(100%-160px)] my-[20px] mx-[40px] absolute top-[80px] left-[80px]    gap-4 flex flex-wrap" >
            <div className="  h-[500px] bg-black/35 backdrop-filter backdrop-blur-sm rounded-lg p-8 flex gap-4 flex-col">
                <div className="flex gap-4 w-full">
                    <div className="self-center">
                        <img src="./src/assets/profiles/1.jpg" alt="user-profil" className="w-[112px] h-[112px] rounded-full"/>
                    </div>
                    <div className="progress-container bg-black/45 rounded-lg text-white p-6 flex flex-col gap-4 flex-1">
                        <h1 className="text-3xl font-semibold">Hello Hamza</h1>
                        <div className="text-center text-xl">
                            <p className="font-semibold">
                                Level:
                                <span className="font-bold">7.53</span>
                            </p>
                        </div>
                        <div className="relative h-[12px] rounded-full bg-[#444444] after:content-[''] after:absolute after:top-0 after:left-0 after:w-[50%] after:h-full after:rounded-full after:bg-[#5E97A9]">
                        </div>
                    </div>
                </div>
                <div className="achievements-cards ml-8 flex gap-4">
                    <div className="bg-[#1D1E22] rounded-lg p-4 flex gap-2 flex-col justify-start ">
                        <div className="bg-[#2B2F32] p-4 rounded-lg text-center self-start">
                            <p className="text-[#5E97A9] text-4xl font-bold">40</p>
                            <p className="text-white text-3xl font-medium">Wins</p>
                        </div>
                        <div className="flex  text-white gap-4">
                            <div className="self-center flex flex-col gap-4">
                                <div className="h-[3px] w-[90px] bg-white "></div>
                                <div className="h-[3px] w-[90px] bg-white "></div>
                                <div className="h-[3px] w-[90px] bg-white "></div>
                            </div>
                            <div className="text-6xl self-center text-[#5E97A9]">
                                <BsTrophy/>
                            </div>
                        </div>
                    </div>
                    <div className="bg-[#1D1E22] rounded-lg p-4 flex gap-2 flex-col justify-start ">
                        <div className="bg-[#2B2F32] p-4 rounded-lg text-center self-start">
                            <p className="text-[#5E97A9] text-4xl font-bold">40</p>
                            <p className="text-white text-3xl font-medium">Wins</p>
                        </div>
                        <div className="flex  text-white gap-4">
                            <div className="self-center flex flex-col gap-4">
                                <div className="h-[3px] w-[90px] bg-white "></div>
                                <div className="h-[3px] w-[90px] bg-white "></div>
                                <div className="h-[3px] w-[90px] bg-white "></div>
                            </div>
                            <div className="text-6xl self-center text-[#5E97A9]">
                                <BsFire/>
                            </div>
                        </div>
                    </div>
                    <div className="bg-[#1D1E22] rounded-lg p-4 flex gap-2 flex-col justify-start ">
                        <div className="bg-[#2B2F32] p-4 rounded-lg text-center self-start">
                            <p className="text-[#5E97A9] text-4xl font-bold">40</p>
                            <p className="text-white text-3xl font-medium">Wins</p>
                        </div>
                        <div className="flex  text-white gap-4">
                            <div className="self-center flex flex-col gap-4">
                                <div className="h-[3px] w-[90px] bg-white "></div>
                                <div className="h-[3px] w-[90px] bg-white "></div>
                                <div className="h-[3px] w-[90px] bg-white "></div>
                            </div>
                            <div className="text-6xl self-center text-[#5E97A9]">
                                <LiaMedalSolid/>
                            </div>
                        </div>
                    </div>
                    <div className="bg-[#1D1E22] rounded-lg p-4 flex gap-2 flex-col justify-start ">
                        <div className="bg-[#2B2F32] p-4 rounded-lg text-center self-start">
                            <p className="text-[#5E97A9] text-4xl font-bold">40</p>
                            <p className="text-white text-3xl font-medium">Wins</p>
                        </div>
                        <div className="flex  text-white gap-4">
                            <div className="self-center flex flex-col gap-4">
                                <div className="h-[3px] w-[90px] bg-white "></div>
                                <div className="h-[3px] w-[90px] bg-white "></div>
                                <div className="h-[3px] w-[90px] bg-white "></div>
                            </div>
                            <div className="text-6xl self-center text-[#5E97A9]">
                                <PiPingPongFill/>
                            </div>
                        </div>
                    </div>
                    <div className="bg-[#1D1E22] rounded-lg p-4 flex gap-2 flex-col justify-start ">
                        <div className="bg-[#2B2F32] p-4 rounded-lg text-center self-start">
                            <p className="text-[#5E97A9] text-4xl font-bold">40</p>
                            <p className="text-white text-3xl font-medium">Wins</p>
                        </div>
                        <div className="flex  text-white gap-4">
                            <div className="self-center flex flex-col gap-4">
                                <div className="h-[3px] w-[90px] bg-white "></div>
                                <div className="h-[3px] w-[90px] bg-white "></div>
                                <div className="h-[3px] w-[90px] bg-white "></div>
                            </div>
                            <div className="text-6xl self-center text-[#5E97A9]">
                                <MdOutlineStarBorder/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className=" rounded-lg col-span-3  bg-blue-400 min-w-[700px]">
                usr-activty-chart
            </div>
            <div className="  min-w-[500px] rounded-lg col-span-3    bg-gray-400 overflow-hidden">
                <div className="bg-black/20   m-4">
                       
                </div>
            </div>
            <div className=" min-w-[30%] rounded-lg col-span-5 bg-yellow-400 ">
                win-chart
            </div>
            <div className=" min-w-[47%] rounded-lg col-span-4 bg-purple-500  ">
                leaderBoard
            </div>
            <div className=" min-w-[21%] rounded-lg col-span-3 bg-orange-300   ">
                statistics
            </div>
        </div>
    )
}

export default Dashboard