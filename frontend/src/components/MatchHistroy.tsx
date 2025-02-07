
import React, { useContext, useEffect, useState }  from "react";


import mailman from "../utils/AxiosFetcher";

import { UserContext } from "./UserContext";
import { MatchHistoryDataInterface } from "@/utils/interfaces";


interface MatchHistoryProps {
  data: MatchHistoryDataInterface[];
  username:string | undefined
}

 
export function MatchHistory({ data, username }: MatchHistoryProps) {


  console.log('dataaaa match history : ->>', data);
  const type = data[0].type;
  console.log('Username:', username); // Now properly logged
  const [isPlayed, setIsPlayed] = useState<boolean>(false);
  
  // const fetchUserData = async () =>{
  //   try {
  //   const req = {
  //     url: `/game/get_matches/PONG`,
  //     method: 'GET',
  //   };
  //   const resp = await mailman(req);
  //   console.log('first resp ->>', resp)
  // }
  // catch (err) {
  //   console.error(err);
  // }
// }

  //  const userContextConsumer = useContext(UserContext)
  //  if (!userContextConsumer)
  //   throw new Error("userContext must be used within a UserProvider");

    // const {userData} = userContextConsumer
    // console.log('usermatch hitrory user 3adi->>', username);
    // console.log('usermatch hitrory userMatchHistory okda ->>', userMatchHistory);


      // const fetchUserMatchHistory = async () => {
      //   try {
      //     const req = {
      //       url: `/game/get_matches/PONG`,
      //       method: 'GET',
      //     };
      //     const resp = await mailman(req);
      //     setUserMatchHistory(resp.data);
      //     console.log('user data  mheere pleasww->>>', resp);
      //   } catch (error) {
      //     console.error('Error fetching match history:', error);
      //   }
      // };
      const getMatchResult = (game: any, username: string | undefined): 'win' | 'lose' | 'draw' => {
        const isUserP1 = username === game.user_p1.login;
        const isUserP2 = username === game.user_p2.login;
    
        if (game.score_p1 === game.score_p2) return 'draw'; // Handle draw case
        if ((isUserP1 && game.score_p1 > game.score_p2) || (isUserP2 && game.score_p2 > game.score_p1)) {
            return 'win';
        }
        return 'lose';
    };
    const findTheUSer = (game:any, username:string | undefined) =>
    {
      if(username === game.user_p1.login)
        return('userUP');
      return('userDown');
    } 
      // // Call the function
      // fetchUserMatchHistory();
      useEffect(()=>{
        // if(userMatchHistory.length)
        //     setIsPlayed(true);
      }, [])
    return (
  <>
       {data.length == 0 ? (<div className="text-2xl  h-full w-full  rounded-2xl bg-gradient-to-br from-[#242b2f] to-[#1b1e1f]  shadow-lg  font-semibold flex flex-col justify-center items-center p-4">
          <div className="flex justify-center items-center rounded-xl bg-gradient-to-bl from-[#283137] to-[#242729] flex-col p-6">
          <svg width="68" height="78" viewBox="0 0 34 39"  className="text-lg" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10.5144 27.5068C10.7933 26.8975 11.4478 27.0026 11.4478 27.0026L11.4927 27.0077C15.354 27.8865 18.9892 27.7086 21.8527 25.6218" stroke="#FFFCFC" strokeWidth="1.23" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M6.51516 25.4258C6.87343 24.8576 6.45024 24.4184 6.45024 24.4184L6.42927 24.397C2.25046 20.6452 0.128367 16.02 3.1339 10.4657C6.63759 3.99056 13.448 -1.77417 21.5319 2.40783C28.0243 5.76648 28.7007 11.5737 27.0845 17.0185" stroke="#FFFCFC" strokeWidth="1.23" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M19.7981 26.7544L1.9353 17.5137" stroke="#FFFCFC" strokeWidth="1.23" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M5.89882 37.6792L8.19269 32.5966L12.5691 23.015L9.16156 21.2522L3.51147 30.175L0.949641 34.191C0.79027 34.4544 0.785674 34.5953 0.817847 34.8105C0.851111 35.0329 1.03358 35.2603 1.27677 35.4721C1.27677 35.4721 2.2284 36.3264 3.67188 36.9398" stroke="#FFFCFC" strokeWidth="1.23" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M25.1275 24.5145C26.714 24.5145 28.0001 23.257 28.0001 21.7057C28.0001 20.1545 26.714 18.897 25.1275 18.897C23.541 18.897 22.2549 20.1545 22.2549 21.7057C22.2549 23.257 23.541 24.5145 25.1275 24.5145Z" stroke="#FFFCFC" strokeWidth="1.23" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M27.5002 38C30.5377 38 33.0001 35.5376 33.0001 32.5C33.0001 29.4624 30.5377 27 27.5001 27C25.0374 27 22.976 28.6186 22.2751 30.85H23.6501" stroke="white" strokeWidth="0.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M27.5 30.3V32.5L28.6 33.6" stroke="white" strokeWidth="0.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M22 32.5C22 32.6855 22.0084 32.869 22.0247 33.05M25.85 38C25.6621 37.9382 25.4786 37.866 25.3 37.7843M22.6652 35.25C22.5591 35.0456 22.4645 34.8338 22.3822 34.6154M23.5572 36.5186C23.7253 36.6997 23.9047 36.8693 24.0942 37.0261" stroke="white" strokeWidth="0.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <h1 className="text-center m-2 text-lg">You haven't played any matches yet</h1>
          </div>
       </div>)  :
            (<div className="text-2xl h-full w-full rounded-2xl rounded-t-none  shadow-lg font-semibold flex flex-col justify-center items-center p-4 overflow-auto">
                      
                    <div className="p-3  w-full h-full grid grid-rows-6 ">
                      <div className="row-span-2  px-6 flex items-center justify-between w-full">
                          <div className="flex items-center justify-center flex-col gap-3">
                              <img className="size-14 lg;size-18  xxl:size-24 rounded-full aspect-square  object-cover" src={`${import.meta.env.VITE_axiosPath}${data[0].user_p1.profile_pic}`|| ""} alt="user-image" />
                              <div className="text-base font-medium xxl:text-base ">{` ${data[0].user_p1.firstName}`}</div>
                           </div>
                          <div className="">
                            <h1 className="text-3xl  xxl:text-3xl" >{data[0].score_p1} - {data[0].score_p2}</h1>
                          </div>
                          <div className="flex items-center justify-center flex-col gap-3">
                          <img className="size-14 lg;size-18  xxl:size-24 rounded-full aspect-square  object-cover" src={`${import.meta.env.VITE_axiosPath}${data[0].user_p2.profile_pic}`} alt="user-image" />
                              <div className="text-base font-medium  xxl:text-base ">{` ${data[0].user_p2.firstName}`}</div>
                           </div>
                      </div>
                      <div className="  row-span-4  pt-2 ">
                          <h1 className="text-base   text-gray-400 font-medium   "> Last 5 matches</h1>
                          <div className="  w-full  border-t border-[#5E97A9] rounded-full my-3 mt-1"></div>
                          <div className="h-40 xxl:h-60 overflow-y-auto px-5">
                          {data.map((game: any, index: any) => {
                              const matchResult = getMatchResult(game, username); // Determine if the user won
                              const findUser = findTheUSer(game, username)
                              return (
                                <React.Fragment key={game.id}>
                                  <div className="w-full mb-4 flex items-center bg-gradient-to-bl from-[#242b2f] to-[#1b1e1f] gap-4 shadow-lg rounded-lg py-4">
                                    {/* Conditional Gradient for Win/Loss */}
                                    <div className={`bg-gradient-to-b ${
                                          matchResult === 'win' ? 'from-[#84D679] via-[#598752] to-[#2D392C]' :
                                          matchResult === 'lose' ? 'from-[#E45959] via-[#875252] to-[#392C2C]' :
                                          'from-[#E5C359] via-[#877852] to-[#39332C]' // Yellow for draw
                                        } w-1 h-16 rounded-r-lg`}
                                      ></div>

                                    {/* Player 1 Details */}
                                    <div className="w-full mr-4">
                                      <div className="flex items-center">
                                        <div className="min-w-32 w-[100%] h-full flex items-center">
                                          <img
                                            className="w-11 aspect-square rounded-full object-cover"
                                            src={`${import.meta.env.VITE_axiosPath}${game.user_p1.profile_pic}`}
                                            alt="user-image"
                                          />
                                          <div className="mx-3">
                                            <h1 className="font-medium text-xs">
                                              {game.user_p1.firstName} {game.user_p1.lastName}
                                            </h1>
                                            <h1 className="font-normal opacity-80 text-xs text-left">
                                              {game.user_p1.login || 'N/A'}
                                            </h1>
                                          </div>
                                        </div>
                                        <div>
                                            {findUser !== 'userUP' && type === "CHESS" ? (
                                              matchResult === 'win' ? 'Lose' : matchResult === 'lose' ? 'Win' : 'Draw'
                                            ) : findUser === 'userUP' && type === "CHESS" ? (
                                              matchResult === 'win' ? 'Win' : matchResult === 'lose' ? 'Lose' : 'Draw'
                                            ) : (
                                              game.score_p1
                                            )}
                                          </div>
                                      </div>

                                      <div className="w-full border-t border-[#5E97A9] rounded-full my-4"></div>

                                      {/* Player 2 Details */}
                                      <div className="flex items-center">
                                        <div className="min-w-32 w-[100%] h-full flex items-center">
                                          <img
                                            className="w-11 aspect-square rounded-full object-cover"
                                            src={`${import.meta.env.VITE_axiosPath}${game.user_p2.profile_pic}`}
                                            alt="user-image"
                                          />
                                          <div className="mx-3">
                                            <h1 className="font-medium text-xs">
                                              {game.user_p2.firstName} {game.user_p2.lastName}
                                            </h1>
                                            <h1 className="font-normal opacity-80 text-xs text-left">
                                              {game.user_p2.login || 'N/A'}
                                            </h1>
                                          </div>
                                        </div>
                                        <div>
                                            {findUser !== 'userDown' && type === "CHESS" ? (
                                              matchResult === 'win' ? 'Lose' : matchResult === 'lose' ? 'Win' : 'Draw'
                                            ) : findUser === 'userDown' && type === "CHESS" ? (
                                              matchResult === 'win' ? 'Win' : matchResult === 'lose' ? 'Lose' : 'Draw'
                                            ) : (
                                              game.score_p1
                                            )}
                                          </div>
                                      </div>
                                    </div>
                                  </div>

                                  {/* Separator Line Between Matches */}
                                  {index < data.length - 1 && (
                                    <div className="w-full border-t border-[#5E97A9] rounded-full my-3"></div>
                                  )}
                                </React.Fragment>
                              );
                            })}
                          </div>
                      </div>

                    </div>
                 </div>)}      
  </>
  )
}