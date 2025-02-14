import React, { useContext, useEffect } from "react";
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
import RankFile from "./rankFile.tsx";
// import { axiosPath ,BACKEND } from "../utils/Constants";
import OnlineFriends from "./OnlineFriends.tsx";
import { ScrollArea } from "@/components/ui/scroll-area"
import Achievements from "./Achievements.tsx";
import { PieChartFile } from "./PieChart.tsx";
import { UserContext } from "./UserContext";
import { MatchHistory } from "./MatchHistroy.tsx";
import SkeletonDashboard from "./Skeletons/SkeletoneDashboard.tsx";
import { WebSocketContext } from "@/utils/WSContext.tsx";
import mailman from "@/utils/AxiosFetcher.ts";
import { useParams } from "react-router-dom";
import { LinechartData, LoseWins, RadarChartInterFace, twoGames, UserRankResponse,  } from "@/utils/interfaces.ts";

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

  const userContextConsumer = useContext(UserContext);
  // const 
  const wsConsumer = useContext(WebSocketContext)
  const [isLoading, setIsLoading] = useState(true);
  const [matches, setMatches] = useState<LoseWins | undefined>()
  const [radarchartData, setRadarChartData] = useState<RadarChartInterFace | undefined>()
  const [lineChartData, setLineChartData] = useState<LinechartData | undefined>()
  

  const uuid = userContextConsumer?.userData?.unique_id;
  // const level = userContextConsumer?.level
  // console.log('hiii user name here', level);
  const fetchLineChart = async () =>
    {
        try{
            const req = {
                url: `/profile/get_line_chart/${uuid}/`,
                method: 'GET',
                withCredentials: true,
            }
            const resp = await mailman(req);
            console.log('matches  is here  ma hree : \n', resp.data);
            const fetchedData: LinechartData = {
                user: resp.data.user,
                weekly_match_data: resp.data.weekly_match_data, // This should already be an array
            };
            setLineChartData(fetchedData);
            console.log('hiiii mhere', lineChartData);
            // setMatches(resp.data);
        }
        catch (err){
            console.error("dddddd======????",err)
    }}

    const [userMatchHistory, setUserMatchHistory] = useState<twoGames | undefined>();
  
    const getMatchHistoryData = async () => {
      const req = {
        url: `/game/get_matches/${uuid}/`,
        method: "GET",
      };
      const resp = await mailman(req);
      if (resp.data)
      {
        setUserMatchHistory(resp.data);

      }
    };
    
   const fetchMatches = async () =>
    {
        try{
            const req = {
                url: `/profile/get_win_lose/${uuid}/`,
                method: 'GET',
                withCredentials: true,
            }
            const resp = await mailman(req);
            console.log('print win and lose mheree pleas : \n', resp.data);
            setMatches(resp.data);
            setRadarChartData(resp.data);
        }
        catch (err){
            console.error("dddddd======????",err)
        }
    }
        const [level, setLevel] = useState<UserRankResponse | undefined>();
    
        const fetchLevle = async () =>
            {
                try{
                    const req = {
                        url: `/profile/get_rank_user/${uuid}/`,
                        method: 'GET',
                        withCredentials: true,
                    }
                    const resp = await mailman(req);
                    if(resp.data)
                        setLevel(resp.data);
                }
                catch (err){
                    console.error("dddddd======????",err)
                }
            }
  
    const waitData=  async() =>
      {
          await fetchLineChart();
          await fetchMatches();
          await getMatchHistoryData();
          await fetchLevle();
          setIsLoading(false)
      } 
  useEffect(() => {
    if(!level)
        waitData()
    // Cleanup the timer to avoid memory leaks
  }, [level]);
  if (!userContextConsumer || !wsConsumer)
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
      <div>
      {isLoading ? (
        <SkeletonDashboard /> 
      ) : (
        <>
          <div className="font-poppins pb-20 dashboard-container  md:h-[1700px] xl:h-[1200px] 2xl:h-[1150px] text-white w-[90%] lg:w-[calc(100%-160px)] my-[20px] lg:p-10 lg:pt-0 lg:mx-[50px] absolute top-[80px] left-[50%] -translate-x-[50%] lg:-translate-x-0 lg:left-[80px] grid md:grid-cols-12 md:grid-rows-12 xl:grid-cols-12 xl:grid-rows-11 2xl:grid-cols-12 2xl:grid-rows-12 gap-4 ">
          <div className=" row-span-1 flex justify-center items-center  md:col-span-12  md:row-span-4 xl:col-span-8 xl:row-span-4 2xl:col-span-9  2xl:row-span-6 xxl:col-span-6 ">
              <div className=" rounded-lg 2xl:pt-4 flex   gap-2 w-full h-full">
                  <div className=" text-white  w-full ">
                          <div className="flex items-center  justify-center w-full p-4 h-full  2xl:p-10 bg-gradient-to-br from-[#283137] to-[#242729]   shadow-3xl shadow-[#22333869] sh rounded-2xl  ">
                              <div className="w-full h-full  grid grid-rows-2 ">
                              <div className="relative bg-cover bg-center px-5 lg:px-10 rounded-3xl grid grid-rows-2"
                                  style={{ backgroundImage: `url(${import.meta.env.VITE_axiosPath}${userContextConsumer.userData?.CoverProfile})`,}}>
                              <div className="absolute inset-0 bg-black opacity-10 rounded-3xl"></div>
                                      <div className=" h-20  flex items-center 2xl:items-end ">
                                              <div className="relative px-4 h-8 min-w-36 xxl:h-10 xxl:min-w-36 border border-white/30  rounded-xl flex justify-center items-center">
                                                  {/* <div className="absolute inset-0 bg-gradient-to-br from-[#1c2328] to-[#323639] opacity-70 rounded-xl"></div> */}
                                                  <div className="relative text-lg text-white font-medium">
                                                    {`Hello ${userContextConsumer.userData?.firstName}`} 
                                                    
                                                  </div>
                                                </div>

                                          </div>
                                          
                                          <div className="flex flex-col  justify-center items-center ">
                                              <h1 className="text-2xl font-semibold xxl:text-3xl">{level?.level.toFixed(2)} Level </h1>
                                              <div className="h-3 w-[100%] bg-[#444444] rounded-full">
                                              <div
                                                      style={{
                                                          width: `${((level?.level ?? 0) % 1 * 100).toFixed()}%` // Reset at every level
                                                      }}
                                                      className="h-3 w-[53%] bg-gradient-to-br from-[#373e37] to-[#5E97A9] rounded-full"
                                                      /> 

                                              </div>
                                              <div className="w-full text-right">
                                                <div className="text-xs font-bold text mr-3">
                                                  {level?.xp}xp
                                                  <span className="text-[9px]"> / </span>
                                                  {(Math.floor(level?.level ?? 0) + 1) * 1000}xp
                                                </div>
                                              </div>

                                          </div>
                                      </div>
                                              <Achievements uuid={uuid}/>
                              </div>    
                          </div>
                  </div>
              </div>
          </div>
         <div className=" hidden xxl:block xl:col-span-4 xl:row-span-6 2xl:col-span-3 2xl:row-span-6 pt-4">
              <div className="w-full h-full flex flex-col bg-gradient-to-br from-[#242b2f] to-[#1b1e1f] rounded-md shadow-3xl shadow-[#22333869]">
                  <MatchHistory data={userMatchHistory} username={userContextConsumer?.userData?.login} />
              </div>
        </div>
        <div className=" row-span-4 hidden xl:block xl:col-span-4 xl:row-span-7 2xl:col-span-3 2xl:row-span-7">
                <OnlineFriends/>
                 
        </div>
    
        <div className=" row-span-4 md:col-span-12  md:row-span-4 rounded-2xl p-4 shadow-3xl  shadow-[#22333869] bg-gradient-to-tr from-[#2f3a41] to-[#2B2F32]   xl:col-span-8 xl:row-span-3 2xl:col-span-5 2xl:row-span-6 xxl:col-span-6">
            <div className="w-full h-full  bg-gradient-to-br from-[#242b2f] to-[#1b1e1f]  flex flex-col justify-center items-center pb-7 pt-4 px-4 rounded-2xl">
                <LineCharFile data={lineChartData} />
            </div>
        </div>
        <div className="  row-span-4 md:col-span-6 md:row-span-4 xl:col-span-4 xl:row-span-4 2xl:col-span-4 2xl:row-span-6 xxl:col-span-3">
            <RankFile/>
        </div>
        <div className="2xl:px-7  row-span-4 md:col-span-6 md:row-span-4 xl:col-span-4 xl:row-span-4 2xl:col-span-3 2xl:row-span-5">
        <div className="  rounded-2xl bg-gradient-to-tr from-[#2f3a41] to-[#2B2F32] h-full w-full  flex items-center mr-6  justify-center p-4">
              <RadarChartFile radarchartData={radarchartData || { wins: 0, lose: 0, _wins: 0, _lose: 0 }} />
        </div>
        </div>
        <div className="xl:pr-5 row-span-2 md:col-span-6 md:row-span-4 xl:col-span-4 xl:row-span-4 2xl:col-span-3 2xl:row-span-5 2xl:hidden">
        <div className="w-full h-full flex flex-col bg-gradient-to-br from-[#242b2f] to-[#1b1e1f] rounded-md shadow-3xl shadow-[#22333869]">
                  <MatchHistory data={userMatchHistory} username={userContextConsumer?.userData?.login} />
              </div>
        </div>
        <div className="= row-span-4 md:col-span-6 md:row-span-4 xl:col-span-4 xl:row-span-4 2xl:col-span-3 2xl:row-span-5  bg-gradient-to-tr from-[#2f3a41] to-[#2B2F32] rounded-2xl p-4 xl:hidden">
            <PieChartFile matches={matches} />
        </div>
    </div>
        </>
      )}
    </div>

       
    )
}

export default Dashboard