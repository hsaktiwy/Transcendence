import React from "react";
import { IoSearchOutline } from "react-icons/io5";


function NavBarV2(){
    return(
        <div className=" h-[60px] w-[calc(100%-120px)]  m-[10px] text-white absolute top-0 left-[80px] flex justify-between ">
            <div id="nav-search-bar" className="relative w-[40%]">
                <span className="left-[7%] text-[32px] absolute inline-block ">
                    <IoSearchOutline/>
                </span>
                <input type="text" placeholder="Search" className="text-white rounded-full mx-4 px-4 py-1 w-[50%] focus:w-[90%] absolute left-[10%] outline-none transition-all duration:300 bg-transparent focus:backdrop-filter focus:backdrop-blur-3xl border-[1px] border-white" />
            </div>
            <div className="flex gap-6 bg-[#2B2F32] justify-center items-center rounded-lg self-start p-2">
                <div>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="30" height="30" color="#ffffff" fill="none">
                    <path d="M5.15837 11.491C5.08489 12.887 5.16936 14.373 3.92213 15.3084C3.34164 15.7438 3 16.427 3 17.1527C3 18.1508 3.7818 19 4.8 19H19.2C20.2182 19 21 18.1508 21 17.1527C21 16.427 20.6584 15.7438 20.0779 15.3084C18.8306 14.373 18.9151 12.887 18.8416 11.491C18.6501 7.85223 15.6438 5 12 5C8.35617 5 5.34988 7.85222 5.15837 11.491Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M10.5 3.125C10.5 3.95343 11.1716 5 12 5C12.8284 5 13.5 3.95343 13.5 3.125C13.5 2.29657 12.8284 2 12 2C11.1716 2 10.5 2.29657 10.5 3.125Z" stroke="currentColor" stroke-width="1.5" />
                    <path d="M15 19C15 20.6569 13.6569 22 12 22C10.3431 22 9 20.6569 9 19" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
                </div>
                <div>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="30" height="30" color="#ffffff" fill="none">
                        <path d="M7.5 12H13.5M7.5 8H10.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M8.5 20C9.55038 20.8697 10.8145 21.4238 12.2635 21.5188C13.4052 21.5937 14.5971 21.5936 15.7365 21.5188C16.1288 21.4931 16.5565 21.4007 16.9248 21.251C17.3345 21.0845 17.5395 21.0012 17.6437 21.0138C17.7478 21.0264 17.8989 21.1364 18.2011 21.3563C18.7339 21.744 19.4051 22.0225 20.4005 21.9986C20.9038 21.9865 21.1555 21.9804 21.2681 21.7909C21.3808 21.6013 21.2405 21.3389 20.9598 20.8141C20.5706 20.0862 20.324 19.2529 20.6977 18.5852C21.3413 17.6315 21.8879 16.5021 21.9678 15.2823C22.0107 14.6269 22.0107 13.9481 21.9678 13.2927C21.9146 12.4799 21.7173 11.7073 21.4012 11" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M12.345 17.4868C15.9006 17.2526 18.7328 14.4069 18.9658 10.8344C19.0114 10.1353 19.0114 9.41131 18.9658 8.71219C18.7328 5.13969 15.9006 2.29401 12.345 2.05985C11.132 1.97997 9.86553 1.98013 8.65499 2.05985C5.09943 2.29401 2.26725 5.13969 2.0342 8.71219C1.9886 9.41131 1.9886 10.1353 2.0342 10.8344C2.11908 12.1356 2.69992 13.3403 3.38372 14.3576C3.78076 15.0697 3.51873 15.9586 3.10518 16.735C2.807 17.2948 2.65791 17.5747 2.77762 17.7769C2.89732 17.9791 3.16472 17.9856 3.69951 17.9985C4.75712 18.024 5.47028 17.7269 6.03638 17.3134C6.35744 17.0788 6.51798 16.9615 6.62862 16.9481C6.73926 16.9346 6.957 17.0234 7.39241 17.2011C7.78374 17.3608 8.23812 17.4593 8.65499 17.4868C9.86553 17.5665 11.132 17.5666 12.345 17.4868Z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round" />
                    </svg>
                </div>
                <div>
                    <img src="./src/assets/profiles/1.jpg" alt="user-pic" className="w-[30px] h-[30px] rounded-full" />
                </div>
                <div>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="30" height="30" color="#ffffff" fill="none">
                        <path d="M18 9.00005C18 9.00005 13.5811 15 12 15C10.4188 15 6 9 6 9" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                </div>
            </div>
        </div>
    )
}

export default NavBarV2