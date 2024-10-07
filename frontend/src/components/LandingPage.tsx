import React from "react";

import {motion} from 'framer-motion';


function LandingPage(){

    return(
        <div className="   px-[100px] min-h-[100vh] py-4 bg-[#070320] font-poppins">
            <div className="h-[100vh]">
                <div className="nav-container  flex justify-between my-8">
                    <div className="logo mx-4 text-4xl font-bold text-white">
                        LOGO
                    </div>
                    <ul className="flex gap-3  items-center text-xl font-semibold">
                        <li className="px-8 py-3 text-white/80 opacity-80 duration-75 hover:opacity-100 cursor-pointer">Sign up</li>
                        <li className="px-8 py-3 bg-[#5E97A9] rounded-md text-white opacity-80 duration-75 hover:opacity-100  cursor-pointer">Login</li>
                    </ul>
                </div>

                <motion.div
                initial={{ y: '-100vh'}}
                animate={{ y: 0}}
                transition={{ duration: 0.5 , type: 'spring', stiffness: 150}}
                className=" mt-[150px] header-section-container flex justify-evenly  items-center gap-10 ">
                    <div className="header-text-container text-white w-[485px] flex flex-col gap-8">
                        <h1
                        className="  text-5xl font-bold leading-[55px] tracking-wider">Two Games,<br/>Infinite Fun !</h1>
                        <p className="text-[16px] leading-8 text-lg tracking-wider">
                        Ready for a challenge? Whether you want to test your reflexes with fast-paced Ping Pong or sharpen your strategy with Chess, our platform has it all. Compete with players worldwide, climb the leaderboards, and become a master of both speed and strategy. With real-time matches and global tournaments, every game is a chance to prove your skills.
                        </p>
                        <div className=" mt-10 py-3  bg-gradient-to-r from-[#5e97a9] to-[#0e769f] w-[195px] font-medium rounded-full text-center opacity-85 hover:opacity-100 duration-75 cursor-pointer text-xl tracking-widest">
                            Get Started
                        </div>
                    </div>
                    <div className="">
                        <img src="Switch.png" alt="game-console" />
                    </div>
                </motion.div>
            </div> 
            <div className="   text-center pt-8 ">
                    <h1 className="text-5xl text-white font-bold">
                        Key Features
                    </h1>

                    <div className="features-container  mt-[100px] flex flex-col gap-[50px] justify-center mx-[500px]">
                        <div className="  w-[600px] h-[550px] border-[2px] border-[#5E97A9]/50 rounded-tl-[40px] rounded-br-[40px] rounded-tr-none rounded-bl-none self-start p-4 flex">
                                <div className="w-[180px] h-[180px]">
                                    <img src="target-front-color.png" alt="icon" className="w-full h-full"/>
                                </div>
                                
                                <h1 className="text-white text-3xl">Local and Remote Game Play</h1>
                        </div>
                        <div className="  w-[600px] h-[550px] border-2 border-[#5E97A9]/50 rounded-tl-[40px] rounded-br-[40px] rounded-tr-none rounded-bl-none self-end">

                        </div>
                        <div className="  w-[600px] h-[550px] border-2 border-[#5E97A9]/50 rounded-tl-[40px] rounded-br-[40px] rounded-tr-none rounded-bl-none self-start">

                        </div>
                        <div className="  w-[600px] h-[550px] border-2 border-[#5E97A9]/50 rounded-tl-[40px] rounded-br-[40px] rounded-tr-none rounded-bl-none self-end">

                        </div>

                    </div>
            </div>

        </div>
    )
}



export default LandingPage