import React from "react";
// import './style-component.css'

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
     <div className="flex flex-col md:flex-row h-screen">
      {/* Sidebar */}
      <aside className="bg-gray-800 text-white w-full md:w-44 py-8 md:py-0 md:fixed md:top-0 md:left-0 md:bottom-0">
        {/* Sidebar content */}
        {/* Replace with your sidebar content */}
        Sidebar
      </aside>
      
      {/* Main Content (Dashboard) */}
      <main className="flex-1 bg-gray-200">
        {/* Dashboard content */}
        {/* Replace with your dashboard content */}
        Dashboard
      </main>
    </div>
        </>
    )
}
export default TopBar 