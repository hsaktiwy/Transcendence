import React from "react";
import { BsTrophy } from "react-icons/bs";
import { MdOutlineStarBorder } from "react-icons/md";
import { PiPingPongFill } from "react-icons/pi";
import { LiaMedalSolid } from "react-icons/lia";
import { BsFire } from "react-icons/bs";
import OnlineFriends from "./OnlineFreinds.tsx";
import Chart from "chart.js/auto";
import "../index.css"
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
        <div className="font-poppins h-[1200px] dashboard-container border md:h-[1200px] xl:h-[1200px] 2xl:h-[1150px] text-white w-[90%] lg:w-[calc(100%-160px)] my-[20px] p-10 lg:mx-[50px] absolute top-[80px] left-[50%] -translate-x-[50%] lg:-translate-x-0 lg:left-[80px] grid md:grid-cols-12 md:grid-rows-12 xl:grid-cols-12 xl:grid-rows-12 2xl:grid-cols-12 2xl:grid-rows-12 gap-4">
        <div className="  row-span-1 flex justify-center items-center   md:col-span-12 border md:row-span-4 xl:col-span-8 xl:row-span-4 2xl:col-span-9  2xl:row-span-6 xxl:col-span-6">
             <div className=" rounded-lg p-4 flex   gap-2 w-full h-full">
                 <div className=" text-white  w-full ">
                         <div className="flex items-center justify-center w-full p-2 h-full  2xl:p-10 bg-[#2B2F32] rounded-2xl  ">
                                                         <div className="w-full h-full  grid grid-rows-2 ">
                                                             <div className=" bg-[#1D1E22]  px-10  rounded-3xl grid grid-rows-2 ">
                                                                <div className=" h-20  flex items-center 2xl:items-end ">
                                                                        <div className="h-10 w-40 2xl:h-14 2xl:w-48 bg-[#5E97A9] rounded-2xl flex justify-center items-center">
                                                                            <div className="text-xl font-semibold 2xl:text-2xl ">Hello  Hamza</div>
                                                                        </div>
                                                                    </div>
                                                                    <div className=" flex flex-col justify-center  items-center mb-7">
                                                                        <h1 className="text-2xl font-semibold 2xl:text-3xl">53%</h1>
                                                                        <div className="h-3 w-[100%] mt-3 bg-[#444444] rounded-full">
                                                                            <div className="h-3 w-[53%] bg-[#5E97A9] rounded-full"></div>
                                                                        </div>
                                                                    </div>
                                                                 </div>

                                                                <div className="gap-9 grid grid-cols-6  m-auto ">
                                                                    <div className="cardv  col-span-2">
                                                                        <div className="h-3/5">
                                                                            <div className="h-full bg-[#2B2F32] rounded-xl w-[65%] flex flex-col justify-center items-center">
                                                                                <h1 className="text-3xl 2xl:text-5xl font-medium text-[#5E97A9] ">42</h1>
                                                                                <h1 className="text-lg 2xltext-xl font-medium">Wins</h1>
                                                                            </div>
                                                                        </div>
                                                                        <div className="h-2/5 flex justify-center items-center">
                                                                            <div className="w-[65%] h-[100%]  flex gap-3 flex-col justify-center items-center">
                                                                                <div className="w-[80%] border-b-[2px] border rounded-full 2xl:border-b-[3px]"></div>
                                                                                <div className="w-[80%] border-b-[2px] border rounded-full 2xl:border-b-[3px]"></div>
                                                                                <div className="w-[80%] border-b-[2px] border rounded-full 2xl:border-b-[3px]"></div>
                                                                            </div>
                                                                            <div className="w-[35%] h-[100%] flex justify-center items-center ">
                                                                                <img src="../images/emoji_trophy.svg"/>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="cardv  col-span-2">
                                                                        <div className="h-3/5">
                                                                            <div className="h-full bg-[#2B2F32] rounded-xl w-[65%] flex flex-col justify-center items-center">
                                                                                <h1 className="text-3xl 2xl:text-5xl font-medium text-[#5E97A9] ">42</h1>
                                                                                <h1 className="text-lg 2xltext-xl font-medium">Wins</h1>
                                                                            </div>
                                                                        </div>
                                                                        <div className="h-2/5 flex justify-center items-center">
                                                                            <div className="w-[65%] h-[100%]  flex gap-3 flex-col justify-center items-center">
                                                                                <div className="w-[80%] border-b-[2px] border rounded-full 2xl:border-b-[3px]"></div>
                                                                                <div className="w-[80%] border-b-[2px] border rounded-full 2xl:border-b-[3px]"></div>
                                                                                <div className="w-[80%] border-b-[2px] border rounded-full 2xl:border-b-[3px]"></div>
                                                                            </div>
                                                                            <div className="w-[35%] h-[100%] flex justify-center items-center ">
                                                                                <img src="../images/emoji_trophy.svg"/>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="cardv  col-span-2">
                                                                        <div className="h-3/5">
                                                                            <div className="h-full bg-[#2B2F32] rounded-xl w-[65%] flex flex-col justify-center items-center">
                                                                                <h1 className="text-3xl 2xl:text-5xl font-medium text-[#5E97A9] ">42</h1>
                                                                                <h1 className="text-lg 2xltext-xl font-medium">Wins</h1>
                                                                            </div>
                                                                        </div>
                                                                        <div className="h-2/5 flex justify-center items-center">
                                                                            <div className="w-[65%] h-[100%]  flex gap-3 flex-col justify-center items-center">
                                                                                <div className="w-[80%] border-b-[2px] border rounded-full 2xl:border-b-[3px]"></div>
                                                                                <div className="w-[80%] border-b-[2px] border rounded-full 2xl:border-b-[3px]"></div>
                                                                                <div className="w-[80%] border-b-[2px] border rounded-full 2xl:border-b-[3px]"></div>
                                                                            </div>
                                                                            <div className="w-[35%] h-[100%] flex justify-center items-center ">
                                                                                <img src="../images/emoji_trophy.svg"/>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                             </div>
                                                         </div>    
                                                     </div>
                                         </div>
            </div>
        </div>
        <div className="border hidden xxl:block xl:col-span-4 xl:row-span-6 2xl:col-span-3 2xl:row-span-6">
                
                 {/* <div className=" rounded-lg    xl:col-span-2 2xl:col-span-1  backdrop-blur-sm text-center text-xl text-white flex flex-col items-start gap-4 justify-center py-4">
                 <h1 className="text-2xl h-full  font-semibold">
                 <div className=" grid-item col-span-3  ">
                                                 <div className="h-full bg-[#2B2F32] p-5 rounded-2xl flex justify-center items-center ">
                                                     <img src="../images/blue-chart.svg" alt="" />
                                                 </div>
                                         </div>
                 </h1>
             </div> */}
        </div>
        <div className="border row-span-4 hidden xl:block xl:col-span-4 xl:row-span-7 2xl:col-span-3 2xl:row-span-7">
                
                 {/* <div className='onlineFriends-div h-[700px]'>
                    <div className='divs-online'>
                        <div className='bar-search-freinds'>
                            <input className='search-bar-div-friends'  placeholder='Search' />
                            <img style={{width: '15px', marginRight: '10px'}} className="size-image" src="/images/profileVector.svg" />
                            <img style={{width: '23px'}} className="size-image" src="/images/Settings.svg" />
                        </div>
                        <h3 className="font-semibold m-4 w-20">Friends</h3>
                        <div className='online-users'>
                            <div className='each-user'>
                                <img className="w-14" src="/images/Frame 28 (1).svg" />
                                <div className=" mx-3  flex flex-col items-start justify-center  w-72">
                                <h1 className="font-medium text-lg">Hamza Chahboune</h1>
                                <h1 className="font-medium text-xs text-left">@hachahbo</h1>
                                </div>
                                <div className='is-online'>
                                    <div className='green-dot'></div>
                                </div>
                                
                            </div>
                            <div className='each-user'>
                                <img className="w-14" src="/images/Frame 28 (1).svg" />
                                <div className=" mx-3  flex flex-col items-start justify-center  w-72">
                                    <h1 className="font-medium text-lg">Hamza Chahboune</h1>
                                    <h1 className="font-medium text-xs text-left">@hachahbo</h1>
                                </div>
                                <div className='is-online'>
                                    <div className='green-dot'></div>
                                </div>
                                
                            </div>
                            <div className='each-user '>
                                <img className="w-14" src="/images/Frame 28 (1).svg" />
                                <div className=" mx-3  flex flex-col items-start justify-center  w-72">
                                    <h1 className="font-medium text-lg">Hamza Chahboune</h1>
                                    <h1 className="font-medium text-xs text-left">@hachahbo</h1>
                                </div>
                                <div className='is-online'>
                                    <div className='green-dot'></div>
                                </div>
                                
                            </div>
                            <div className='each-user'>
                                <img className="w-14" src="/images/Frame 28 (1).svg" />
                                <div className=" mx-3  flex flex-col items-start justify-center  w-72">
                                    <h1 className="font-semibold">Hamza Chahboune</h1>
                                    <h1 className="font-medium text-xs text-left">@hachahbo</h1>
                                </div>
                                <div className='is-online'>
                                    <div className='green-dot'></div>
                                </div>
                                
                            </div>
                            <div className='each-user'>
                                <img className="w-14" src="/images/Frame 28 (1).svg" />
                                <div className=" mx-3  flex flex-col items-start justify-center  w-72">
                                    <h1 className="font-medium ">Hamza Chahboune</h1>
                                    <h1 className="font-medium text-xs text-left">@hachahbo</h1>
                                </div>
                                <div className='is-online'>
                                    <div className='green-dot'></div>
                                </div>
                                
                            </div>
                            <div className='each-user'>
                                <img className="w-14" src="/images/Frame 28 (1).svg" />
                                <div className=" mx-3  flex flex-col items-start justify-center  w-72">
                                    <h1 className="font-medium text-lg">Hamza Chahboune</h1>
                                    <h1 className="font-medium text-xs text-left">@hachahbo</h1>
                                </div>
                                <div className='is-online'>
                                    <div className='green-dot'></div>
                                </div>
                                
                            </div>
                            
                        </div>
                        <div className='chat-direction'>
                            <div className='chat-button'>
                                <img style={{width: '20px'}} className="size-image" src="/images/chat_bubble.svg" />
                                    <h3 style={{fontWeight: '400', margin:'0px 4px', fontSize: '12px'}}>Chat</h3>
                            </div>
                        </div>
                    </div>
            </div > */}
        </div>
    
        <div className="border row-span-4 md:col-span-12 md:row-span-3 xl:col-span-8 xl:row-span-3 2xl:col-span-6 2xl:row-span-6">big chart</div>
        <div className="border row-span-4 md:col-span-6 md:row-span-3 xl:col-span-4 xl:row-span-4 2xl:col-span-3 2xl:row-span-6">Content 2</div>
        <div className="border row-span-4 md:col-span-6 md:row-span-3 xl:col-span-4 xl:row-span-4 2xl:col-span-3 2xl:row-span-5">
        <div className="  rounded-lg bg-[#2B2F32] h-full w-full  flex items-center mr-6  justify-center p-4">
                    {/* <img className="w-[90%]" src="/images/graf.svg" alt="" /> */}
                    
                </div>
        </div>
        <div className="border row-span-4 md:col-span-6 md:row-span-3 xl:col-span-4 xl:row-span-4 2xl:col-span-3 2xl:row-span-5 2xl:hidden">activities chart</div>
        <div className="border row-span-4 md:col-span-6 md:row-span-3 xl:col-span-4 xl:row-span-4 2xl:col-span-3 2xl:row-span-5 xl:hidden">activities chart</div>
    </div>
       
    )
}

export default Dashboard