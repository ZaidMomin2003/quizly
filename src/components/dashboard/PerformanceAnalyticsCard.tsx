'use client';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts';
import { ChartContainer, ChartTooltipContent, type ChartConfig } from '@/components/ui/chart';

const chartData = [
  { month: 'Jan', score: 78 },
  { month: 'Feb', score: 82 },
  { month: 'Mar', score: 75 },
  { month: 'Apr', score: 88 },
  { month: 'May', score: 90 },
  { month: 'Jun', score: 85 },
];

const chartConfig = {
  score: {
    label: 'Avg. Score',
    color: 'hsl(var(--chart-1))',
  },
} satisfies ChartConfig;

export function PerformanceAnalyticsCard() {
  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <CardTitle>Performance Analytics</CardTitle>
        <CardDescription>Your average monthly quiz scores.</CardDescription>
      </CardHeader>
      <CardContent className="flex-1">
        <ChartContainer config={chartConfig} className="h-full w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              margin={{ top: 5, right: 5, left: -20, bottom: 5 }}
            >
              <XAxis
                dataKey="month"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                fontSize={12}
              />
              <YAxis
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                fontSize={12}
                domain={[60, 100]}
              />
              <Tooltip
                cursor={false}
                content={<ChartTooltipContent indicator="dot" />}
              />
              <Bar dataKey="score" fill="var(--color-score)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
