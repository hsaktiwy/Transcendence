import React from "react";
import {  motion } from "framer-motion";
interface CardPropInterface {
    index: number,
    imagePath: string,
    alt: string,
    desc:string
}
export const CardFadeIn = (dir:number) =>{
    return({
        initialCard: {
            opacity: 0,
            x: 50 * dir, 
        },
        animateCard :{
            opacity: 1,
            x: 0,
            transition : {
                duration: 0.5,
                delay: 0.2,
                ease: "easeInOut"
            } 
        }
    })
}
const Card: React.FC<CardPropInterface>  = ({index, imagePath, alt, desc}) =>{
    return(
        <motion.div
            variants={CardFadeIn(index % 2 ? 1 : -1)}
            initial="initialCard"
            whileInView="animateCard"
            viewport={{once:true}}
            whileHover={{scale:1.1}}
            className={`cursor-pointer py-10 px-5 w-[200px] h-[200px] sm:w-[400px] sm:h-[400px] rounded-xl bg-slate-950  shadow-[0px_0px_9px_12px_rgba(255,_255,_255,_0.05)] flex flex-col  gap-5 ${index % 2 && 'sm:self-end'}`}>
            <div className="flex flex-col sm:flex-row justify-center sm:justify-evenly items-center">
                <img src={imagePath} alt={alt} className="w-[100px] h-[100px]"/>
                <h1 className="text-lg sm:text-2xl font-semibold">{alt}</h1>
            </div>
            <div className=" justify-center hidden sm:flex">
                <p className="space-y-4 text-justify text-slate-300">{desc}</p>
            </div>
        </motion.div>
    )
}
export default Card