import React from "react";
import Switch from '../../../public/Switch.png'
import { FaArrowRight } from "react-icons/fa6";
import { motion } from "framer-motion";

export const FadeIn = (delay: number) =>{
    return({
        initial: {
            opacity: 0,
            y: 50, 
        },
        animate :{
            opacity: 1,
            y: 0,
            transition : {
                duration: 0.5,
                delay: delay,
                type: "spring",
                stiffness: 100,
                ease: "easeInOut"
            } 
        }
    })
}
const ImageFade = () => {
    return (
        {
            imgInitial: {
                opacity: 0,
                x: 50, 
            },
            imgAnimate :{
                opacity: 1,
                x: 0,
                transition : {
                    duration: 0.5,
                    delay: 0.4,
                    ease: "easeInOut"
                } 
            }
        }
    )
}
const HeroSection = () =>{
    
    return (
        <div className="min-h-[650px] grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-16 z-20">
            <div className="flex flex-col justify-center gap-8">
                <div>
                    <motion.h1 
                    variants={FadeIn(0.6)}
                    initial="initial"
                    animate="animate"
                    className="text-5xl font-semibold">Two Games,</motion.h1>
                    <motion.h1 
                    variants={FadeIn(0.6)}
                    initial="initial"
                    animate="animate"
                    className="text-5xl text-[#5E97A9] font-bold">Infinite Fun!</motion.h1>
                </div>
                <motion.p 
                    variants={FadeIn(0.7)}
                    initial="initial"
                    animate="animate"
                    className="text-lg font-medium text-slate-200 w-full md:w-[70%]">Ready for a challenge? Whether you want to test your reflexes with fast-paced Ping Pong or sharpen your strategy with Chess, our platform has it all. Compete with players worldwide, climb the leaderboards, and become a master of both speed and strategy. With real-time matches and global tournaments, every game is a chance to prove your skills.
                </motion.p>
                <motion.div
                    variants={FadeIn(0.8)}
                    initial="initial"
                    animate="animate"
                    className="bg-[#5E97A9] rounded-2xl py-4 px-3 w-[165px] flex justify-between items-center hover:scale-105 duration-100 cursor-pointer">
                    <p className=" text-lg font-medium">Get Started</p>
                    <FaArrowRight/>
                </motion.div>
            </div>
            <motion.div 
                variants={ImageFade()}
                initial="imgInitial"
                animate="imgAnimate"
                className=" flex justify-end items-center">
                <img src={Switch} alt="Switch-Image" className=" " />
            </motion.div>
        </div>
    )
}

export default HeroSection