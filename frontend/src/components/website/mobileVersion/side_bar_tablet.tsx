import React from "react";
import '../components-Profile/style-component.css'
import SideBar  from'../components-Profile/side-bar.tsx'
import SearchInfoProfile from '../components-Profile/serach-infos-profile.tsx'

function SideBarTablet()
{
    return(
        <>
            <div  className=" flex items-center  h-16 rounded-lg bg-[#2B2F32]  justify-between  md:hidden">
                            <div className="px-3">
                                    <svg className="fill-current  text-white size-10"  xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                                    </svg>
                            </div>
                            <div className='nav-bar-div   m-4 '>
                            <div className='nav-bar  bg-[#1D1E22]'>
                                <img className="size-image" src="/images/Notification.svg" />
                                <img className="size-image" src="/images/Message.svg" />
                                <img style={{width: '30px'}} className="size-image" src="/images/Group 13.svg" />
                            </div>
                        </div>      
                        </div>
                        <div className="hidden 2xl:hidden h-full w-full  md:block ">
                            <div className="w-36  min-w-[150px]">
                                <div className="  side-bar-div  lineRight">
                                    <div className="side-bar-div-grid mt-3  flex items-center justify-center">
                                        <img className="w-20" src="/images/Logo (1).svg" />
                                    </div>
                                    <div className="side-bar-div-grid center-sid-bar">
                                        <div className="div-side-bar-icon">
                                            <img className="w-8  " src="/images/Home.svg" />
                                        </div>
                                        <div className="div-side-bar-icon">
                                            <img className="w-8  " src="/images/Message.svg" />
                                        </div>
                                        <div className="div-side-bar-icon">
                                            <img className="w-8  " src="/images/pong_.svg" />
                                        </div>
                                    </div>
                                    <div className="side-bar-div-grid log-out">
                                        <img src="/images/log-out-new.svg" />
                                    </div>
                                </div>

                            </div>
            </div>
        </>
    )
}
export default SideBarTablet