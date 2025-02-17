import { useMemo } from "react";

import { LinechartData } from "@/utils/interfaces"
import { CartesianGrid, Line, LineChart, XAxis } from "recharts"

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  
} from "@/components/ui/chart"

export const description = "Win A linear line chart"


const chartConfig = {
  Wins: {
    label: "Wins",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig


interface LineCharFileProps {
  data: LinechartData | undefined; // Data passed to the component
}


export function LineCharFile({ data }: LineCharFileProps) {
  const { chartData, range } = useMemo(() => {
    if (!data || !data.weekly_match_data) return { chartData: [], range: "" };
  
    const sortedData = [...data.weekly_match_data].sort(
      (a, b) => new Date(a.week_start).getTime() - new Date(b.week_start).getTime()
    );
  
    const firstWeek = sortedData[0];
    const lastWeek = sortedData[sortedData.length - 1];
  
    const firstMonth = new Date(firstWeek.week_start).toLocaleString("default", {
      month: "long",
      year: "numeric",
    });
    const lastMonth = new Date(lastWeek.week_end).toLocaleString("default", {
      month: "long",
      year: "numeric",
    });
  
    const range = `${firstMonth} - ${lastMonth}`;
  
    const chartData = data.weekly_match_data.map((week, index) => ({
      month: `W ${index + 1}`,
      Wins: week.match_count, 
    }));
  
    return { chartData, range };
  }, [data]);
  return (
    <Card className="border-none shadow-none h-full w-full">
        <CardHeader className="p-2">
        <CardTitle>Wins Line Chart - Linear</CardTitle>
        <CardDescription>{range}</CardDescription>
      </CardHeader>
      <CardContent className="p-4 flex items-center justify-center w-full h-[90%] ">
        <ChartContainer className="w-full md:h-full" config={chartConfig}>
          <LineChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Line
              dataKey="Wins"
              type="linear"
              stroke="#5E97A9"
              strokeWidth={2}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
