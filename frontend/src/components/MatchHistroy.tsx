
import React, { useContext, useEffect, useState }  from "react";


import mailman from "../utils/AxiosFetcher";

import { UserContext } from "./UserContext";
import { MatchHistoryDataInterface, twoGames } from "@/utils/interfaces";


interface MatchHistoryProps {
  data: twoGames | undefined;
  username:string | undefined
}

 
export function MatchHistory({ data, username }: MatchHistoryProps) {


  console.log('dataaaa match history : ->>', data);
  
  // console.log('Username:', username); // Now properly logged
  const [isPlayed, setIsPlayed] = useState<boolean>(false);
  
  const [matchHistoryType, setMatchHistoryType] = useState<"PONG" | "CHESS">("PONG");

  const switchMatchHistoryType = (type: "PONG" | "CHESS") => {
    setMatchHistoryType(type);
  };

      const getMatchResult = (game: any, username: string | undefined): 'win' | 'lose' | 'draw' => {
        const isUserP1 = username === game.user_p1.login;
        const isUserP2 = username === game.user_p2.login;
    
        if (game.score_p1 === game.score_p2) 
          return 'draw'; // Handle draw case
        // console.log('username  ->>>', username)
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
          {!data || data.length === 0 ? (
            <div className="text-2xl h-full w-full rounded-2xl bg-gradient-to-br from-[#242b2f] to-[#1b1e1f] shadow-lg font-semibold flex flex-col justify-center items-center p-4">
              <div className="flex justify-center items-center rounded-xl bg-gradient-to-bl from-[#283137] to-[#242729] flex-col p-6">
              <img className="w-10" src="/PaddelTime.svg"></img>

                <h1 className="text-center m-2 text-lg">You haven't played any matches yet</h1>
              </div>
            </div>
          ) : (
            <>
              <div>
                {/* Switch Buttons */}
                <div className="flex">
                  {["PONG", "CHESS"].map((type) => (
                    <button
                      key={type}
                      className={`px-4 py-4 text-sm font-medium w-full flex justify-center items-center gap-3 rounded-md transition-all ${
                        matchHistoryType === type
                          ? "rounded-b-none"
                          : "text-gray-500 bg-gradient-to-tr from-[#2f3a41] to-[#2B2F32]"
                      } hover:text-[#5E97A9]`}
                      onClick={() => switchMatchHistoryType(type as "PONG" | "CHESS")}
                    >
                      <div>
                        {type === "PONG" ? (
                          <img src="/assets/svg/game.svg" alt="Pong Icon" className="w-5 h-full" />
                        ) : (
                          <img className="w-6" src="../strategy.png" alt="Chess Icon" />
                        )}
                      </div>
                      {type}
                    </button>
                  ))}
                </div>
      
                {/* Display Matches Based on Selected Type */}
                <div className="mt-4">
                  {matchHistoryType === "PONG" ? (
                        data?.Pong && data.Pong.length > 0 ? (
                          <div>
                              <div className="p-3 w-full h-full grid grid-rows-6 overflow-hidden">
                              <div className="row-span-2 px-6 flex items-center font-semibold justify-between w-full">
                                <div className="flex items-center justify-center flex-col gap-3">
                                  <img
                                    className="size-14 lg:size-18 xxl:size-24 rounded-full aspect-square object-cover"
                                    src={`${import.meta.env.VITE_axiosPath}${data.Pong[0].user_p1.profile_pic}` || ""}
                                    alt="user-image"
                                  />
                                  <div className="text-base font-medium xxl:text-base">
                                    {data.Pong[0].user_p1.firstName}
                                  </div>
                                </div>
                                <div>
                                  <h1 className="text-3xl xxl:text-3xl">
                                    {data.Pong[0].score_p1} - {data.Pong[0].score_p2}
                                  </h1>
                                </div>
                                <div className="flex items-center justify-center flex-col gap-3">
                                  <img
                                    className="size-14 lg:size-18 xxl:size-24 rounded-full aspect-square object-cover"
                                    src={`${import.meta.env.VITE_axiosPath}${data.Pong[0].user_p2.profile_pic}`}
                                    alt="user-image"
                                  />
                                  <div className="text-base font-medium xxl:text-base">
                                    {data.Pong[0].user_p2.firstName}
                                  </div>
                                </div>
                              </div>
                          <div className="  row-span-4  pt-2 ">
                           <h1 className="text-base   text-gray-400 font-medium   "> Last 5 matches</h1>
                           <div className="  w-full  border-t border-[#5E97A9] rounded-full my-3 mt-1"></div>
                           <div className="h-36  xxl:h-60 rounded-lg overflow-y-auto px-5">
                           {data.Pong.map((game: any, index: any) => {
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
                                        <div className="min-w-32 w-[100%] h-full  flex items-center">
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
                                        <div className="font-semibold text-2xl">
                                            {findUser !== 'userUP' && game.type === "CHESS" ? (
                                              matchResult === 'win' ? 'Lose' : matchResult === 'lose' ? 'Win' : 'Draw'
                                            ) : findUser === 'userUP' && game.type === "CHESS" ? (
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
                                        <div className="font-semibold text-2xl">
                                            {findUser !== 'userDown' && game.type === "CHESS" ? (
                                              matchResult === 'win' ? 'Lose' : matchResult === 'lose' ? 'Win' : 'Draw'
                                            ) : findUser === 'userDown' && game.type === "CHESS" ? (
                                              matchResult === 'win' ? 'Win' : matchResult === 'lose' ? 'Lose' : 'Draw'
                                            ) : (
                                              game.score_p2
                                            )}
                                          </div>
                                      </div>
                                    </div>
                                  </div>

                                  {/* Separator Line Between Matches */}
                                  {index < data.Pong.length - 1 && (
                                    <div className="w-full border-t border-[#5E97A9] rounded-full my-3"></div>
                                  )}
                                </React.Fragment>
                              );
                            })}
                          </div>
                      </div>

                    </div>
                            </div>

                    ) : (
                      <div className="text-2xl h-[310px] xxl:h-[450px]   w-full rounded-2xl   font-semibold flex flex-col justify-center items-center p-4">
                        <div className="flex justify-center items-center rounded-xl bg-gradient-to-bl from-[#283137] to-[#242729] flex-col p-6">
                            <img className="w-10" src="/PaddelTime.svg"></img>
                            <h1 className="text-center m-2 text-lg">You haven't played any matches yet</h1>
                        </div>
                    </div>
                    )
                  ) 
                  : data?.Chess && data.Chess.length > 0 ? (
                    
                    <div>
                    <div className="p-3 w-full h-full grid grid-rows-6  ">
                      <div className="row-span-2 px-6 flex items-center font-semibold justify-between w-full">
                        <div className="flex items-center justify-center flex-col gap-3">
                          <img
                            className="size-14 lg:size-18 xxl:size-24 rounded-full aspect-square object-cover"
                            src={`${import.meta.env.VITE_axiosPath}${data.Chess[0].user_p1.profile_pic}` || ""}
                            alt="user-image"
                          />
                          <div className="text-base font-medium xxl:text-base">
                            {data.Chess[0].user_p1.firstName}
                          </div>
                        </div>
                        <div>
                          <h1 className="text-3xl xxl:text-3xl">
                            {data.Chess[0].score_p1} - {data.Chess[0].score_p2}
                          </h1>
                        </div>
                        <div className="flex items-center justify-center flex-col gap-3">
                          <img
                            className="size-14 lg:size-18 xxl:size-24 rounded-full aspect-square object-cover"
                            src={`${import.meta.env.VITE_axiosPath}${data.Chess[0].user_p2.profile_pic}`}
                            alt="user-image"
                          />
                          <div className="text-base font-medium xxl:text-base">
                            {data.Chess[0].user_p2.firstName}
                          </div>
                        </div>
                      </div>
                  <div className="  row-span-4  pt-2 ">
                   <h1 className="text-base   text-gray-400 font-medium   "> Last 5 matches</h1>
                   <div className="  w-full  border-t border-[#5E97A9] rounded-full my-3 mt-1"></div>
                   <div className="h-36  xxl:h-60 overflow-y-auto px-5">
                   {data.Chess.map((game: any, index: any) => {
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
                                <div className="min-w-32 w-[100%] h-full  flex items-center">
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
                                <div className="font-semibold text-lg">
                                    {findUser !== 'userUP' && game.type === "CHESS" ? (
                                      matchResult === 'win' ? 'Lose' : matchResult === 'lose' ? 'Win' : 'Draw'
                                    ) : findUser === 'userUP' && game.type === "CHESS" ? (
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
                                <div className="font-semibold text-lg">
                                    {findUser !== 'userDown' && game.type === "CHESS" ? (
                                      matchResult === 'win' ? 'Lose' : matchResult === 'lose' ? 'Win' : 'Draw'
                                    ) : findUser === 'userDown' && game.type === "CHESS" ? (
                                      matchResult === 'win' ? 'Win' : matchResult === 'lose' ? 'Lose' : 'Draw'
                                    ) : (
                                      game.score_p2
                                    )}
                                  </div>
                              </div>
                            </div>
                          </div>
                          {index < data.Pong.length - 1 && (
                            <div className="w-full border-t border-[#5E97A9] rounded-full my-3"></div>
                          )}
                        </React.Fragment>
                      );
                    })}
                  </div>
              </div>

            </div>
                    </div>
                  ) : (
                    <div className="text-2xl h-[310px] xxl:h-[450px]   w-full rounded-2xl   font-semibold flex flex-col justify-center items-center p-4">
                        <div className="flex justify-center items-center rounded-xl bg-gradient-to-bl from-[#283137] to-[#242729] flex-col p-6">
                            <img className="w-10" src="/PaddelTime.svg"></img>
                            <h1 className="text-center m-2 text-lg">You haven't played any matches yet</h1>
                        </div>
                    </div>
                  )
                  }
                </div>
              </div>
            </>
          )}
        </>
      );
    }    

            //                                     {["PONG", "CHESS"].map((type) => (
            //                                         <button
            //                                         key={type}
            //                                         className={`px-4 py-4 text-sm font-medium w-full flex justify-center items-center gap-3 rounded-md transition-all ${
            //                                             matchHistoryType === type
            //                                             ? " rounded-b-none"
            //                                             : "text-gray-500 bg-gradient-to-tr from-[#2f3a41] to-[#2B2F32] "
            //                                         } hover:text-[#5E97A9]`}
            //                                         onClick={() => switchMatchHistoryType(type)}
            //                                         >
            //                                         <div>
            //                                             {
            //                                                 type == "PONG" ?        
            //                                                     <img src="/assets/svg/game.svg" alt="Message Icon" className="w-5 h-full" />
            //                                                      :
            //                                                      <div><img className="w-6" src="../strategy.png"/></div>
            //                                         }
            //                                         </div>
            //                                         {type}
            //                                         </button>
            //                                     ))}
            //                                     </div> 
            // <div className="text-2xl h-full w-full rounded-2xl rounded-t-none  shadow-lg font-semibold flex flex-col justify-center items-center p-4 overflow-auto">
                      
            //         <div className="p-3  w-full h-full grid grid-rows-6 ">
            //           <div className="row-span-2  px-6 flex items-center justify-between w-full">
            //               <div className="flex items-center justify-center flex-col gap-3">
            //                   <img className="size-14 lg;size-18  xxl:size-24 rounded-full aspect-square  object-cover" src={`${import.meta.env.VITE_axiosPath}${data[0].user_p1.profile_pic}`|| ""} alt="user-image" />
            //                   <div className="text-base font-medium xxl:text-base ">{` ${data[0].user_p1.firstName}`}</div>
            //                </div>
            //               <div className="">
            //                 <h1 className="text-3xl  xxl:text-3xl" >{data[0].score_p1} - {data[0].score_p2}</h1>
            //               </div>
            //               <div className="flex items-center justify-center flex-col gap-3">
            //               <img className="size-14 lg;size-18  xxl:size-24 rounded-full aspect-square  object-cover" src={`${import.meta.env.VITE_axiosPath}${data[0].user_p2.profile_pic}`} alt="user-image" />
            //                   <div className="text-base font-medium  xxl:text-base ">{` ${data[0].user_p2.firstName}`}</div>
            //                </div>
            //           </div>
            //           <div className="  row-span-4  pt-2 ">
            //               <h1 className="text-base   text-gray-400 font-medium   "> Last 5 matches</h1>
            //               <div className="  w-full  border-t border-[#5E97A9] rounded-full my-3 mt-1"></div>
            //               <div className="h-40 xxl:h-60 overflow-y-auto px-5">
            //               {data.map((game: any, index: any) => {
            //                   const matchResult = getMatchResult(game, username); // Determine if the user won
            //                   const findUser = findTheUSer(game, username)
            //                   return (
            //                     <React.Fragment key={game.id}>
            //                       <div className="w-full mb-4 flex items-center bg-gradient-to-bl from-[#242b2f] to-[#1b1e1f] gap-4 shadow-lg rounded-lg py-4">
            //                         {/* Conditional Gradient for Win/Loss */}
            //                         <div className={`bg-gradient-to-b ${
            //                               matchResult === 'win' ? 'from-[#84D679] via-[#598752] to-[#2D392C]' :
            //                               matchResult === 'lose' ? 'from-[#E45959] via-[#875252] to-[#392C2C]' :
            //                               'from-[#E5C359] via-[#877852] to-[#39332C]' // Yellow for draw
            //                             } w-1 h-16 rounded-r-lg`}
            //                           ></div>

            //                         {/* Player 1 Details */}
            //                         <div className="w-full mr-4">
            //                           <div className="flex items-center">
            //                             <div className="min-w-32 w-[100%] h-full flex items-center">
            //                               <img
            //                                 className="w-11 aspect-square rounded-full object-cover"
            //                                 src={`${import.meta.env.VITE_axiosPath}${game.user_p1.profile_pic}`}
            //                                 alt="user-image"
            //                               />
            //                               <div className="mx-3">
            //                                 <h1 className="font-medium text-xs">
            //                                   {game.user_p1.firstName} {game.user_p1.lastName}
            //                                 </h1>
            //                                 <h1 className="font-normal opacity-80 text-xs text-left">
            //                                   {game.user_p1.login || 'N/A'}
            //                                 </h1>
            //                               </div>
            //                             </div>
            //                             <div>
            //                                 {findUser !== 'userUP' && game.type === "CHESS" ? (
            //                                   matchResult === 'win' ? 'Lose' : matchResult === 'lose' ? 'Win' : 'Draw'
            //                                 ) : findUser === 'userUP' && game.type === "CHESS" ? (
            //                                   matchResult === 'win' ? 'Win' : matchResult === 'lose' ? 'Lose' : 'Draw'
            //                                 ) : (
            //                                   game.score_p1
            //                                 )}
            //                               </div>
            //                           </div>

            //                           <div className="w-full border-t border-[#5E97A9] rounded-full my-4"></div>

            //                           {/* Player 2 Details */}
            //                           <div className="flex items-center">
            //                             <div className="min-w-32 w-[100%] h-full flex items-center">
            //                               <img
            //                                 className="w-11 aspect-square rounded-full object-cover"
            //                                 src={`${import.meta.env.VITE_axiosPath}${game.user_p2.profile_pic}`}
            //                                 alt="user-image"
            //                               />
            //                               <div className="mx-3">
            //                                 <h1 className="font-medium text-xs">
            //                                   {game.user_p2.firstName} {game.user_p2.lastName}
            //                                 </h1>
            //                                 <h1 className="font-normal opacity-80 text-xs text-left">
            //                                   {game.user_p2.login || 'N/A'}
            //                                 </h1>
            //                               </div>
            //                             </div>
            //                             <div>
            //                                 {findUser !== 'userDown' && game.type === "CHESS" ? (
            //                                   matchResult === 'win' ? 'Lose' : matchResult === 'lose' ? 'Win' : 'Draw'
            //                                 ) : findUser === 'userDown' && game.type === "CHESS" ? (
            //                                   matchResult === 'win' ? 'Win' : matchResult === 'lose' ? 'Lose' : 'Draw'
            //                                 ) : (
            //                                   game.score_p2
            //                                 )}
            //                               </div>
            //                           </div>
            //                         </div>
            //                       </div>

            //                       {/* Separator Line Between Matches */}
            //                       {index < data.length - 1 && (
            //                         <div className="w-full border-t border-[#5E97A9] rounded-full my-3"></div>
            //                       )}
            //                     </React.Fragment>
            //                   );
            //                 })}
            //               </div>
            //           </div>

            //         </div>
            //      </div>      