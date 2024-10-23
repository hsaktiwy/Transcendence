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
        offset: ["0 1", "1.33 1"]
    })
    return(
        <div className="   px-[20px] sm:px-[100px] min-h-[100vh] py-4 bg-gradient-to-b from-[#070320] to-[#1a3340] font-poppins ">
            <div className="  min-h-[100vh] overflow-hidden">
                <div className="nav-container  flex justify-between my-8 items-center">
                    <div className="hidden sm:block logo mx-4 text-4xl font-bold text-white">
                        LOGO
                    </div>
                    <ul className="flex gap-3  items-center text-lg sm:text-xl font-semibold  w-full sm:w-auto justify-between sm:justify-start ">
                        <li className="px-7 sm:px-8 py-2 sm:py-3 text-white/80 opacity-80 duration-75 hover:opacity-100 cursor-pointer">Sign up</li>
                        <li className="px-7 sm:px-8 py-2 sm:py-3 bg-[#5E97A9] rounded-md text-white opacity-80 duration-75 hover:opacity-100  cursor-pointer">Login</li>
                    </ul>
                </div>

                <motion.div
                initial={{ y: '-100vh'}}
                animate={{ y: 0}}
                transition={{ duration: 0.5 , type: 'spring', stiffness: 150}}
                className="  2xl:py-[calc(100vh-50%)] my-[5px] header-section-container flex justify-center lg:justify-evenly  items-center   overflow-hidden ">
                    <div className="header-text-container text-white w-full lg:w-[485px] flex flex-col gap-8 items-center lg:items-start ">
                        <h1
                        className="  text-5xl font-bold leading-[55px] tracking-wider">Two Games,<br/>Infinite Fun !</h1>
                        <p className="text-[16px] leading-8 sm:text-lg tracking-wider">
                        Ready for a challenge? Whether you want to test your reflexes with fast-paced Ping Pong or sharpen your strategy with Chess, our platform has it all. Compete with players worldwide, climb the leaderboards, and become a master of both speed and strategy. With real-time matches and global tournaments, every game is a chance to prove your skills.
                        </p>
                        <motion.div whileHover={{scale:1.1}} transition={{ duration: 0.3 , type: 'spring', stiffness: 180}} className=" lg:mt-10 py-3  bg-gradient-to-r from-[#5e97a9] to-[#0e769f] w-[195px] font-medium rounded-full text-center opacity-85 hover:opacity-100 duration-75 cursor-pointer text-xl tracking-widest">
                            Get Started
                        </motion.div>
                    </div>
                    <div className="hidden lg:block">
                        <img src="Switch.png" alt="game-console" />
                    </div>
                </motion.div>
            </div> 
            <motion.div ref={ref}
                    className=" text-center pt-8 overflow-hidden ">
                    <h1 className="text-4xl sm:text-6xl text-white font-bold">
                        Key Features
                    </h1>

                    <div className="features-container  mt-[200px] flex flex-col gap-[50px] justify-center 2xl:mx-[500px] items-center">
                        <motion.div initial={{ opacity: 0, x: -100}}
                                whileInView={{ opacity: 1, x: 0}}
                                transition={{delay: 0.2, duration: 0.2}} 
                                ref={feature1} className="    lg:w-[600px] lg:h-[550px] border-[5px] border-[#ebfaff]/20 rounded-tl-[40px] rounded-br-[40px] rounded-tr-none rounded-bl-none 2xl:self-start p-4 flex flex-col items-center  gap-10 ">
                                <div className="flex  flex-col items-center justify-center ">
                                    <div className="w-[180px] h-[180px]">
                                        <img src="target-front-color.png" alt="icon" className="w-full h-full"/>
                                    </div>
                                    <h1 className="text-white text-3xl font-semibold ">Local and Remote Game Play</h1>
                                </div>
                                <div className="text-white/80 text-base leading-7 lg:leading-0 lg:text-center  mb-8 lg:mb-0">
                                    <p>Experience the thrill of competition right at your fingertips! Our Local Gameplay feature allows you to challenge friends and family in real-time, whether you're facing off in an intense ping pong match or a strategic chess battle. With a seamless interface and easy access to game settings, you can enjoy hours of fun together, fostering connection and friendly rivalry. Get ready to rally and strategize—let the games begin!</p>
                                </div>
                        </motion.div>
                        <motion.div initial={{ opacity: 0, x: 100}}
                                whileInView={{ opacity: 1, x: 0}}
                                transition={{delay: 0.2, duration: 0.2}} 
                                 ref={feature2} className="    lg:w-[600px] lg:h-[550px] border-[5px] border-[#ebfaff]/20 rounded-tl-[40px] rounded-br-[40px] rounded-tr-none rounded-bl-none 2xl:self-end p-4 flex flex-col items-center  gap-10 ">
                                <div className="flex  flex-col items-center justify-center ">
                                    <div className="w-[180px] h-[180px]">
                                        <img src="img.png" alt="icon" className="w-full h-full"/>
                                    </div>
                                    <h1 className="text-white text-3xl font-semibold ">Local and Remote Game Play</h1>
                                </div>
                                <div className="text-white/80 text-base leading-7 lg:leading-0 lg:text-center  mb-8 lg:mb-0">
                                    <p>Experience the thrill of competition right at your fingertips! Our Local Gameplay feature allows you to challenge friends and family in real-time, whether you're facing off in an intense ping pong match or a strategic chess battle. With a seamless interface and easy access to game settings, you can enjoy hours of fun together, fostering connection and friendly rivalry. Get ready to rally and strategize—let the games begin!</p>
                                </div>
                        </motion.div>
                        <motion.div initial={{ opacity: 0, x: -100}}
                                whileInView={{ opacity: 1, x: 0}}
                                transition={{delay: 0.2, duration: 0.2}} 
                                 ref={feature3} className="    lg:w-[600px] lg:h-[550px] border-[5px] border-[#ebfaff]/20 rounded-tl-[40px] rounded-br-[40px] rounded-tr-none rounded-bl-none 2xl:self-start p-4 flex flex-col items-center  gap-10 ">
                                <div className="flex  flex-col items-center justify-center ">
                                    <div className="w-[180px] h-[180px]">
                                        <img src="chaticon.png" alt="icon" className="w-full h-full"/>
                                    </div>
                                    <h1 className="text-white text-3xl font-semibold ">Local and Remote Game Play</h1>
                                </div>
                                <div className="text-white/80 text-base leading-7 lg:leading-0 lg:text-center  mb-8 lg:mb-0">
                                    <p>Experience the thrill of competition right at your fingertips! Our Local Gameplay feature allows you to challenge friends and family in real-time, whether you're facing off in an intense ping pong match or a strategic chess battle. With a seamless interface and easy access to game settings, you can enjoy hours of fun together, fostering connection and friendly rivalry. Get ready to rally and strategize—let the games begin!</p>
                                </div>
                        </motion.div>
                        <motion.div initial={{ opacity: 0, x: 100}}
                                whileInView={{ opacity: 1, x: 0}}
                                transition={{delay: 0.2, duration: 0.2}} 
                                 ref={feature4} className="    lg:w-[600px] lg:h-[550px] border-[5px] border-[#ebfaff]/20 rounded-tl-[40px] rounded-br-[40px] rounded-tr-none rounded-bl-none 2xl:self-end p-4 flex flex-col items-center  gap-10 ">
                                <div className="flex  flex-col items-center justify-center ">
                                    <div className="w-[180px] h-[180px]">
                                        <img src="shield.png" alt="icon" className="w-full h-full"/>
                                    </div>
                                    <h1 className="text-white text-3xl font-semibold ">Local and Remote Game Play</h1>
                                </div>
                                <div className="text-white/80 text-base leading-7 lg:leading-0 lg:text-center  mb-8 lg:mb-0">
                                    <p>Experience the thrill of competition right at your fingertips! Our Local Gameplay feature allows you to challenge friends and family in real-time, whether you're facing off in an intense ping pong match or a strategic chess battle. With a seamless interface and easy access to game settings, you can enjoy hours of fun together, fostering connection and friendly rivalry. Get ready to rally and strategize—let the games begin!</p>
                                </div>
                        </motion.div>

                    </div>
            </motion.div>
            {/* <div className="h-[300vh]">
                <div className="ranking-container ">
                    <div className=" text-center text-white flex flex-col gap-8">
                        <h1 className="text-5xl font-bold tracking-wider">Chase the Crown <span className="text-6xl ">🏆</span></h1>
                        <p className="text-3xl tracking-widest text-white/70">Climb the ranks and showcase your skills!</p>
                    </div>
                    <div className="mt-[150px] ml-[180px] tracking-widest   flex flex-col gap-10 ">
                        <h2 className="text-4xl font-semibold text-white">Rise to the Top</h2>
                        <p className="w-[25%] text-xl text-white/40">See how you stack up against the competition! Our Leaderboards showcase the top players from around the world in both Ping Pong and Chess. Whether you're aiming to be the fastest reflexes on the table or the sharpest mind on the board, the leaderboard is your path to glory.</p>
                    </div>
                </div>

            </div> */}

        </div>
    )
}



export default LandingPage