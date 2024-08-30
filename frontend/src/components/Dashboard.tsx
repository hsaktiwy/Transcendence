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
        <div className="border font-poppins dashboard-container  w-[90%] lg:w-[calc(100%-160px)] my-[20px] p-10  lg:mx-[50px] absolute top-[80px] left-[50%] -translate-x-[50%] lg:-translate-x-0 lg:left-[80px] grid  xl:grid-cols-5  gap-4 " >
            <div className="backdrop-filter backdrop-blur-sm rounded-lg p-4 flex lg:col-span-5  gap-2 flex-col xl:col-span-5 2xl:col-span-3 overflow-hidden">
                <div className=" text-white  w-full ">
                        <div className="h-full w-[10] p-10 bg-[#2B2F32] rounded-2xl ">
                                                        <div className="h-full grid grid-rows-2">
                                                            <div className=" bg-[#1D1E22] px-10 h-48 rounded-3xl grid grid-rows-2">
                                                                <div className="h-20  flex items-end">
                                                                    <div className="h-14 w-48 bg-[#5E97A9] rounded-2xl flex justify-center items-center">
                                                                        <div className=" font-semibold text-2xl ">Hello  Hamza</div>
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
                                                                            <img src="../images/emoji_trophy.svg"/>
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
                                                                            <img className="mb-4 size-14" src="../images/flag.svg"/>
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
                                                                            <img src="../images/medaille.svg"/>
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
                                                                            <img src="../images/pong.svg"/>
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
                                                                            <img className="mb-2" src="../images/star.svg"/>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>    
                                                    </div>
                                        </div>
            </div>
            <div className=" rounded-lg    xl:col-span-2 2xl:col-span-1  backdrop-blur-sm text-center text-xl text-white flex flex-col items-start gap-4 justify-center py-4">
                <h1 className="text-2xl h-full  font-semibold">
                <div className=" grid-item col-span-3 ">
                                                <div className="h-full bg-[#2B2F32] p-5 rounded-2xl flex justify-center items-center ">
                                                    <img src="../images/blue-chart.svg" alt="" />
                                                </div>
                                        </div>
                </h1>
                {/* <Bar options={{}} data={chartData}/> */}
            </div>
            <div className="   rounded-lg   xl:col-span-2 2xl:col-span-1  row-span-2 backdrop-filter backdrop-blur-sm text-center text-xl text-white flex gap-4 xl:flex-col p-4 xl:min-h-[1167px]">
                <div className="bg-[#2B2F32]   xl:h-[55%]  rounded-xl">
                    <div className=" h-16 bg-[#1D1E22]   shadow-lg  rounded-xl rounded-b-md flex justify-center items-center p-5">
                        <input className="w-[70%] rounded-xl bg-[#2B2F32] h-9 px-5 text-lg"   placeholder="Search" />
                    </div>
                </div>
                <div className="  rounded-lg  bg-black/20 xl:h-[45%] flex flex-col items-start gap-4 justify-center p-4">
                    <h1 className="text-2xl font-semibold">Statistics</h1>
                    {/* <Radar options={{}} data={chartData}/> */}
                    
                </div>
            </div>
            <div className="  rounded-lg 2xl:col-span-3 bg-black/35 backdrop-filter backdrop-blur-sm text-center text-xl text-white  min-h-[650px] flex flex-col items-center gap-4 justify-center p-4">
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