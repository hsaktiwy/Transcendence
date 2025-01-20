
import React, { useContext }  from "react";

import { axiosPath ,BACKEND } from "../utils/Constants";
import mailman from "../utils/AxiosFetcher";

import { UserContext } from "./UserContext";


 
export function MatchHistory({ userMatchHistory }: { userMatchHistory: any }) {

  
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
    console.log('user here ->>>> ', userMatchHistory.Game)
    const Matches = userMatchHistory.Game;

    const profiles = [
      {
        id: 1,
        name: "Hamza Chahboune",
        username: "@hachahbo",
        count1: 4,
        count2: 6,
        gradient: "from-[#84D679] via-[#598752] to-[#2D392C]",
      },
      {
        id: 2,
        name: "Hamza Chahboune",
        username: "@hachahbo",
        count1: 4,
        count2: 6,
        gradient: "from-[#E45959] via-[#875252] to-[#392C2C]",
      },
      {
        id: 3,
        name: "Hamza Chahboune",
        username: "@hachahbo",
        count1: 4,
        count2: 6,
        gradient: "from-[#E45959] via-[#875252] to-[#392C2C]",
      },
    ];
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
      
      // // Call the function
      // fetchUserMatchHistory();
    return (
  <>
              <div className="text-2xl  h-full w-full  rounded-2xl bg-gradient-to-br from-[#242b2f] to-[#1b1e1f]  shadow-lg  font-semibold flex flex-col justify-center items-center p-4">
                    <div className="p-3  w-full h-full grid grid-rows-6 ">
                      <div className="row-span-2  px-6 flex items-center justify-between w-full">
                          <div className="flex items-center justify-center flex-col gap-3">
                              <img className="size-14 lg;size-18  xxl:size-24 rounded-full aspect-square  object-cover" src={`${axiosPath}${Matches[0].user_p1.profile_pic}`} alt="user-image" />
                              <div className="text-base font-medium xxl:text-base ">{` ${Matches[0].user_p1.firstName}`}</div>
                           </div>
                          <div className="">
                            <h1 className="text-xl  xxl:text-3xl" >4 - 6</h1>
                          </div>
                          <div className="flex items-center justify-center flex-col gap-3">
                          <img className="size-14 lg;size-18  xxl:size-24 rounded-full aspect-square  object-cover" src={`${axiosPath}${Matches[0].user_p2.profile_pic}`} alt="user-image" />
                              <div className="text-base font-medium  xxl:text-base ">{` ${Matches[0].user_p2.firstName}`}</div>
                           </div>
                      </div>
                      <div className="  row-span-4  pt-2 ">
                          <h1 className="text-base   text-gray-400 font-medium   "> Last 5 matches</h1>
                          <div className="  w-full  border-t border-[#5E97A9] rounded-full my-3 mt-1"></div>
                          <div className="h-40 xxl:h-60 overflow-y-auto px-5">
                            {userMatchHistory.Game.map((game:any, index:any) => (
                              <React.Fragment key={game.id}>
                                <div className="w-full mb-4 flex items-center bg-gradient-to-bl from-[#242b2f] to-[#1b1e1f] gap-4 shadow-lg rounded-lg py-4">
                                  <div
                                    className={`bg-gradient-to-b ${
                                      index % 2 === 0 ? 'from-[#84D679] via-[#598752] to-[#2D392C]' : 'from-[#E45959] via-[#875252] to-[#392C2C]'
                                    } w-1 h-16 rounded-r-lg`}
                                  ></div>
                                  <div className="w-full mr-4">
                                    <div className="flex items-center">
                                      <div className="min-w-32 w-[100%] h-full flex items-center">
                                            <img className="w-11 aspect-square rounded-full object-cover"  src={`${axiosPath}${game.loser.profile_pic}`} alt="user-image" />
                                        <div className="mx-3">
                                          <h1 className="font-medium text-xs">{game.loser.firstName} {game.loser.lastName}</h1>
                                          <h1 className="font-normal opacity-80 text-xs text-left">
                                            {game.loser.login || 'N/A'}
                                          </h1>
                                        </div>
                                      </div>
                                      <div> {game.score_p1}</div>
                                    </div>
                                    <div className="w-full border-t border-[#5E97A9] rounded-full my-4"></div>
                                    <div className="flex items-center">
                                      <div className="min-w-32 w-[100%] h-full flex items-center">
                                            <img className="w-11 aspect-square rounded-full object-cover"  src={`${axiosPath}${game.winner.profile_pic}`} alt="user-image" />
                                        <div className="mx-3">
                                          <h1 className="font-medium text-xs">{game.winner.firstName} {game.winner.last}</h1>
                                          <h1 className="font-normal opacity-80 text-xs text-left">
                                            {game.winner.login || 'N/A'}
                                          </h1>
                                        </div>
                                      </div>
                                      <div>{game.score_p2}</div>
                                    </div>
                                  </div>
                                </div>
                                {index < userMatchHistory.Game.length - 1 && (
                                  <div className="w-full border-t border-[#5E97A9] rounded-full my-3"></div>
                                )}
                              </React.Fragment>
                            ))}
                          </div>
                      </div>

                    </div>
                 </div>      
  </>
  )
}