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
  { month: 'January', score: 78 },
  { month: 'February', score: 82 },
  { month: 'March', score: 75 },
  { month: 'April', score: 88 },
  { month: 'May', score: 90 },
  { month: 'June', score: 85 },
];

const chartConfig = {
  score: {
    label: 'Avg. Score',
    color: 'hsl(var(--primary))',
  },
} satisfies ChartConfig;

export function PerformanceAnalyticsCard() {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Performance Analytics</CardTitle>
        <CardDescription>Your average monthly quiz scores.</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[250px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              margin={{ top: 20, right: 20, left: -10, bottom: 0 }}
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
              <Bar dataKey="score" fill="var(--color-score)" radius={4} />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
