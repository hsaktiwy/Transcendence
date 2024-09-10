import * as React from "react"
 
//medaille.svg star.svg pong.svg flag.svg
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
 
export interface Artwork {
  artist: string
  art: string
}

function Achievements() {
    return (
      <>
        <ScrollArea className="w-full verflow-x-scroll  whitespace-nowrap rounded-md">
          <div className="flex gap-4 justify-center">
            <div className="cardv w-[300px]">
              <div className="h-3/5">
                <div className="h-full bg-[#2B2F32] rounded-xl w-[65%] flex flex-col justify-center items-center">
                  <h1 className="text-3xl 2xl:text-5xl font-medium text-[#5E97A9]">42</h1>
                  <h1 className="text-lg 2xltext-xl font-medium">Wins</h1>
                </div>
              </div>
              <div className="h-2/5 flex justify-center items-center">
                <div className="w-[65%] h-[100%] flex gap-3 flex-col justify-center items-center">
                  <div className="w-[80%] border-b-[2px] border rounded-full 2xl:border-b-[3px]"></div>
                  <div className="w-[80%] border-b-[2px] border rounded-full 2xl:border-b-[3px]"></div>
                  <div className="w-[80%] border-b-[2px] border rounded-full 2xl:border-b-[3px]"></div>
                </div>
                <div className="w-[35%] h-[100%] flex justify-center items-center">
                  <img src="../images/emoji_trophy.svg" />
                </div>
              </div>
            </div>
            <div className="cardv w-[300px]">
              <div className="h-3/5">
                <div className="h-full bg-[#2B2F32] rounded-xl w-[65%] flex flex-col justify-center items-center">
                  <h1 className="text-3xl 2xl:text-5xl font-medium text-[#5E97A9]">42</h1>
                  <h1 className="text-lg 2xltext-xl font-medium">Wins</h1>
                </div>
              </div>
              <div className="h-2/5 flex justify-center items-center">
                <div className="w-[65%] h-[100%] flex gap-3 flex-col justify-center items-center">
                  <div className="w-[80%] border-b-[2px] border rounded-full 2xl:border-b-[3px]"></div>
                  <div className="w-[80%] border-b-[2px] border rounded-full 2xl:border-b-[3px]"></div>
                  <div className="w-[80%] border-b-[2px] border rounded-full 2xl:border-b-[3px]"></div>
                </div>
                <div className="w-[35%] h-[100%] flex justify-center items-center">
                  <img src="../images/medaille.svg" />
                </div>
              </div>
            </div>
            <div className="cardv w-[300px]">
              <div className="h-3/5">
                <div className="h-full bg-[#2B2F32] rounded-xl w-[65%] flex flex-col justify-center items-center">
                  <h1 className="text-3xl 2xl:text-5xl font-medium text-[#5E97A9]">42</h1>
                  <h1 className="text-lg 2xltext-xl font-medium">Wins</h1>
                </div>
              </div>
              <div className="h-2/5 flex justify-center items-center">
                <div className="w-[65%] h-[100%] flex gap-3 flex-col justify-center items-center">
                  <div className="w-[80%] border-b-[2px] border rounded-full 2xl:border-b-[3px]"></div>
                  <div className="w-[80%] border-b-[2px] border rounded-full 2xl:border-b-[3px]"></div>
                  <div className="w-[80%] border-b-[2px] border rounded-full 2xl:border-b-[3px]"></div>
                </div>
                <div className="w-[35%] h-[100%] flex justify-center items-center">
                  <img src="../images/pong.svg" />
                </div>
              </div>
            </div>
            <div className="cardv w-[300px]">
              <div className="h-3/5">
                <div className="h-full bg-[#2B2F32] rounded-xl w-[65%] flex flex-col justify-center items-center">
                  <h1 className="text-3xl 2xl:text-5xl font-medium text-[#5E97A9]">42</h1>
                  <h1 className="text-lg 2xltext-xl font-medium">Wins</h1>
                </div>
              </div>
              <div className="h-2/5 flex justify-center items-center">
                <div className="w-[65%] h-[100%] flex gap-3 flex-col justify-center items-center">
                  <div className="w-[80%] border-b-[2px] border rounded-full 2xl:border-b-[3px]"></div>
                  <div className="w-[80%] border-b-[2px] border rounded-full 2xl:border-b-[3px]"></div>
                  <div className="w-[80%] border-b-[2px] border rounded-full 2xl:border-b-[3px]"></div>
                </div>
                <div className="w-[35%] h-[100%] flex justify-center items-center">
                  <img src="../images/flag.svg" />
                </div>
              </div>
            </div>
            <div className="cardv w-[300px]">
              <div className="h-3/5">
                <div className="h-full bg-[#2B2F32] rounded-xl w-[65%] flex flex-col justify-center items-center">
                  <h1 className="text-3xl 2xl:text-5xl font-medium text-[#5E97A9]">42</h1>
                  <h1 className="text-lg 2xltext-xl font-medium">Wins</h1>
                </div>
              </div>
              <div className="h-2/5 flex justify-center items-center">
                <div className="w-[65%] h-[100%] flex gap-3 flex-col justify-center items-center">
                  <div className="w-[80%] border-b-[2px] border rounded-full 2xl:border-b-[3px]"></div>
                  <div className="w-[80%] border-b-[2px] border rounded-full 2xl:border-b-[3px]"></div>
                  <div className="w-[80%] border-b-[2px] border rounded-full 2xl:border-b-[3px]"></div>
                </div>
                <div className="w-[35%] h-[100%] flex justify-center items-center">
                  <img src="../images/emoji_trophy.svg" />
                </div>
              </div>
            </div>
            <div className="cardv w-[300px]">
              <div className="h-3/5">
                <div className="h-full bg-[#2B2F32] rounded-xl w-[65%] flex flex-col justify-center items-center">
                  <h1 className="text-3xl 2xl:text-5xl font-medium text-[#5E97A9]">42</h1>
                  <h1 className="text-lg 2xltext-xl font-medium">Wins</h1>
                </div>
              </div>
              <div className="h-2/5 flex justify-center items-center">
                <div className="w-[65%] h-[100%] flex gap-3 flex-col justify-center items-center">
                  <div className="w-[80%] border-b-[2px] border rounded-full 2xl:border-b-[3px]"></div>
                  <div className="w-[80%] border-b-[2px] border rounded-full 2xl:border-b-[3px]"></div>
                  <div className="w-[80%] border-b-[2px] border rounded-full 2xl:border-b-[3px]"></div>
                </div>
                <div className="w-[35%] h-[100%] flex justify-center items-center">
                  <img src="../images/emoji_trophy.svg" />
                </div>
              </div>
            </div>
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </>
    );
  }
export default Achievements