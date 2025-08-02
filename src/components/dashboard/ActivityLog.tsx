
'use client';

import { useState, useEffect } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel
} from '@/components/ui/dropdown-menu';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { History, Search } from 'lucide-react';
import { useAnalyticsStore, Activity, QuizResult } from '@/stores/analytics-store';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

export function ActivityLog() {
  const [searchTerm, setSearchTerm] = useState('');
  const [isClient, setIsClient] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(null);
  const { activities } = useAnalyticsStore();
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleRetake = (activity: Activity) => {
    sessionStorage.setItem('quickQuizData', JSON.stringify({
        topics: activity.quiz?.topics.join(', ') || activity.title.replace('Quiz: ', ''),
        numberOfQuestions: activity.quiz?.questions.length || 5, // Use original number of questions
        difficulty: activity.quiz?.difficulty || 'medium',
    }));
    router.push('/quizzes');
    setSelectedActivity(null);
  }

  const handleViewResults = (activity: Activity) => {
    if (activity.quiz && activity.results) {
        sessionStorage.setItem('quizResultsToShow', JSON.stringify({
            quiz: activity.quiz,
            results: activity.results,
        }));
        router.push('/quizzes/results');
    } else {
        toast({
            title: "Results not available",
            description: "Detailed results for this quiz could not be found.",
            variant: 'destructive',
        });
    }
    setSelectedActivity(null);
  }

  const handleActivityClick = (activity: Activity) => {
    if (activity.type === 'quiz') {
      setSelectedActivity(activity);
    }
  };

  const filteredActivities = isClient ? activities.filter(activity =>
    activity.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (activity.subject && activity.subject.toLowerCase().includes(searchTerm.toLowerCase()))
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
    <>
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
              {Object.keys(groupedActivities).length > 0 ? Object.entries(groupedActivities).sort((a,b) => new Date(b[0]).getTime() - new Date(a[0]).getTime()).map(([date, activities]) => {
                  let displayDate = new Date(date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric'});
                  if (date === today) displayDate = 'Today';
                  if (date === yesterday) displayDate = 'Yesterday';

                  return (
                      <div key={date}>
                          <DropdownMenuSeparator />
                          <p className='text-sm font-semibold text-muted-foreground px-2 py-2'>{displayDate}</p>
                          <ul className="space-y-1">
                          {activities.map((activity, index) => (
                              <li key={index}
                                  onClick={() => handleActivityClick(activity)}
                                  className={cn(
                                    "flex items-center justify-between p-2 rounded-md",
                                    activity.type === 'quiz' ? 'cursor-pointer hover:bg-accent' : ''
                                  )}>
                                  <div className="flex flex-col">
                                      <span className="font-medium text-sm">{activity.title}</span>
                                      {activity.subject && <Badge variant="outline" className='w-fit mt-1'>{activity.subject}</Badge>}
                                  </div>
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

      {selectedActivity && (
        <AlertDialog open={!!selectedActivity} onOpenChange={() => setSelectedActivity(null)}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Quiz Action</AlertDialogTitle>
                    <AlertDialogDescription>
                        What would you like to do with the quiz: "{selectedActivity.title}"?
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <Button variant="outline" onClick={() => handleViewResults(selectedActivity)}>View Results</Button>
                    <AlertDialogAction onClick={() => handleRetake(selectedActivity)}>Retake Quiz</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
      )}
    </>
  );
}
