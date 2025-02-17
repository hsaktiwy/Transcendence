"use client"

import { TrendingUp } from "lucide-react"
import { PolarAngleAxis, PolarGrid, Radar, RadarChart } from "recharts"
import { RadarChartInterFace } from "@/utils/interfaces"


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

export const description = "A radar chart"

const chartConfig = {
  game: {
    label: "game",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig

export function RadarChartFile(props: { radarchartData: RadarChartInterFace }) {
  
  const chartData = [
    { matches: "w", game: props.radarchartData.wins},
    { matches: "Lo", game: props.radarchartData.lose },
    { matches: "wi", game: props.radarchartData._wins },
    { matches: "lo", game: props.radarchartData._lose },
  ]
  return (
    <Card className="border-none bg-gradient-to-br from-[#242b2f] to-[#1b1e1f] w-full   h-full">
      <CardHeader className="items-center pb-4">
        <CardTitle>Radar Chart</CardTitle>
        <CardDescription>
          Showing total wins draws and loses
        </CardDescription>
      </CardHeader>
      <CardContent className="pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <RadarChart data={chartData}>
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <PolarAngleAxis dataKey="matches" />
            <PolarGrid />
            <Radar
              dataKey="game"
              fill="#5E97A9"
              fillOpacity={0.6}
            />
          </RadarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="hidden xxl:block flex-col  gap-2 text-sm">
        <div className="flex items-center gap-2 justify-center font-medium leading-none">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="flex items-center gap-2 leading-none justify-center text-muted-foreground">
          January - June 2024
        </div>
      </CardFooter>
    </Card>
  )
}
