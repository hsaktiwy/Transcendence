import gsap from "gsap";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Chess from "./Chess";
import Pong from "./Pong";


const GameCenter = ()=>{
    const [chess, setChess] = useState<boolean>(false)
    const [pong, setPong] = useState<boolean>(false)

    return (
        <div>
            <div className="  bg-black/10 backdrop-filter backdrop-blur-sm  rounded-xl   absolute top-[60px]  left-0 lg:left-[142px] h-[calc(100%-100px)] w-[calc(100%-20px)] lg:w-[calc(100%-162px)] 2xl:w-[calc(80%)] my-[20px] mx-[10px] 2xl:mx-[8%]">
                {chess && <Chess/>}
                {pong && <Pong/>}
                { !chess && !pong && 
                    <div className="w-[100%] h-[100%] flex justify-center items-center md:gap-[5vw] lg:gap-[10vw] flex-col sm:flex-row">
                        <div 
                            className="bg-gray-800/90  rounded-xl w-[270px] lg:w-[300px]  h-[270px] lg:h-[300px]  text-white  flex font-bold italic justify-center items-center hover:cursor-pointer hover:w-[280px]hover:h-[280px] hover:lg:w-[310px] hover:lg:h-[310px]  hover:text-blue-500"
                                onClick={()=>{setChess(true)}}
                        >
                            Chess
                        </div>
                        <div
                            className="bg-gray-600/90 rounded-xl  w-[270px] lg:w-[300px]  h-[270px] lg:h-[300px] text-white  flex font-bold italic justify-center items-center hover:cursor-pointer hover:w-[280px]hover:h-[280px] hover:lg:w-[310px] hover:lg:h-[310px] hover:text-blue-500"
                                onClick={()=>{setPong(true)}}
                            >
                            Pong
                        </div>
                    </div>
                }
            </div>
        </div>
    );
}
export default GameCenter;