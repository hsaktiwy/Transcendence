import React from "react";
import '../components-Profile/style-component.css'
import SideBar  from'../components-Profile/side-bar.tsx'
import SearchInfoProfile from '../components-Profile/serach-infos-profile.tsx'

function mobileVersion()
{
    return(
        <>
            <div className=" bg-[#2B2F32] h-[570px] rounded-lg  md:hidden flex flex-col justify-center">
                <img style={{width: '220px'}} className="size-image m-auto my-4" src="/images/Frame 28.svg" />
                <div className="  bg-[#1D1E22] pt-8 h-80 flex rounded-t-3xl rounded-b-l flex-col ">
                    <h1 className="font-bold text-xl m-auto my-1"> Hamza Chahboune</h1>
                    <h1 className="font-light text-l m-auto my-0"> @hachahbo</h1>
                    <h1 className="font-semibold text-lg m-auto my-0"> 53%</h1>
                    <div className="mt-2">
                        <div className='blank-level h-4'>
                        <div className='score-level'></div>
                        </div>
                        <div className=" flex flex-col h-16 my-4">
                            <img style={{width: '30px'}} className="m-auto block" src="/images/Crown.svg" />
                            <h1 className="font-semibold text-lg m-auto">#1</h1>
                        </div>
                        <button className=" flex items-center justify-center font-bold bg-[#5E97A9] h-12 w-44 rounded-full m-auto p-auto my-5">Connect</button> 
                        </div>
                    </div>
                </div>
                <div className="bg-[#1D1E22]   h-[350px]   md:hidden flex  justify-center">
                    <div className=" size-80 bg-[#2B2F32] rounded-lg flex justify-center items-center">
                        <img  className="size-72 " src="./images/chart1.svg" alt="" />
                        </div>
                </div >
                <div className="bg-[#1D1E22]   h-[350px]   md:hidden flex  justify-center">
                    <div className=" size-80 bg-[#2B2F32] rounded-lg flex justify-center items-center">
                        <img  className="size-72 " src="./images/chart2.svg" alt="" />
                    </div>
                </div >
                <div className="bg-[#1D1E22] mb-4  h-[350px]  rounded-b-3xl md:hidden flex  justify-center">
                    <div className=" size-80 bg-[#2B2F32] rounded-lg flex justify-center items-center">
                        <img  className="size-72 " src="./images/Frame 32.svg" alt="" />
                    </div>
            </div >
        </>
    )
}
export default mobileVersion