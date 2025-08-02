
'use client';

import { usePomodoroStore } from '@/stores/pomodoro-store';
import { Timer, Pause, Play, RotateCcw } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '../ui/button';

export function PomodoroTimer() {
  const { task, timeLeft, mode, isActive, pauseTimer, startTimer, resetTimer } = usePomodoroStore();

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };
  
  if (!task) {
    return null;
  }

  return (
    <div className="p-2 border rounded-lg bg-background mb-2 group-data-[collapsible=icon]:hidden">
        <div className='flex items-center justify-between'>
            <div>
                <p className='text-sm font-semibold truncate'>{task}</p>
                <p className={cn("text-xs uppercase font-bold", mode === 'work' ? 'text-primary' : 'text-green-500')}>{mode}</p>
            </div>
            <p className='text-2xl font-bold font-mono'>{formatTime(timeLeft)}</p>
        </div>
        <div className='flex gap-2 mt-2'>
            <Button onClick={isActive ? pauseTimer : startTimer} size="sm" className='flex-1'>
                {isActive ? <Pause /> : <Play />}
                <span className="sr-only">{isActive ? 'Pause' : 'Play'}</span>
            </Button>
            <Button onClick={resetTimer} size="sm" variant="ghost">
                <RotateCcw />
                <span className="sr-only">Reset</span>
            </Button>
        </div>
    </div>
  );
}

