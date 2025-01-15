import React from 'react';
import Skeleton from "react-loading-skeleton";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"


function SkeletonDashboard() {
  return (
    <>
       <div className="font-poppins pb-20 dashboard-container  md:h-[1700px] xl:h-[1200px] 2xl:h-[1150px] text-white w-[90%] lg:w-[calc(100%-160px)] my-[20px] lg:p-10 lg:pt-0 lg:mx-[50px] absolute top-[80px] left-[50%] -translate-x-[50%] lg:-translate-x-0 lg:left-[80px] grid md:grid-cols-12 md:grid-rows-12 xl:grid-cols-12 xl:grid-rows-11 2xl:grid-cols-12 2xl:grid-rows-12 gap-4 ">
        <div className="row-span-1 flex justify-center items-center md:col-span-12 md:row-span-4 xl:col-span-8 xl:row-span-4 2xl:col-span-9 2xl:row-span-6 xxl:col-span-6">
            <div className="rounded-lg 2xl:pt-4 flex gap-2 w-full h-full">
              <div className="text-white w-full">
                <div className="flex items-center justify-center w-full p-4 h-full 2xl:p-10 bg-gradient-to-br from-[#283137] to-[#242729] shadow-3xl shadow-[#22333869] sh rounded-2xl">
                  <div className="w-full h-full grid grid-rows-2 gap-4">
                    {/* Cover Image Skeleton */}
                    <div className="relative bg-cover bg-center px-5 lg:px-10 rounded-3xl grid grid-rows-2">
                      <Skeleton
                        height="100%"
                        style={{ borderRadius: "24px" }}
                        containerClassName="absolute inset-0"
                      />

                      {/* Name Placeholder */}
                      <div className="h-20 flex items-center 2xl:items-end px-4">
                        <Skeleton
                          width={120}
                          height={32}
                          style={{ borderRadius: "16px" }}
                        />
                      </div>

                      {/* Level Placeholder */}
                      <div className="flex flex-col justify-center items-center mb-7 gap-3">
                        <Skeleton width={80} height={24} />
                        <div className="h-3 w-full bg-[#444444] rounded-full relative">
                          <Skeleton
                            height="100%"
                            style={{ borderRadius: "8px" }}
                            containerClassName="absolute inset-0"
                          />
                          <div
                            className="absolute inset-y-0 left-0 bg-[#5E97A9] rounded-full"
                            style={{ width: "53%" }}
                          ></div>
                        </div>
                      </div>
                    </div>

                    {/* Achievements Skeleton */}
                    <ScrollArea className="w-full verflow-x-scroll   whitespace-nowrap rounded-md">
                              <div className="flex  gap-4 justify-center">
                              <Skeleton   className="rounded-xl bg-gradient-to-br from-[#242b2f] to-[#1b1e1f]  shadow-md p-3  mt-6 h-32 w-32  xxl:h-48 xxl:w-48 " />
                              <Skeleton   className="rounded-xl bg-gradient-to-br from-[#242b2f] to-[#1b1e1f]  shadow-md p-3  mt-6 h-32 w-32  xxl:h-48 xxl:w-48 " />
                              <Skeleton   className="rounded-xl bg-gradient-to-br from-[#242b2f] to-[#1b1e1f]  shadow-md p-3  mt-6 h-32 w-32  xxl:h-48 xxl:w-48 " />
                              <Skeleton   className="rounded-xl bg-gradient-to-br from-[#242b2f] to-[#1b1e1f]  shadow-md p-3  mt-6 h-32 w-32  xxl:h-48 xxl:w-48 " />
                              <Skeleton   className="rounded-xl bg-gradient-to-br from-[#242b2f] to-[#1b1e1f]  shadow-md p-3  mt-6 h-32 w-32  xxl:h-48 xxl:w-48 " />
                              <Skeleton   className="rounded-xl bg-gradient-to-br from-[#242b2f] to-[#1b1e1f]  shadow-md p-3  mt-6 h-32 w-32  xxl:h-48 xxl:w-48 " />
                              <Skeleton   className="rounded-xl bg-gradient-to-br from-[#242b2f] to-[#1b1e1f]  shadow-md p-3  mt-6 h-32 w-32  xxl:h-48 xxl:w-48 " />
                              <Skeleton   className="rounded-xl bg-gradient-to-br from-[#242b2f] to-[#1b1e1f]  shadow-md p-3  mt-6 h-32 w-32  xxl:h-48 xxl:w-48 " />
                              <Skeleton   className="rounded-xl bg-gradient-to-br from-[#242b2f] to-[#1b1e1f]  shadow-md p-3  mt-6 h-32 w-32  xxl:h-48 xxl:w-48 " />

                                  </div>
                      </ScrollArea>
                  </div>
                </div>
              </div>
            </div>
        </div>
                  {/* match history  */}
        <div className="hidden xxl:block xl:col-span-4  xl:row-span-6 2xl:col-span-3 2xl:row-span-6 pt-4">
          <div className="rounded-2xl bg-gradient-to-tr  from-[#2f3a41] to-[#2B2F32] shadow-3xl shadow-[#22333869] h-full p-4">
                    <div className="flex flex-col space-y-4 h-full">
                      <Skeleton width="60%" height={24} className="mb-4" />
                      <div className="row-span-2  px-6 flex items-center justify-between w-full">
                  <div className="flex items-center justify-center p-4  flex-col gap-3">
                    <Skeleton circle={true} height={100} width={100} />
                    <Skeleton width={80} height={20} />
                  </div>
                  
                  <div>
                    <Skeleton width={60} height={30} />
                  </div>
            
                  <div className="flex items-center justify-center flex-col gap-3">
                    <Skeleton circle={true} height={100} width={100} />
                    <Skeleton width={80} height={20} />
                  </div>
                </div>
                      {/* Skeleton for Match Items */}
                      <div className="pt-2 row-span-4">
                  <h1 className="text-base text-gray-400 font-medium"></h1>
                  <div className="w-full border-t border-[#5E97A9] rounded-full my-3 mt-1"></div>
                  <div className="h-40 xxl:h-60 overflow-y-auto px-5">
                    {[...Array(5)].map((_, index) => (
                      <div
                        key={index}
                        className="w-full mb-4 flex items-center bg-gradient-to-bl from-[#242b2f] to-[#1b1e1f] gap-4 shadow-lg rounded-lg py-4"
                      >
                        <div className="bg-gradient-to-b from-[#84D679] via-[#598752] to-[#2D392C] w-1 h-16 rounded-r-lg"></div>
                        <div className="w-full mr-4">
                          <div className="flex items-center">
                            <div className="min-w-32 w-[100%] h-full flex items-center">
                              <Skeleton circle={true} height={44} width={44} />
                              <div className="mx-3">
                                <Skeleton width={100} height={16} />
                                <Skeleton width={70} height={12} />
                              </div>
                            </div>
                            <div>
                              <Skeleton width={24} height={24} />
                            </div>
                          </div>
                          <div className="w-full border-t border-[#5E97A9] rounded-full my-4"></div>
                          <div className="flex items-center">
                            <div className="min-w-32 w-[100%] h-full flex items-center">
                              <Skeleton circle={true} height={44} width={44} />
                              <div className="mx-3">
                                <Skeleton width={100} height={16} />
                                <Skeleton width={70} height={12} />
                              </div>
                            </div>
                            <div>
                              <Skeleton width={24} height={24} />
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                    </div>
          </div>
        </div>
        {/* online friends */}
        <div className=" row-span-4 hidden xl:block xl:col-span-4 xl:row-span-7 2xl:col-span-3 2xl:row-span-7  2xl:pt-4 ">
              <div className="rounded-2xl bg-gradient-to-br from-[#283137] to-[#242729] h-full p-7">
                <div className="flex flex-col gap-4 h-full">
                  {/* Placeholder for Match History Title */}
                  <Skeleton width="60%" height={32} style={{ borderRadius: "8px" }} />

                  {/* Placeholder for Match List */}
                  <div className="flex flex-col gap-4">
                    {Array(7)
                      .fill(0)
                      .map((_, index) => (
                        <div
                          key={index}
                          className="flex items-center gap-4 w-full"
                        >
                          {/* Profile Image Placeholder */}
                          <Skeleton
                            circle
                            height={50}
                            width={50}
                          />
                          {/* Match Details Placeholder */}
                          <div className="flex flex-col flex-grow">
                            <Skeleton width="80%" height={20} />
                            <Skeleton width="50%" height={16} />
                          </div>
                          {/* Match Result Placeholder */}
                          <Skeleton width={40} height={20} />
                        </div>
                      ))}
                  </div>
                </div>
              </div>
                 
        </div>
        {/* linechart */}
        <div className="row-span-4 md:col-span-12 md:row-span-4 rounded-2xl p-4 shadow-3xl shadow-[#22333869] bg-gradient-to-tr from-[#2f3a41] to-[#2B2F32] xl:col-span-8 xl:row-span-3 2xl:col-span-5 2xl:row-span-6 xxl:col-span-6">
          <div className="w-full h-full bg-gradient-to-br from-[#242b2f] to-[#1b1e1f] flex flex-col justify-center items-center pb-7 pt-4 px-4 rounded-2xl">
                  {/* <Skeleton height={200} width="100%" /> */}
                  <div className="border-none h-full w-full rounded-lg shadow-md">
                <div className="p-2">
                  <Skeleton height={20} width="50%" />
                  <Skeleton height={16} width="30%" style={{ marginTop: "8px" }} />
                </div>
                <div className="p-4 flex items-center justify-center w-full h-[90%]">
                  <div className="w-full h-64 md:h-full p-3">
                    <Skeleton height="100%" width="100%" className="h-min-[100px] rounded-xl" />
                  </div>
                </div>
              </div>
          </div>
        </div>
        {/* rank file */}
        <div className="row-span-4 md:col-span-6 md:row-span-4 xl:col-span-4 xl:row-span-4 2xl:col-span-4 2xl:row-span-6 xxl:col-span-3">
            <div className="w-full h-full rounded-2xl p-4 shadow-3xl shadow-[#22333869] bg-gradient-to-br from-[#283137] to-[#242729]">
              <div className="rounded-2xl bg-gradient-to-br from-[#283137] to-[#242729] h-full">
                <div className="flex flex-col gap-4 h-full">
                  {/* Placeholder for Match History Title */}
                  <Skeleton width="60%" height={32} style={{ borderRadius: "8px" }} />

                  {/* Placeholder for Match List */}
                  <div className="flex flex-col overflow-y-auto gap-4">
                    {Array(6)
                      .fill(0)
                      .map((_, index) => (
                        <div
                          key={index}
                          className="flex items-center gap-4 w-full"
                        >
                          {/* Profile Image Placeholder */}
                          <Skeleton
                            circle
                            height={50}
                            width={50}
                          />
                          {/* Match Details Placeholder */}
                          <div className="flex flex-col flex-grow">
                            <Skeleton width="80%" height={20} />
                            <Skeleton width="50%" height={16} />
                          </div>
                          {/* Match Result Placeholder */}
                          <Skeleton width={40} height={20} />
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            </div>
        </div>
        {/* radar chart */}
        <div className="2xl:px-7 row-span-4 md:col-span-6 md:row-span-4 xl:col-span-4 xl:row-span-4 2xl:col-span-3 2xl:row-span-5">
          <div className="rounded-2xl bg-gradient-to-tr from-[#2f3a41] to-[#2B2F32] h-full w-full flex items-center justify-center p-4">
           <div className="relative flex flex-col bg-gradient-to-bl rounded-xl  from-[#242b2f] to-[#1b1e1f] gap-3 items-center justify-center w-full h-full">
                     <Skeleton   className=" w-52 h-7 rounded-lg"/>
                     <Skeleton   className=" w-28 h-7 rounded-lg"/>
                     <Skeleton   className=" w-52 h-7 rounded-lg"/>
                   </div>
          </div>
        </div>
        <div className="xl:pr-5 row-span-2  md:col-span-6 md:row-span-4 xl:col-span-4 xl:row-span-4 2xl:col-span-3 2xl:row-span-5 2xl:hidden">
            <div className="rounded-2xl overflow-y-auto bg-gradient-to-tr from-[#2f3a41] to-[#2B2F32] shadow-3xl shadow-[#22333869] h-full p-4">
                        <div className="flex flex-col space-y-4 h-full">
                          <Skeleton width="60%" height={24} className="mb-4" />
                          <div className="row-span-2  px-6 flex items-center justify-between w-full">
                      <div className="flex items-center justify-center p-4  flex-col gap-3">
                        <Skeleton circle={true} height={100} width={100} />
                        <Skeleton width={80} height={20} />
                      </div>
                      
                      <div>
                        <Skeleton width={60} height={30} />
                      </div>
                
                      <div className="flex items-center justify-center flex-col gap-3">
                        <Skeleton circle={true} height={100} width={100} />
                        <Skeleton width={80} height={20} />
                      </div>
                    </div>
                          {/* Skeleton for Match Items */}
                    <div className="pt-2 row-span-4">
                      <h1 className="text-base  text-gray-400 font-medium"></h1>
                      <div className="w-full border-t border-[#5E97A9] rounded-full my-3 mt-1"></div>
                      <div className="h-40  xxl:h-60 overflow-y-auto px-5">
                        {[...Array(5)].map((_, index) => (
                          <div
                            key={index}
                            className="w-full mb-4 flex items-center bg-gradient-to-bl from-[#242b2f] to-[#1b1e1f] gap-4 shadow-lg rounded-lg py-4"
                          >
                            <div className="bg-gradient-to-b from-[#84D679] via-[#598752] to-[#2D392C] w-1 h-16 rounded-r-lg"></div>
                            <div className="w-full mr-4">
                              <div className="flex items-center">
                                <div className="min-w-32 w-[100%] h-full flex items-center">
                                  <Skeleton circle={true} height={44} width={44} />
                                  <div className="mx-3">
                                    <Skeleton width={100} height={16} />
                                    <Skeleton width={70} height={12} />
                                  </div>
                                </div>
                                <div>
                                  <Skeleton width={24} height={24} />
                                </div>
                              </div>
                              <div className="w-full border-t border-[#5E97A9] rounded-full my-4"></div>
                              <div className="flex items-center">
                                <div className="min-w-32 w-[100%] h-full flex items-center">
                                  <Skeleton circle={true} height={44} width={44} />
                                  <div className="mx-3">
                                    <Skeleton width={100} height={16} />
                                    <Skeleton width={70} height={12} />
                                  </div>
                                </div>
                                <div>
                                  <Skeleton width={24} height={24} />
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                        </div>
            </div>
        </div>
        <div className="= row-span-4 md:col-span-6 md:row-span-4 xl:col-span-4 xl:row-span-4 2xl:col-span-3 2xl:row-span-5  bg-gradient-to-tr from-[#2f3a41] to-[#2B2F32] rounded-2xl p-4 xl:hidden">
            <div  className="h-full w-full py-6  flex flex-col gap-3 bg-gradient-to-bl from-[#242b2f] to-[#1b1e1f] rounded-xl justify-center items-center">
                <Skeleton width={100} height={16} />
                <Skeleton width={150} height={20} />
                <Skeleton circle={true} height={200} width={200} className="rounded-xl w- w-min-[100px] lg:w-[150px] lg:h-[150px]" />
            </div>
        </div>
       </div>
    </>
  );
}

export default SkeletonDashboard