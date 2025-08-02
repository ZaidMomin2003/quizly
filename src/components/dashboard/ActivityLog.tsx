
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

// Mock data, in a real app this would come from an API
const allActivities = [
  { date: 'Today', subject: 'Physics', title: 'Quiz: Kinematics', type: 'quiz' },
  { date: 'Today', subject: 'Chemistry', title: 'Pomodoro: Organic Chem', type: 'pomodoro' },
  { date: 'Yesterday', subject: 'Biology', title: 'Quiz: Cell Biology', type: 'quiz' },
  { date: 'Yesterday', subject: 'Physics', title: 'Quiz: Thermodynamics', type: 'quiz' },
  { date: '2 days ago', subject: 'Chemistry', title: 'Quiz: Chemical Bonding', type: 'quiz' },
];

export function ActivityLog() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredActivities, setFilteredActivities] = useState(allActivities);

  useEffect(() => {
    const results = allActivities.filter(activity =>
      activity.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      activity.subject.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredActivities(results);
  }, [searchTerm]);
  
  const groupedActivities = filteredActivities.reduce((acc, activity) => {
    const { date } = activity;
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(activity);
    return acc;
  }, {} as Record<string, typeof allActivities>);


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
            {Object.entries(groupedActivities).map(([date, activities]) => (
                <div key={date}>
                    <DropdownMenuSeparator />
                    <p className='text-sm font-semibold text-muted-foreground px-2 py-2'>{date}</p>
                    <ul className="space-y-1">
                    {activities.map((activity, index) => (
                        <li key={index} className="flex items-center justify-between p-2 rounded-md hover:bg-accent">
                            <div className="flex flex-col">
                                <span className="font-medium text-sm">{activity.title}</span>
                                <Badge variant="outline" className='w-fit mt-1'>{activity.subject}</Badge>
                            </div>
                            {activity.type === 'quiz' && (
                                <Button variant="ghost" size="sm">Retake</Button>
                            )}
                        </li>
                    ))}
                    </ul>
                </div>
            ))}
        </div>

      </DropdownMenuContent>
    </DropdownMenu>
  );
}
