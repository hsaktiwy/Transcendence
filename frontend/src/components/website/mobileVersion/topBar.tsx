import React from "react";
import '../components-Profile/style-component.css'
import SideBar  from'../components-Profile/side-bar.tsx'
import SearchInfoProfile from '../components-Profile/serach-infos-profile.tsx'

import ProfileOverView from '../components-Profile/ProfileOverView'
import StatsComponent from '../components-Profile/statsComponents'
import MobileVersion from "./mobileVersion.tsx";
import DesktopVersion from "./desktopVersion.tsx";
import SearchNavBar from '../components-Profile/nav-bar-search.tsx'
import TabletVersion from "./tabletVersion.tsx";
import SideBarTablet from "./side_bar_tablet.tsx";
import LaptopVersion from "./laptopVersion.tsx";
function TopBar()
{
    return(
        <>
            {/* <div className="m-4  grid  gap-2 md:grid-cols-12 lg:grid-cols-13 xl:grid-cols-11">
                <div className="min-h-[69px] rounded-lg bg-[#2B2F32]  md:col-span-2 lg:col-span-1 xl:col-span-2  xl:max-w-36">
                    <div className="m-3">
                        <svg className="fill-current  text-white size-10"  xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                        </svg>

                    </div>


                </div>
                <div className="min-h-[100vh] rounded-lg bg-[#2B2F32]  md:col-span-10 lg:col-span-11 xl:col-span-10 ">

                </div>
            </div> */}
            <div className=" m-4 gap-2 flex flex-col md:flex-row h-screen text-white">
                    {/* <aside className="    text-white  w-full md:w-36  md:fixed md:m-4  md:top-0 md:left-0 md:bottom-0">
                        <SideBarTablet/>
                        <div className="hidden h-full w-full  2xl:block ">
                            <SideBar/>
                        </div>
                    </aside> */}
            
                    <main className=" border-[1px] border-black flex-1  rounded-lg mb-5  md:ml-32">

                        <MobileVersion/>
                        <TabletVersion/>
                        <LaptopVersion/>
                        <DesktopVersion/>
                        
                    </main>
            </div>
        </>
    )
}
export default TopBar 