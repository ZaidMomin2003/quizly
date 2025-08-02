
'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Activity } from 'lucide-react';

interface Stat {
    subject: string;
    attempted: number;
    correct: number;
}

interface UserStatsProps {
    stats: Stat[];
}

export function UserStats({ stats }: UserStatsProps) {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Activity />
                    Your Stats
                </CardTitle>
            </CardHeader>
            <CardContent>
                <ul className="space-y-6">
                    {stats.map(stat => {
                        const accuracy = stat.attempted > 0 ? (stat.correct / stat.attempted) * 100 : 0;
                        return (
                            <li key={stat.subject}>
                                <div className="flex justify-between items-center mb-1">
                                    <p className="font-semibold">{stat.subject}</p>
                                    <p className="text-sm text-muted-foreground">{stat.correct} / {stat.attempted}</p>
                                </div>
                                <Progress value={accuracy} indicatorClassName={
                                    accuracy > 75 ? 'bg-green-500' : accuracy > 50 ? 'bg-yellow-500' : 'bg-red-500'
                                } />
                                <p className='text-xs text-right mt-1 text-muted-foreground'>{Math.round(accuracy)}% accuracy</p>
                            </li>
                        );
                    })}
                </ul>
            </CardContent>
        </Card>
    );
}
