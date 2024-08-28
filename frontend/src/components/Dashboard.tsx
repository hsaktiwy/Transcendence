import React from "react";
import { BsTrophy } from "react-icons/bs";
import { MdOutlineStarBorder } from "react-icons/md";
import { PiPingPongFill } from "react-icons/pi";
import { LiaMedalSolid } from "react-icons/lia";
import { BsFire } from "react-icons/bs";
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import { useState } from "react";
import { Pie, Bar, Radar, Doughnut } from "react-chartjs-2";
Chart.register(CategoryScale);
const Data = [
    {
      id: 1,
      year: 2016,
      userGain: 80000,
      userLost: 823
    },
    {
      id: 2,
      year: 2017,
      userGain: 45677,
      userLost: 345
    },
    {
      id: 3,
      year: 2018,
      userGain: 78888,
      userLost: 555
    },
    {
      id: 4,
      year: 2019,
      userGain: 90000,
      userLost: 4555
    },
    {
      id: 5,
      year: 2020,
      userGain: 4300,
      userLost: 234
    }
  ];

function Dashboard(){
    const [chartData, setChartData] = useState({
        labels: Data.map((data) => data.year), 
        datasets: [
          {
            label: "Users Gained ",
            data: Data.map((data) => data.userGain),
            backgroundColor: [
              "rgba(75,192,192,1)",
              "#ecf0f1",
              "#50AF95",
              "#f3ba2f",
              "#2a71d0"
            ],
            borderColor: "black",
            borderWidth: 2
          }
        ]
      });
    return(
        <div className="font-poppins dashboard-container  w-[90%] lg:w-[calc(100%-160px)] my-[20px]  lg:mx-[40px] absolute top-[80px] left-[50%] -translate-x-[50%] lg:-translate-x-0 lg:left-[80px] grid  xl:grid-cols-4  gap-4 " >
            <div className="     bg-black/35 backdrop-filter backdrop-blur-sm rounded-lg p-8 flex  gap-4 flex-col xl:col-span-4 2xl:col-span-2 overflow-hidden">
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
                <div className="achievements-cards ml-8 flex gap-4 ">
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
            <div className=" rounded-lg    xl:col-span-2 2xl:col-span-1 bg-black/35 backdrop-filter backdrop-blur-sm text-center text-xl text-white flex flex-col items-start gap-4 justify-center p-4">
                <h1 className="text-2xl font-semibold">Activity Chart</h1>
                {/* <Bar options={{}} data={chartData}/> */}
            </div>
            <div className="   rounded-lg    xl:col-span-2 2xl:col-span-1  row-span-2 bg-black/35 backdrop-filter backdrop-blur-sm text-center text-xl text-white flex gap-4 xl:flex-col p-4 xl:min-h-[1167px]">
                <div className="bg-black/20   xl:h-[55%] rounded-lg">
                       online friends
                </div>
                <div className="  rounded-lg  bg-black/20 xl:h-[45%] flex flex-col items-start gap-4 justify-center p-4">
                    <h1 className="text-2xl font-semibold">Statistics</h1>
                    {/* <Radar options={{}} data={chartData}/> */}
                    
                </div>
            </div>
            <div className="  rounded-lg 2xl:col-span-2 bg-black/35 backdrop-filter backdrop-blur-sm text-center text-xl text-white  min-h-[650px] flex flex-col items-center gap-4 justify-center p-4">
                    <h1 className="text-2xl font-semibold">Statistics</h1>
                    {/* <Doughnut className="scale-90" options={{}} data={chartData}/> */}
            </div>
            <div className="  rounded-lg  bg-black/35 backdrop-filter backdrop-blur-sm text-center text-xl text-white   min-h-[650px]">
                leaderBoard
            </div>
        </div>
    )
}

export default Dashboard