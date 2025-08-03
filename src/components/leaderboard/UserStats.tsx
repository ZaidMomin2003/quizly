
'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Activity } from 'lucide-react';
import { useAnalyticsStore } from '@/stores/analytics-store';
import { useEffect, useState } from 'react';
import { useOnboardingStore } from '@/stores/onboarding-store';

export function UserStats() {
    const { stats } = useAnalyticsStore();
    const { formData } = useOnboardingStore();
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    const isJeeStudent = isClient && formData.exam?.toLowerCase().includes('jee');

    const displayStats = isClient ? [
        { subject: 'Physics', attempted: stats.subjects.Physics.attempted, correct: stats.subjects.Physics.correct },
        { subject: 'Chemistry', attempted: stats.subjects.Chemistry.attempted, correct: stats.subjects.Chemistry.correct },
        isJeeStudent
            ? { subject: 'Mathematics', attempted: stats.subjects.Mathematics.attempted, correct: stats.subjects.Mathematics.correct }
            : { subject: 'Biology', attempted: stats.subjects.Biology.attempted, correct: stats.subjects.Biology.correct },
    ] : [];

    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Activity />
                    Your Stats
                </CardTitle>
            </CardHeader>
            <CardContent>
                {isClient && displayStats.length > 0 ? (
                    <ul className="space-y-6">
                        {displayStats.map(stat => {
                            if (!stat) return null;
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
                ) : (
                    <div className="text-center py-8 text-muted-foreground">
                        <p>No stats yet. Take a quiz to see your progress!</p>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
