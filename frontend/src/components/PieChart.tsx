// "use client"

import React, { useContext, useEffect } from "react";
import { TrendingUp } from "lucide-react"
import { Label, Pie, PieChart } from "recharts"
import { UserContext } from "./UserContext";


import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { match } from "assert";

export const description = "A donut chart with text"



interface LoseWins
{
    wins:number;
    lose:number;

}

interface prop{
  matches:  LoseWins | undefined
}
export function PieChartFile(prop: prop) {


    // const userContextConsumer = useContext(UserContext);
    // if (!userContextConsumer)
    //   throw new Error("userContext must be used within a UserProvider");
  
    // const {matches} = userContextConsumer;
    console.log('from pie chartt anan here ->>> ', prop);
    const chartData = [
      { browser: "Win", Matches: prop.matches?.wins, fill: "#5E97A9" },
      { browser: "Lose", Matches: prop.matches?.lose, fill: "#303C40" },
    ]
    
    const chartConfig = {
      Wins: {
        label: "Wins",
        color: "hsl(var(--chart-1))",
      },
      Loses: {
        label: "Loses",
        color: "hsl(var(--chart-5))",
      },
    } satisfies ChartConfig
    
    console.log('hii from pie chart :', prop.matches);
  let totalMatches = 0;
  if (prop.matches)
    totalMatches = prop.matches?.wins + prop.matches?.lose

  return (
    <>
    {
      (prop.matches?.wins == 0 && prop.matches.lose == 0) ? (<div className="text-2xl  h-full w-full  rounded-2xl bg-gradient-to-br from-[#242b2f] to-[#1b1e1f]  shadow-lg  font-semibold flex flex-col justify-center items-center p-4">
        <div className="flex justify-center items-center rounded-xl bg-gradient-to-bl from-[#283137] to-[#242729] flex-col p-6">
        <svg width="68" height="78" viewBox="0 0 34 39"  className="text-lg" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M10.5144 27.5068C10.7933 26.8975 11.4478 27.0026 11.4478 27.0026L11.4927 27.0077C15.354 27.8865 18.9892 27.7086 21.8527 25.6218" stroke="#FFFCFC" strokeWidth="1.23" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M6.51516 25.4258C6.87343 24.8576 6.45024 24.4184 6.45024 24.4184L6.42927 24.397C2.25046 20.6452 0.128367 16.02 3.1339 10.4657C6.63759 3.99056 13.448 -1.77417 21.5319 2.40783C28.0243 5.76648 28.7007 11.5737 27.0845 17.0185" stroke="#FFFCFC" strokeWidth="1.23" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M19.7981 26.7544L1.9353 17.5137" stroke="#FFFCFC" strokeWidth="1.23" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M5.89882 37.6792L8.19269 32.5966L12.5691 23.015L9.16156 21.2522L3.51147 30.175L0.949641 34.191C0.79027 34.4544 0.785674 34.5953 0.817847 34.8105C0.851111 35.0329 1.03358 35.2603 1.27677 35.4721C1.27677 35.4721 2.2284 36.3264 3.67188 36.9398" stroke="#FFFCFC" strokeWidth="1.23" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M25.1275 24.5145C26.714 24.5145 28.0001 23.257 28.0001 21.7057C28.0001 20.1545 26.714 18.897 25.1275 18.897C23.541 18.897 22.2549 20.1545 22.2549 21.7057C22.2549 23.257 23.541 24.5145 25.1275 24.5145Z" stroke="#FFFCFC" strokeWidth="1.23" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M27.5002 38C30.5377 38 33.0001 35.5376 33.0001 32.5C33.0001 29.4624 30.5377 27 27.5001 27C25.0374 27 22.976 28.6186 22.2751 30.85H23.6501" stroke="white" strokeWidth="0.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M27.5 30.3V32.5L28.6 33.6" stroke="white" strokeWidth="0.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M22 32.5C22 32.6855 22.0084 32.869 22.0247 33.05M25.85 38C25.6621 37.9382 25.4786 37.866 25.3 37.7843M22.6652 35.25C22.5591 35.0456 22.4645 34.8338 22.3822 34.6154M23.5572 36.5186C23.7253 36.6997 23.9047 36.8693 24.0942 37.0261" stroke="white" strokeWidth="0.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        <h1 className="text-center m-2 text-lg">You haven't played any matches yet</h1>
        </div>
     </div>)  :

      (<Card className=" h-full w-full flex flex-col border-none bg-gradient-to-br from-[#242b2f] to-[#1b1e1f] backdrop-filter backdrop-blur-sm">
        <CardHeader className="items-center pb-0">
          <CardTitle className="text-2xl">Matches</CardTitle>
      </CardHeader>
        <CardContent className="flex-1  pb-0">
          <ChartContainer
            config={chartConfig}
            className="mx-auto aspect-square max-h-[250px] xxl:max-h-[350px]"
          >
            <PieChart>
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Pie
                data={chartData}
                dataKey="Matches"
                nameKey="browser"
                innerRadius={60}
                strokeWidth={5}
              >
                <Label className=""
                  content={({ viewBox }) => {
                    if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                      return (
                        <text
                          x={viewBox.cx}
                          y={viewBox.cy}
                          textAnchor="middle"
                          dominantBaseline="middle"
                        >
                          <tspan
                            x={viewBox.cx}
                            y={viewBox.cy}

                            className="fill-foreground text-3xl font-bold"
                            fill="white"
                            >
                            {totalMatches.toLocaleString()}
                          </tspan>
                          <tspan
                            x={viewBox.cx}
                            y={(viewBox.cy || 0) + 24}
                            className="fill-muted-foreground"
                            fill="white"
                          >
                            Matches
                          </tspan>
                        </text>
                      )
                    }
                  }}
                />
              </Pie>
            </PieChart>
          </ChartContainer>
        </CardContent>
      </Card>)
    }
    </>
  )
}
