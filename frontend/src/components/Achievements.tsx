import * as React from "react"
 
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { SlLock } from "react-icons/sl";
import { useState } from "react";
import { motion } from "framer-motion";

export interface Artwork {
  artist: string
  art: string
}

function Achievements() {
  const [flippedIndex, setFlippedIndex] = useState(null);

    return (
      <>
         <ScrollArea className="w-full overflow-x-auto whitespace-nowrap rounded-md">
      <div className="flex gap-4 justify-center">
        {[...Array(6)].map((_, index) => (
          <motion.div
            key={index}
            className="relative w-32 h-32 xxl:w-48 xxl:h-48 cursor-pointer"
            onClick={() => setFlippedIndex(flippedIndex === index ? null : index)}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.4 }}
          >
            <motion.div
              className="absolute w-full h-full"
              animate={{ rotateY: flippedIndex === index ? 180 : 0 }}
              transition={{ duration: 0.7 }}
              style={{ transformStyle: "preserve-3d" }}
            >
              {/* Front Side */}
              <div
                className="absolute w-full left-2 top-6 h-full rounded-xl bg-gradient-to-br from-[#242b2f] to-[#1b1e1f] shadow-md p-3 flex flex-col items-center justify-center"
                style={{ backfaceVisibility: "hidden" }}
              >
                <div className="h-3/5  w-full">
                  <div className="h-full bg-[#2B2F32] rounded-xl w-[65%]  flex flex-col justify-center items-center">
                    <h1 className="text-xl xxl:text-4xl font-semibold text-[#5E97A9]">
                      1<span className="text-base xxl:text-3xl">/</span>5
                    </h1>
                    <h1 className="text-sm 2xl:text-lg font-semibold">wins</h1>
                  </div>
                </div>
                <div className="h-2/5 flex w-full justify-center items-center">
                  <div className="w-[65%] h-[100%] flex gap-3 flex-col justify-center items-center">
                    <div className="w-[80%] border-b-[2px] border rounded-full xxl:border-b-[3px]"></div>
                    <div className="w-[80%] border-b-[2px] border rounded-full xxl:border-b-[3px]"></div>
                    <div className="w-[80%] border-b-[2px] border rounded-full xxl:border-b-[3px]"></div>
                  </div>
                  <div className="w-[35%] h-[100%] flex justify-center items-center">
                    <img src="../firstPaddle.svg" className="w-10 text-[#5E97A9]" alt="Paddle" />
                  </div>
                </div>
                {/* <div className="absolute w-full h-full bg-black/30 backdrop-blur-md rounded-xl flex justify-center items-center text-white text-3xl">
                  <SlLock/>
                </div> */}
              </div>

              {/* Back Side */}
              <div
                className="absolute shadow-md right-2 top-6 gap-2 w-full h-full rounded-xl bg-gradient-to-br from-[#242b2f] to-[#1b1e1f] flex flex-col items-center justify-center text-white text-xl font-semibold"
                style={{ transform: "rotateY(180deg)", backfaceVisibility: "hidden" }}
              >
                <img src="../firstPaddle.svg" className="w-10 text-[#5E97A9]" alt="Paddle" />
                <div className="text-sm font-medium">Win 5 matches </div>
              </div>
              
            </motion.div>
          </motion.div>
        ))}
      </div>
    </ScrollArea>
      </>
    );
  }
export default Achievements