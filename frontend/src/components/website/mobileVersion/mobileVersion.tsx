import React from "react";
import '../components-Profile/style-component.css'
import SideBar  from'../components-Profile/side-bar.tsx'
import SearchInfoProfile from '../components-Profile/serach-infos-profile.tsx'

function mobileVersion()
{
    return(
        <>
            <div className=" bg-[#2B2F32] rounded-lg  md:hidden flex flex-col justify-center">
                <img style={{width: '220px'}} className="size-image m-auto my-4" src="/images/profile-gray (1).svg" />
                <div className="  pt-8  flex rounded-t-3xl rounded-b-l flex-col ">
                    <h1 className="font-bold text-xl m-auto my-1"> Hamza Chahboune</h1>
                    <h1 className="font-light text-l m-auto my-0"> @hachahbo</h1>
                    <h1 className="font-semibold text-lg m-auto my-0"> 53%</h1>
                    <div className=" mt-2">
                        <div className='blank-level h-4'>
                        <div className='score-level'></div>
                        </div>
                        <button className=" flex items-center justify-center font-bold bg-[#5E97A9] h-12 w-44 rounded-full m-auto p-auto my-5">Connect</button> 
                        </div>
                        <div className="grid grid-cols-2 gap-4 p-8">
                            <div className="cardv grid-cols-2">
                                <div className="h-3/5">
                                    <div className="h-full bg-[#2B2F32] rounded-xl w-[65%] flex flex-col justify-center items-center">
                                        <h1 className="text-2xl font-medium text-[#5E97A9] ">42</h1>
                                        <h1 className="text-sm font-medium">Wins</h1>
                                    </div>
                                </div>
                                    <div className="h-2/5 flex justify-center items-center">
                                        <div className="w-[65%] h-[100%]  flex gap-2 flex-col justify-center items-center">
                                            <div className="w-[80%] border rounded-full border-b-[2px]"></div>
                                            <div className="w-[80%] border rounded-full border-b-[2px]"></div>
                                            <div className="w-[80%] border rounded-full border-b-[2px]"></div>
                                        </div>
                                        <div className="w-[35%] h-[100%] flex justify-center items-center ">
                                            <img src="./images/emoji_trophy.svg"/>
                                        </div>
                                    </div>
                                </div>
                            <div className="cardv grid-cols-2">
                                <div className="h-3/5">
                                    <div className="h-full bg-[#2B2F32] rounded-xl w-[65%] flex flex-col justify-center items-center">
                                        <h1 className="text-2xl font-medium text-[#5E97A9] ">42</h1>
                                        <h1 className="text-sm font-medium">Wins</h1>
                                    </div>
                                </div>
                                    <div className="h-2/5 flex justify-center items-center">
                                        <div className="w-[65%] h-[100%]  flex gap-2 flex-col justify-center items-center">
                                            <div className="w-[80%] border rounded-full border-b-[2px]"></div>
                                            <div className="w-[80%] border rounded-full border-b-[2px]"></div>
                                            <div className="w-[80%] border rounded-full border-b-[2px]"></div>
                                        </div>
                                        <div className="w-[35%] h-[100%] flex justify-center items-center ">
                                            <img src="./images/emoji_trophy.svg"/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                    </div>
                </div>
                    <div className="md:hidden my-2 p-4 bg-[#2B2F32] rounded-lg flex justify-center items-center">
                        <img  src="./images/chart1.svg"/>
                        </div>
                {/* <div className="bg-[#1D1E22]   h-[350px]   md:hidden flex  justify-center">
                    <div className=" size-80 bg-[#2B2F32] rounded-lg flex justify-center items-center">
                        <img  className="size-72 " src="./images/chart2.svg" alt="" />
                    </div>
                </div >
                <div className="bg-[#1D1E22] mb-4  h-[350px]  rounded-b-3xl md:hidden flex  justify-center">
                    <div className=" size-80 bg-[#2B2F32] rounded-lg flex justify-center items-center">
                        <img  className="size-72 " src="./images/Frame 32.svg" alt="" />
                    </div> */}
            {/* </div > */}
        </>
    )
}
export default mobileVersion