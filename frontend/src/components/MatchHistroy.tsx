
import React, { useContext }  from "react";

import { axiosPath ,BACKEND } from "../utils/Constants";
import { UserContext } from "./UserContext";


 
export function MatchHistory({ profileData }: { profileData: any }) {

    const userContextConsumer = useContext(UserContext)
    if (!userContextConsumer)
        throw new Error("userContext must be used within a UserProvider");
    return (
  <>
                          <div className="text-2xl  h-full w-full  rounded-2xl bg-white/5  backdrop-filter backdrop-blur-sm  font-semibold flex flex-col justify-center items-center p-4">
                    <div className="p-3  w-full h-full grid grid-rows-6 ">
                      <div className="row-span-2  px-6 flex items-center justify-between w-full">
                          <div className="flex items-center justify-center flex-col gap-3">
                              <img className="size-14 lg;size-18  xxl:size-24 rounded-full aspect-square  object-cover" src={`${axiosPath}${profileData?.profile_pic}`} alt="user-image" />
                              <div className="text-base font-medium xxl:text-base ">{` ${profileData?.firstName}`}</div>
                           </div>
                          <div className="">
                            <h1 className="text-xl  xxl:text-3xl" >4 - 6</h1>
                          </div>
                          <div className="flex items-center justify-center flex-col gap-3">
                              <img className="size-14   xxl:size-24 aspect-square rounded-full object-cover" src={`${axiosPath}${profileData?.profile_pic}`} alt="user-image" />
                              <div className="text-base font-medium  xxl:text-base ">{` ${profileData?.firstName}`}</div>
                           </div>
                      </div>
                      <div className="  row-span-4  pt-2 ">
                          <h1 className="text-base   text-gray-400 font-medium   "> Last 5 matches</h1>
                          <div className="  w-full  border-t border-[#5E97A9] rounded-full my-3 mt-1"></div>
                          <div className="h-40 xxl:h-60 overflow-y-auto px-5">
                            
                                  <div className="w-full mb-4 flex items-center  bg-gradient-to-bl from-[#242b2f] to-[#1b1e1f] gap-4  shadow-lg rounded-lg py-4 ">
                                      <div className=" bg-gradient-to-b  from-[#84D679] via-[#598752] to-[#2D392C]  w-1 h-16 rounded-r-lg ">
                                      </div>
                                      <div className="  w-full mr-4">
                                        <div className=" flex  items-center">
                                              <div className="min-w-32 w-[100%] h-full  flex items-center">
                                                  <img className="w-11 rounded-full aspect-square rounded-full object-cover" src={`${axiosPath}${profileData?.profile_pic}`} alt="user-image" />
                                                      <div className="mx-3">
                                                        <h1 className="font-medium text-xs">Hamza Chahboune</h1>
                                                        <h1 className="font-normal opacity-80 text-xs text-left">@hachahbo</h1>
                                                      </div>
                                              </div>
                                              <div>4</div>
                                        </div>
                                        <div className="  w-full  border-t border-[#5E97A9] rounded-full my-4"></div>
                                        <div className="flex  items-center">
                                              <div className="min-w-32 w-[100%] h-full  flex items-center">
                                                  <img className="w-11 rounded-full aspect-square rounded-full object-cover" src={`${axiosPath}${profileData?.profile_pic}`} alt="user-image" />
                                                      <div className="mx-3">
                                                        <h1 className="font-medium text-xs">Hamza Chahboune</h1>
                                                        <h1 className="font-normal opacity-80 text-xs text-left">@hachahbo</h1>
                                                      </div>
                                              </div>
                                              <div>6</div>
                                        </div>
                                      </div>
                                  </div>

                                  <div className="  w-full  border-t border-[#5E97A9] rounded-full my-3"></div>
                                  
                                  <div className="w-full  flex items-center  bg-gradient-to-bl from-[#242b2f] to-[#1b1e1f] gap-4 shadow-lg rounded-lg py-4 ">
                                      <div className=" bg-gradient-to-b from-[#E45959] via-[#875252] to-[#392C2C]  w-1 h-16 rounded-r-lg ">
                                      </div>
                                      <div className="  w-full mr-4">
                                        <div className=" flex  items-center">
                                              <div className="min-w-32 w-[100%] h-full  flex items-center">
                                                  <img className="w-11 aspect-square rounded-full object-cover" src={`${axiosPath}${profileData?.profile_pic}`} alt="user-image" />
                                                      <div className="mx-3">
                                                        <h1 className="font-medium text-xs">Hamza Chahboune</h1>
                                                        <h1 className="font-normal opacity-80 text-xs text-left">@hachahbo</h1>
                                                      </div>
                                              </div>
                                              <div>4</div>
                                        </div>
                                        <div className="  w-full  border-t border-[#5E97A9] rounded-full my-4"></div>
                                        <div className="flex  items-center">
                                              <div className="min-w-32 w-[100%] h-full  flex items-center">
                                                  <img className="w-11 aspect-square rounded-full object-cover" src={`${axiosPath}${profileData?.profile_pic}`} alt="user-image" />
                                                      <div className="mx-3">
                                                        <h1 className="font-medium text-xs">Hamza Chahboune</h1>
                                                        <h1 className="font-normal opacity-80 text-xs text-left">@hachahbo</h1>
                                                      </div>
                                              </div>
                                              <div>6</div>
                                        </div>
                                      </div>
                                  </div>
                                  <div className="  w-full  border-t border-[#5E97A9] rounded-full my-3"></div>
                                  
                                  <div className="w-full  flex items-center  bg-gradient-to-bl from-[#242b2f] to-[#1b1e1f] gap-4 shadow-lg rounded-lg py-4 ">
                                      <div className=" bg-gradient-to-b from-[#E45959] via-[#875252] to-[#392C2C]  w-1 h-16 rounded-r-lg ">
                                      </div>
                                      <div className="  w-full mr-4">
                                        <div className=" flex  items-center">
                                              <div className="min-w-32 w-[100%] h-full  flex items-center">
                                                  <img className="w-11 aspect-square rounded-full object-cover" src={`${axiosPath}${profileData?.profile_pic}`} alt="user-image" />
                                                      <div className="mx-3">
                                                        <h1 className="font-medium text-xs">Hamza Chahboune</h1>
                                                        <h1 className="font-normal opacity-80 text-xs text-left">@hachahbo</h1>
                                                      </div>
                                              </div>
                                              <div>4</div>
                                        </div>
                                        <div className="  w-full  border-t border-[#5E97A9] rounded-full my-4"></div>
                                        <div className="flex  items-center">
                                              <div className="min-w-32 w-[100%] h-full  flex items-center">
                                                  <img className="w-11 aspect-square rounded-full object-cover" src={`${axiosPath}${profileData?.profile_pic}`} alt="user-image" />
                                                      <div className="mx-3">
                                                        <h1 className="font-medium text-xs">Hamza Chahboune</h1>
                                                        <h1 className="font-normal opacity-80 text-xs text-left">@hachahbo</h1>
                                                      </div>
                                              </div>
                                              <div>6</div>
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