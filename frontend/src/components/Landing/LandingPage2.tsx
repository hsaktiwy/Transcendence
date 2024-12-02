import React from "react";
import NavBar from "./NavBar";
import HeroSection from "./HeroSection";
import CardBorder from "../../../public/cardBorder.png"
import TargetImage from "/target-front-color.png"
import ChatImage from "/chaticon.png"
import TropheyImage from "/img.png"
import MedalImage from "/medal-front-color.png"
import Card from "./Card";
import { localGamePlayDesc, remoteGamePlayDesc, tournamentDesc, chatDesc } from "./description";
import { motion } from "framer-motion";
import { useContext } from "react";
import { AuthContext } from '@/components/AuhtenticationContext';
import { Navigate } from "react-router-dom";

interface cardInfo{
    index:number,
    imagePath: string,
    alt: string,
    desc: string
}
const imageArray:string[] = [TargetImage, MedalImage, TropheyImage ,ChatImage]
const descArray:string[] = [localGamePlayDesc, remoteGamePlayDesc, tournamentDesc, chatDesc]
const altArray:string[] = ['Local Gameplay', 'Remote Gameplay', 'Tournament' ,'Chat with friends']
const cards:cardInfo[] = imageArray.map((elm, index) =>{
    return {
        index: index,
        imagePath: elm,
        alt: altArray[index],
        desc: descArray[index]
    }
})
const LandingPage2 = () =>{
    const AuthContextConsummer = useContext(AuthContext)
    if (!AuthContextConsummer)
        throw new Error("invalid scope");
    return(
        AuthContextConsummer.loggedIn === true ? <Navigate to='/'/> : 
        <main className="  font-poppins min-h-[100vh] overflow-x-hidden  relative">
            
            <section className="p-10 mx-auto max-w-screen-xl text-white flex flex-col gap-16 relative">
                <NavBar/>
                <HeroSection/>
            </section>
            <section className="p-10 mx-auto max-w-screen-lg text-white flex flex-col   ">
                <motion.div 
                    initial={{
                        opacity: 0,
                        y: 50
                    }}
                    whileInView={{
                        opacity: 1,
                        y: 0,
                        transition : {
                            duration: 0.5,
                            type: "spring",
                            stiffness: 100,
                            ease: "easeInOut"
                        } 
                    }}
                    viewport={{once:true}}
                    className="key-header flex justify-center mb-20 ">
                    <h1 className="text-4xl font-semibold">Key Features</h1>
                </motion.div>
                <div className="card-container flex flex-col items-center sm:items-start gap-10">
                   {
                        cards.map((card,index) =>{
                            return(
                                <Card {...card} key={index}/>
                            )
                        })
                   }
                    {/* <div className="h-[300px] w-[300px] bg-slate-900 rounded-xl shadow-[0px_0px_9px_12px_rgba(255,_255,_255,_0.05)] self-end"></div>
                    <div className="h-[300px] w-[300px] bg-slate-900 rounded-xl shadow-[0px_0px_9px_12px_rgba(255,_255,_255,_0.05)]"></div>
                    <div className="h-[300px] w-[300px] bg-slate-900 rounded-xl shadow-[0px_0px_9px_12px_rgba(255,_255,_255,_0.05)] self-end"></div> */}
                </div>
            </section>


            
        </main>
    )
}

export default LandingPage2