import React, { useContext } from "react";
import { BsTrophy } from "react-icons/bs";
import { MdOutlineStarBorder } from "react-icons/md";
import { PiPingPongFill } from "react-icons/pi";
import { LiaMedalSolid } from "react-icons/lia";
import { BsFire } from "react-icons/bs";
import Chart from "chart.js/auto";
import "../index.css"
import { CategoryScale } from "chart.js";
import { useState } from "react";
import { Pie, Bar, Radar, Doughnut } from "react-chartjs-2";
import { ChartFile } from "./Chartfile.tsx";
import { LineCharFile } from "./lineChart.tsx";
import { RadarChartFile } from "./RadarChartFile.tsx";
import { RadarChart } from "recharts";
import RankFile from "./rankfile.tsx";
import OnlineFriends from "./OnlineFriends.tsx";
import { ScrollArea } from "@/components/ui/scroll-area"
import Achievements from "./Achievements.tsx";
import { PieChartFile } from "./PieChart.tsx";
import { UserContext } from "./UserContext";

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

    const userContextConsumer = useContext(UserContext)
    if (!userContextConsumer)
        throw new Error("userContext must be used within a UserProvider");
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
        <div className="font-poppins  h-[1200px] dashboard-container  md:h-[1700px] xl:h-[1200px] 2xl:h-[1150px] text-white w-[90%] lg:w-[calc(100%-160px)] my-[20px] lg:p-10 lg:mx-[50px] absolute top-[80px] left-[50%] -translate-x-[50%] lg:-translate-x-0 lg:left-[80px] grid md:grid-cols-12 md:grid-rows-12 xl:grid-cols-12 xl:grid-rows-12 2xl:grid-cols-12 2xl:grid-rows-12 gap-4 ">
          <div className=" row-span-1 flex justify-center items-center  md:col-span-12  md:row-span-4 xl:col-span-8 xl:row-span-4 2xl:col-span-9  2xl:row-span-6 xxl:col-span-6 ">
              <div className=" rounded-lg 2xl:pt-4 flex   gap-2 w-full h-full">
                  <div className=" text-white  w-full ">
                          <div className="flex items-center  justify-center w-full p-4 h-full  2xl:p-10  bg-gradient-to-tr from-[#2f3a41] to-[#2B2F32]  shadow-3xl shadow-[#22333869] sh rounded-2xl  ">
                                                          <div className="w-full h-full  grid grid-rows-2 ">
                                                              <div className=" bg-[#1D1E22] px-5 lg:px-10  rounded-3xl grid grid-rows-2 ">
                                                                  <div className=" h-20  flex items-center 2xl:items-end ">
                                                                          <div className=" w-40  2xl:w-auto bg-[#5E97A9] rounded-2xl flex justify-center items-center text-center">
                                                                            <div className="text-xl font-semibold 2xl:text-lg ">{`Hello  ${userContextConsumer.userData?.firstName}`}</div>
                                                                          </div>
                                                                      </div>
                                                                      <div className=" flex flex-col justify-center  items-center mb-7">
                                                                          <h1 className="text-2xl font-medium 2xl:font-semibold 2xl:text-3xl">7.5 Level</h1>
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
        <div className=" hidden xxl:block xl:col-span-4 xl:row-span-6 2xl:col-span-3 2xl:row-span-6 pt-4">
                 <div className="  rounded-2xl bg-gradient-to-tr from-[#2f3a41] to-[#2B2F32] h-full p-7 ">
                 <div className="text-2xl h-full  rounded-2xl bg-[#1D1E22]  font-semibold flex flex-col justify-center items-center p-7">
                        <h1 className=" font-medium"> User Activities</h1>
                        <div className=" p-5 w-[105%] flex justify-center items-center ">
                               <ChartFile/>
                        </div>
                 </div>
             </div>
        </div>
        <div className=" row-span-4 hidden xl:block xl:col-span-4 xl:row-span-7 2xl:col-span-3 2xl:row-span-7">
                <OnlineFriends/>
                 
        </div>
    
        <div className=" row-span-4 md:col-span-12  md:row-span-4 rounded-2xl p-4 shadow-3xl shadow-[#22333869] bg-gradient-to-tr from-[#2f3a41] to-[#2B2F32]   xl:col-span-8 xl:row-span-3 2xl:col-span-5 2xl:row-span-6 xxl:col-span-6">
            <div className="w-full h-full bg-gradient-to-br from-[#212225] to-[#1D1E22] flex flex-col justify-center items-center pb-7 pt-4 px-4 rounded-2xl">
                <LineCharFile />
            </div>
        </div>
        <div className="  row-span-4 md:col-span-6 md:row-span-4 xl:col-span-4 xl:row-span-4 2xl:col-span-4 2xl:row-span-6 xxl:col-span-3">
            <RankFile/>
        </div>
        <div className="2xl:px-7  row-span-4 md:col-span-6 md:row-span-4 xl:col-span-4 xl:row-span-4 2xl:col-span-3 2xl:row-span-5">
        <div className="  rounded-2xl bg-gradient-to-tr from-[#2f3a41] to-[#2B2F32] h-full w-full  flex items-center mr-6  justify-center p-4">
                   <RadarChartFile/>
        </div>
        </div>
        <div className="pr-5 row-span-2 md:col-span-6 md:row-span-4 xl:col-span-4 xl:row-span-4 2xl:col-span-3 2xl:row-span-5 2xl:hidden">
            <div className="  rounded-2xl bg-gradient-to-tr from-[#2c353a] to-[#2B2F32] h-full p-4 ">
                    <div className="text-2xl h-full  rounded-2xl bg-[#1D1E22]  font-semibold flex flex-col justify-center items-center p-7">
                            <h1 className=" font-medium"> User Activities</h1>
                            <div className=" p-2 w-[105%] flex justify-center items-center ">
                                <ChartFile/>
                            </div>
                    </div>
            </div>
        </div>
        <div className="= row-span-4 md:col-span-6 md:row-span-4 xl:col-span-4 xl:row-span-4 2xl:col-span-3 2xl:row-span-5 bg-[#2B2F32] rounded-2xl p-4 xl:hidden">
            <PieChartFile/>
        </div>
    </div>
       
    )
}

export default Dashboard