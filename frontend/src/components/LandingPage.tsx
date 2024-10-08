import React, { useRef } from "react";

import {motion, useScroll} from 'framer-motion';


function LandingPage(){
    const ref = useRef<HTMLDivElement>(null)
    const feature1 = useRef<HTMLDivElement>(null)
    const feature2 = useRef<HTMLDivElement>(null)
    const feature3 = useRef<HTMLDivElement>(null)
    const feature4 = useRef<HTMLDivElement>(null)

    const { scrollYProgress} = useScroll({
        target: [feature1, feature2, feature3, feature4],
        offset: ["0 1", "0.88 1"]
    })
    return(
        <div className="   px-[100px] min-h-[100vh] py-4 bg-gradient-to-b from-[#070320] to-[#5e97a9] font-poppins">
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
            <motion.div ref={ref}
                    className=" text-center pt-8 ">
                    <h1 className="text-6xl text-white font-bold">
                        Key Features
                    </h1>

                    <div className="features-container  mt-[200px] flex flex-col gap-[50px] justify-center mx-[500px]">
                        <motion.div ref={feature1} className="  w-[600px] h-[550px] border-[2px] border-[#b6b4b2] rounded-tl-[40px] rounded-br-[40px] rounded-tr-none rounded-bl-none self-start p-4 flex flex-col items-center  gap-10 ">
                                <div className="flex  flex-col items-center justify-center ">
                                    <div className="w-[180px] h-[180px]">
                                        <img src="target-front-color.png" alt="icon" className="w-full h-full"/>
                                    </div>
                                    <h1 className="text-white text-3xl font-semibold ">Local and Remote Game Play</h1>
                                </div>
                                <div className="text-white/80 text-center tracking-wider ">
                                    <p>Experience the thrill of competition right at your fingertips! Our Local Gameplay feature allows you to challenge friends and family in real-time, whether you're facing off in an intense ping pong match or a strategic chess battle. With a seamless interface and easy access to game settings, you can enjoy hours of fun together, fostering connection and friendly rivalry. Get ready to rally and strategize—let the games begin!</p>
                                </div>
                        </motion.div>
                        <motion.div ref={feature2} className="  w-[600px] h-[550px] border-[2px] border-[#b6b4b2] rounded-tl-[40px] rounded-br-[40px] rounded-tr-none rounded-bl-none self-end p-4 flex flex-col items-center  gap-10">
                                <div className="flex  flex-col items-center justify-center ">
                                    <div className="w-[180px] h-[180px]">
                                        <img src="img.png" alt="icon" className="w-full h-full"/>
                                    </div>
                                    <h1 className="text-white text-3xl font-semibold ">Local and Remote Game Play</h1>
                                </div>
                                <div className="text-white/80 text-center tracking-wider ">
                                    <p>Experience the thrill of competition right at your fingertips! Our Local Gameplay feature allows you to challenge friends and family in real-time, whether you're facing off in an intense ping pong match or a strategic chess battle. With a seamless interface and easy access to game settings, you can enjoy hours of fun together, fostering connection and friendly rivalry. Get ready to rally and strategize—let the games begin!</p>
                                </div>
                        </motion.div>
                        <motion.div ref={feature3} className="  w-[600px] h-[550px] border-[2px] border-[#b6b4b2] rounded-tl-[40px] rounded-br-[40px] rounded-tr-none rounded-bl-none self-start p-4 flex flex-col items-center  gap-10">
                                <div className="flex  flex-col items-center justify-center ">
                                    <div className="w-[180px] h-[180px]">
                                        <img src="chaticon.png" alt="icon" className="w-full h-full"/>
                                    </div>
                                    <h1 className="text-white text-3xl font-semibold ">Local and Remote Game Play</h1>
                                </div>
                                <div className="text-white/80 text-center tracking-wider ">
                                    <p>Experience the thrill of competition right at your fingertips! Our Local Gameplay feature allows you to challenge friends and family in real-time, whether you're facing off in an intense ping pong match or a strategic chess battle. With a seamless interface and easy access to game settings, you can enjoy hours of fun together, fostering connection and friendly rivalry. Get ready to rally and strategize—let the games begin!</p>
                                </div>
                        </motion.div>
                        <motion.div ref={feature4} className="  w-[600px] h-[550px] border-[2px] border-[#b6b4b2] rounded-tl-[40px] rounded-br-[40px] rounded-tr-none rounded-bl-none self-end p-4 flex flex-col items-center  gap-10">
                                <div className="flex  flex-col items-center justify-center ">
                                    <div className="w-[180px] h-[180px]">
                                        <img src="shield.png" alt="icon" className="w-full h-full"/>
                                    </div>
                                    <h1 className="text-white text-3xl font-semibold ">Local and Remote Game Play</h1>
                                </div>
                                <div className="text-white/80 text-center tracking-wider ">
                                    <p>Experience the thrill of competition right at your fingertips! Our Local Gameplay feature allows you to challenge friends and family in real-time, whether you're facing off in an intense ping pong match or a strategic chess battle. With a seamless interface and easy access to game settings, you can enjoy hours of fun together, fostering connection and friendly rivalry. Get ready to rally and strategize—let the games begin!</p>
                                </div>
                        </motion.div>

                    </div>
            </motion.div>
            <div className="h-[100vh] ">

            </div>

        </div>
    )
}



export default LandingPage