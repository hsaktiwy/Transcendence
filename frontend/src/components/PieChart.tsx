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
        <img className="w-10" src="/PaddelTime.svg"></img>
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
