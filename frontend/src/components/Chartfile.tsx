import { Button } from "@/components/ui/button"

 import { Bar, BarChart } from "recharts"
 
import { ChartConfig, ChartContainer } from "@/components/ui/chart"
 
const chartData = [
  { month: "January", desktop: 186, mobile: 80 },
  { month: "February", desktop: 305, mobile: 200 },
  { month: "March", desktop: 237, mobile: 120 },
  { month: "April", desktop: 73, mobile: 190 },
  { month: "May", desktop: 209, mobile: 130 },
  { month: "June", desktop: 114, mobile: 140 },
  { month: "June", desktop: 90, mobile: 140 },
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
      </BarChart>
    </ChartContainer>
  </>
  )
}