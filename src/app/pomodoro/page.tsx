
'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Timer, Play, Pause, RotateCcw } from 'lucide-react';
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

export default function PomodoroPage() {
  const {
    task,
    sessions,
    currentSession,
    mode,
    timeLeft,
    isActive,
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

  const isTimerRunningOrPaused = isActive || timeLeft < (mode === 'work' ? 25 * 60 : 5 * 60);

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

  return (
    <div className="flex flex-col h-screen bg-background">
      <Header />
      <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 flex items-center justify-center">
        <Card className="w-full max-w-lg">
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
      </main>
    </div>
  );
}
