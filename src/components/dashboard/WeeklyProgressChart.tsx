
'use client';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { useAnalyticsStore } from '@/stores/analytics-store';
import { useEffect, useState } from 'react';
import { Area, AreaChart, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer, Defs, linearGradient, stop, Line, ComposedChart } from 'recharts';

const chartConfig = {
  questions: {
    label: "Questions Solved",
    color: "hsl(var(--chart-2))",
  }
}

export function WeeklyProgressChart() {
  const { getWeeklyChartData } = useAnalyticsStore();
  const [chartData, setChartData] = useState<{day: string, questions: number}[]>([]);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    setChartData(getWeeklyChartData());
  }, [getWeeklyChartData]);

  if (!isClient) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Weekly Progress</CardTitle>
                <CardDescription>Number of questions solved per day this week.</CardDescription>
            </CardHeader>
            <CardContent className="h-[300px] w-full flex items-center justify-center">
                <p>Loading chart...</p>
            </CardContent>
        </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Weekly Progress</CardTitle>
        <CardDescription>Number of questions solved per day this week.</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
                 <AreaChart
                    data={chartData}
                    margin={{
                        top: 10,
                        right: 30,
                        left: 0,
                        bottom: 0,
                    }}
                    >
                    <defs>
                        <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="hsl(var(--chart-2))" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="hsl(var(--chart-2))" stopOpacity={0}/>
                        </linearGradient>
                    </defs>
                    <XAxis dataKey="day" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                    <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <Tooltip
                        content={<ChartTooltipContent
                            labelClassName='text-foreground font-semibold'
                            className='bg-background/80 backdrop-blur-sm border-border'
                         />}
                     />
                    <Area type="monotone" dataKey="questions" strokeWidth={3} stroke="hsl(var(--chart-2))" fill="url(#colorUv)" />
                </AreaChart>
            </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
