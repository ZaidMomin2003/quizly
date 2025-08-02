
'use client';

import { useState, useEffect } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { History, Search } from 'lucide-react';
import { useAnalyticsStore, Activity } from '@/stores/analytics-store';
import { useRouter } from 'next/navigation';

export function ActivityLog() {
  const [searchTerm, setSearchTerm] = useState('');
  const [isClient, setIsClient] = useState(false);
  const { activities } = useAnalyticsStore();
  const router = useRouter();

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleRetake = (title: string) => {
    const topics = title.replace('Quiz: ', '');
    sessionStorage.setItem('quickQuizData', JSON.stringify({
        topics: topics,
        numberOfQuestions: 5,
        difficulty: 'medium',
    }));
    router.push('/quizzes');
  }

  const filteredActivities = isClient ? activities.filter(activity =>
    activity.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    activity.subject.toLowerCase().includes(searchTerm.toLowerCase())
  ) : [];
  
  const groupedActivities = filteredActivities.reduce((acc, activity) => {
    const date = new Date(activity.date).toDateString();
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(activity);
    return acc;
  }, {} as Record<string, Activity[]>);

  // Get today's and yesterday's date strings for comparison
  const today = new Date().toDateString();
  const yesterday = new Date(Date.now() - 864e5).toDateString();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="rounded-full">
          <History className="h-5 w-5" />
          <span className="sr-only">Activity Log</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80 sm:w-96 p-4">
        <DropdownMenuLabel className='text-lg font-semibold'>Activity Log</DropdownMenuLabel>
        <div className="relative mt-2 mb-4">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search activities..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <div className='max-h-96 overflow-y-auto'>
            {Object.keys(groupedActivities).length > 0 ? Object.entries(groupedActivities).map(([date, activities]) => {
                let displayDate = date;
                if (date === today) displayDate = 'Today';
                if (date === yesterday) displayDate = 'Yesterday';

                return (
                    <div key={date}>
                        <DropdownMenuSeparator />
                        <p className='text-sm font-semibold text-muted-foreground px-2 py-2'>{displayDate}</p>
                        <ul className="space-y-1">
                        {activities.map((activity, index) => (
                            <li key={index} className="flex items-center justify-between p-2 rounded-md hover:bg-accent">
                                <div className="flex flex-col">
                                    <span className="font-medium text-sm">{activity.title}</span>
                                    <Badge variant="outline" className='w-fit mt-1'>{activity.subject}</Badge>
                                </div>
                                {activity.type === 'quiz' && (
                                    <Button variant="ghost" size="sm" onClick={() => handleRetake(activity.title)}>Retake</Button>
                                )}
                            </li>
                        ))}
                        </ul>
                    </div>
                )
            }) : (
                <div className='text-center py-8 text-muted-foreground'>
                    <p>No activities yet.</p>
                </div>
            )}
        </div>

      </DropdownMenuContent>
    </DropdownMenu>
  );
}
