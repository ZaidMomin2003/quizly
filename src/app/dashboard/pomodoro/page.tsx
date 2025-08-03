

'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Timer, Play, Pause, RotateCcw, Lightbulb, Loader2 } from 'lucide-react';
import { usePomodoroStore } from '@/stores/pomodoro-store';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Header } from '@/components/dashboard/Header';
import { cn } from '@/lib/utils';
import { useEffect } from 'react';

const pomodoroFormSchema = z.object({
  task: z.string().min(1, 'Task name is required.'),
  sessions: z.coerce.number().int().min(1, 'At least 1 session is required.').max(10, 'Maximum 10 sessions.'),
});

type PomodoroFormValues = z.infer<typeof pomodoroFormSchema>;

const benefits = [
    { title: 'Improved Focus', description: 'Short, timed intervals help you concentrate and reduce distractions.' },
    { title: 'Prevents Burnout', description: 'Regular breaks prevent mental fatigue and keep you fresh.' },
    { title: 'Increased Productivity', description: 'Breaking down large tasks into smaller chunks makes them more manageable.' },
    { title: 'Better Time Management', description: 'Track your work and understand how you spend your time.' },
];

export default function PomodoroPage() {
  const {
    task,
    sessions,
    currentSession,
    mode,
    timeLeft,
    isActive,
    isLoaded,
    setTask,
    setSessions,
    startTimer,
    pauseTimer,
    resetTimer,
    tick,
  } = usePomodoroStore();

  const form = useForm<PomodoroFormValues>({
    resolver: zodResolver(pomodoroFormSchema),
    defaultValues: {
      task: task || '',
      sessions: sessions || 1,
    },
  });

  const isTimerRunningOrPaused = !!task;

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isActive) {
      interval = setInterval(() => {
        tick();
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, tick]);

  const onSubmit = (data: PomodoroFormValues) => {
    setTask(data.task);
    setSessions(data.sessions);
    startTimer();
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  if (!isLoaded) {
    return (
        <div className="flex flex-col h-screen bg-background">
            <Header />
            <main className="flex-1 flex flex-col items-center justify-center gap-4">
                <Loader2 className="h-12 w-12 animate-spin text-primary" />
                <h2 className="text-xl font-semibold">Loading Pomodoro Timer...</h2>
            </main>
        </div>
    )
  }


  return (
    <div className="flex flex-col h-screen bg-background">
      <Header />
      <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            <Card className="w-full">
            <CardHeader>
                <div className="flex items-center gap-2">
                <Timer className="h-6 w-6 text-primary" />
                <CardTitle>Pomodoro Timer</CardTitle>
                </div>
                <CardDescription>Focus on your tasks with the Pomodoro technique.</CardDescription>
            </CardHeader>
            <CardContent>
                {isTimerRunningOrPaused ? (
                <div className="text-center space-y-6">
                    <p className="text-lg font-semibold text-muted-foreground">{task}</p>
                    <div className="relative w-48 h-48 mx-auto">
                        <svg className="w-full h-full" viewBox="0 0 100 100">
                            <circle className="text-muted/20" strokeWidth="7" cx="50" cy="50" r="45" fill="transparent"></circle>
                            <circle
                                className={cn("transition-all duration-1000 ease-linear", mode === 'work' ? 'text-primary' : 'text-green-500')}
                                strokeWidth="7"
                                strokeDasharray="283"
                                strokeDashoffset={283 - (timeLeft / (mode === 'work' ? 25 * 60 : 5 * 60)) * 283}
                                cx="50"
                                cy="50"
                                r="45"
                                fill="transparent"
                                transform="rotate(-90 50 50)"
                            ></circle>
                        </svg>
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                            <h2 className="text-5xl font-bold">{formatTime(timeLeft)}</h2>
                            <p className="text-muted-foreground uppercase tracking-widest">{mode}</p>
                        </div>
                    </div>

                    <p className="text-muted-foreground">Session {currentSession} of {sessions}</p>

                    <div className="flex justify-center gap-4">
                    <Button onClick={isActive ? pauseTimer : startTimer} size="lg">
                        {isActive ? <Pause className="mr-2" /> : <Play className="mr-2" />}
                        {isActive ? 'Pause' : 'Resume'}
                    </Button>
                    <Button onClick={resetTimer} variant="outline" size="lg">
                        <RotateCcw className="mr-2" />
                        Reset
                    </Button>
                    </div>
                </div>
                ) : (
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                        control={form.control}
                        name="task"
                        render={({ field }) => (
                        <FormItem>
                            <FormLabel>Task</FormLabel>
                            <FormControl>
                            <Input placeholder="e.g., Solve Physics problems" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="sessions"
                        render={({ field }) => (
                        <FormItem>
                            <FormLabel>Number of Sessions</FormLabel>
                            <FormControl>
                            <Input type="number" min="1" max="10" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                        )}
                    />
                    <Button type="submit" className="w-full" size="lg">
                        <Play className="mr-2" />
                        Start Focusing
                    </Button>
                    </form>
                </Form>
                )}
            </CardContent>
            </Card>

             <Card>
                <CardHeader>
                    <div className="flex items-center gap-2">
                        <Lightbulb className="h-6 w-6 text-primary" />
                        <CardTitle>Benefits of Pomodoro</CardTitle>
                    </div>
                    <CardDescription>Why this simple technique is so effective.</CardDescription>
                </CardHeader>
                <CardContent>
                    <ul className="space-y-4">
                        {benefits.map((benefit) => (
                            <li key={benefit.title} className='flex items-start gap-4'>
                                <div className='flex-shrink-0 p-2 bg-primary/10 rounded-full mt-1'>
                                    <CheckCircle2 className="h-5 w-5 text-primary" />
                                </div>
                                <div>
                                    <p className="font-semibold">{benefit.title}</p>
                                    <p className="text-sm text-muted-foreground">{benefit.description}</p>
                                </div>
                            </li>
                        ))}
                    </ul>
                </CardContent>
            </Card>
        </div>
      </main>
    </div>
  );
}

// Dummy CheckCircle2 icon until we decide to add it to lucide-react
const CheckCircle2 = (props: any) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/>
        <path d="m9 12 2 2 4-4"/>
    </svg>
);
