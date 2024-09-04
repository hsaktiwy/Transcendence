import { Button } from "@/components/ui/button"

 import { Bar, BarChart,XAxis } from "recharts"

 
import { ChartConfig, ChartContainer } from "@/components/ui/chart"
 
const chartData = [
  { week: "Monday", desktop: 186, mobile: 80 },
  { week: "Tuesday", desktop: 305, mobile: 200 },
  { week: "Wednesday", desktop: 237, mobile: 120 },
  { week: "Thursday", desktop: 73, mobile: 190 },
  { week: "Friday", desktop: 209, mobile: 130 },
  { week: "Saturday", desktop: 114, mobile: 140 },
  { week: "Sunday", desktop: 90, mobile: 140 },
]
 
const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "#5E97A9",
  },
  mobile: {
    label: "Mobile",
    color: "#5E97A9",
  },
} satisfies ChartConfig
 
export function ChartFile() {
  return (
  <>
    <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
      <BarChart accessibilityLayer data={chartData}>
        <Bar dataKey="desktop" fill="var(--color-desktop)" radius={7} />
        <XAxis
              dataKey="week"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tick={{ fill: 'white' }} // Change the color here
              tickFormatter={(value) => value.slice(0, 3)}
            />
      </BarChart>
    </ChartContainer>
  </>
  )
}