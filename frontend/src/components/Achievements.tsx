
 
import { ScrollArea } from "@/components/ui/scroll-area"

import { useState } from "react";
import { motion } from "framer-motion";
import { useEffect } from "react";

import mailman from "@/utils/AxiosFetcher";
import { SlLock } from "react-icons/sl";

export interface Artwork {
  artist: string
  art: string
}

interface AchievementInterface {
  type: string;
  description: string;
  title: string;
  game_numbers: number;
  win_streak: number;
  unlocked: boolean;
  icon: string;
}

interface Achievements
{
  user_id:number;
  wins:string;
  achievements:AchievementInterface[];
}

interface Prop {
  uuid: string | undefined;
}

function Achievements({ uuid }: Prop) {
  const [flippedIndex, setFlippedIndex] = useState<number | null>(null);
  const [achievementsData, setAchievementsData] = useState<AchievementInterface[]>([])
  // const [AchievementSec, setAchievementsSec] = useState<Achievements>()
  const [wins, setWins] = useState<number  | null>(null) 
  

  const fetchAchievements = async () => {
    try {
      const req = {
        url: `profile/get_achievements/${uuid}`,
        method: "GET",
      };
      const resp = await mailman(req);
      // const array: Achievements[] = resp.data as Achievements[];
      console.log('data achivement ->>>>>>\n', resp.data)
      setAchievementsData(resp.data.achievements);
      setWins(resp.data.wins);
    } catch (e) {
      console.log("Error in Achievement", e);
    }
  };
  const isGetTheAchievement = (game_numbers:number) =>
  {
      if (wins)
      {
        
        if(wins >= game_numbers)
          return (game_numbers)
      }

      return 0
  }


  useEffect(() => {
    if (uuid) {
      fetchAchievements();
    }
  }, [uuid]); 



  return (
    <>
<ScrollArea className="w-full overflow-x-auto h-40 xxl:h-56 whitespace-nowrap rounded-md">
  <div className="flex gap-4 justify-center">
    {achievementsData.map((achievement, index) => {
      const ache = isGetTheAchievement(achievement.game_numbers);
      
      return (
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
              <div className="h-3/5 w-full">
                <div className="h-full bg-[#2B2F32] rounded-xl w-[65%] flex flex-col justify-center items-center">
                  <h1 className="text-xl xxl:text-4xl font-semibold text-[#5E97A9]">
                    {achievement.game_numbers}<span className="text-base xxl:text-3xl">/</span>{achievement.game_numbers}
                  </h1>
                  <h1 className="text-sm 2xl:text-lg font-semibold">wins</h1>
                </div>
              </div>
              <div className="h-2/5 flex w-full justify-center items-center">
                <div className="w-[65%] h-[100%] flex gap-2 flex-col justify-center items-center">
                  <div className="w-[80%] border-b-[2px] border rounded-full xxl:border-b-[3px]"></div>
                  <div className="w-[80%] border-b-[2px] border rounded-full xxl:border-b-[3px]"></div>
                  <div className="w-[80%] border-b-[2px] border rounded-full xxl:border-b-[3px]"></div>
                </div>
                <div className="w-[35%] h-[100%] flex justify-center items-center">
                  <img src={`../achievement/${achievement.icon}.svg`} className="w-10 text-[#5E97A9]" alt="Paddle" />
                </div>
              </div>
              
              {/* Lock Overlay if Not Achieved */}
              {ache === 0 && (
                <div className="absolute w-full h-full bg-black/30 backdrop-blur-md rounded-xl flex justify-center items-center text-white text-3xl">
                  <SlLock />
                </div>
              )}
            </div>

            {/* Back Side */}
            <div
              className="absolute shadow-md right-2 top-6 gap-2 w-full h-full rounded-xl bg-gradient-to-br from-[#242b2f] to-[#1b1e1f] flex flex-col items-center justify-center text-white text-xl font-semibold"
              style={{ transform: "rotateY(180deg)", backfaceVisibility: "hidden" }}
            >
              
              <div className="flex flex-col justify-center items-center">
                <img src={`../achievement/${achievement.icon}.svg`} className="w-10 text-[#5E97A9]" alt="Paddle" />
                <div className="text-sm text-center xxl:text-lg font-semibold mt-2">
                  <p>{achievement.title}</p>
                  <p className="text-gray-500 text-[9px]  xxl:text-sm w-full text-center px-2 break-words">{achievement.description}</p>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      );
    })}
  </div>
</ScrollArea>

    </>
  );
}

export default Achievements