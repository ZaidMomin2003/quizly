
'use client';

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { format } from 'date-fns';

type Subject = 'Physics' | 'Chemistry' | 'Biology' | 'Mixed';

export interface Activity {
  date: string;
  subject: Subject | string;
  title: string;
  type: 'quiz' | 'pomodoro';
}

interface AnalyticsState {
  stats: {
    subjects: Record<Subject, { solved: number; correct: number; attempted: number }>;
    pomodoroSessions: number;
  };
  weeklyProgress: Record<string, number>; // { 'YYYY-MM-DD': count }
  weakConcepts: Record<string, number>; // { topic: incorrectCount }
  activities: Activity[];
  logQuiz: (quiz: { topics: string[], questions: { topic: string, isCorrect: boolean }[], subject: Subject | string }) => void;
  logPomodoro: (task: string) => void;
  getTopWeakConcepts: (count: number) => { topic: string; count: number }[];
  getWeeklyChartData: () => { day: string, questions: number }[];
}

const initialSubjectStats = {
  solved: 0,
  correct: 0,
  attempted: 0,
};

const initialStats = {
  subjects: {
    Physics: { ...initialSubjectStats },
    Chemistry: { ...initialSubjectStats },
    Biology: { ...initialSubjectStats },
    Mixed: { ...initialSubjectStats },
  },
  pomodoroSessions: 0,
}

export const useAnalyticsStore = create<AnalyticsState>()(
  persist(
    (set, get) => ({
      stats: initialStats,
      weeklyProgress: {},
      weakConcepts: {},
      activities: [],

      logQuiz: (quiz) => {
        const today = format(new Date(), 'yyyy-MM-dd');
        const questionsSolvedCount = quiz.questions.length;

        set((state) => {
          const newStats = JSON.parse(JSON.stringify(state.stats));
          const newWeakConcepts = { ...state.weakConcepts };
          
          let subject: Subject | string = quiz.subject;
          if (!newStats.subjects[subject as Subject]) {
              newStats.subjects[subject as Subject] = { ...initialSubjectStats };
          }
          
          newStats.subjects[subject as Subject].attempted += quiz.questions.length;

          quiz.questions.forEach(q => {
              if (q.isCorrect) {
                newStats.subjects[subject as Subject].correct += 1;
              } else {
                  const topic = q.topic;
                  newWeakConcepts[topic] = (newWeakConcepts[topic] || 0) + 1;
              }
          });

          const newActivity: Activity = {
            date: today,
            subject: subject,
            title: `Quiz: ${quiz.topics.join(', ')}`,
            type: 'quiz',
          };
          
          return {
            stats: newStats,
            weeklyProgress: {
                ...state.weeklyProgress,
                [today]: (state.weeklyProgress[today] || 0) + questionsSolvedCount,
            },
            weakConcepts: newWeakConcepts,
            activities: [newActivity, ...state.activities].slice(0, 50),
          };
        });
      },

      logPomodoro: (task) => {
        const today = format(new Date(), 'yyyy-MM-dd');
         set((state) => {
            const newStats = JSON.parse(JSON.stringify(state.stats));
            newStats.pomodoroSessions += 1;

            const newActivity: Activity = {
                date: today,
                subject: 'Focus',
                title: `Pomodoro: ${task}`,
                type: 'pomodoro',
            };

            return {
                stats: newStats,
                activities: [newActivity, ...state.activities].slice(0, 50),
            };
        });
      },

      getTopWeakConcepts: (count: number) => {
        const weakConcepts = get().weakConcepts;
        return Object.entries(weakConcepts)
          .sort(([, a], [, b]) => b - a)
          .slice(0, count)
          .map(([topic, count]) => ({ topic, count }));
      },

      getWeeklyChartData: () => {
        const weeklyProgress = get().weeklyProgress;
        const today = new Date();
        const chartData = Array.from({ length: 7 }).map((_, i) => {
            const date = new Date(today);
            date.setDate(today.getDate() - (6 - i));
            const dayKey = format(date, 'yyyy-MM-dd');
            return {
                day: format(date, 'EEE').toUpperCase(),
                questions: weeklyProgress[dayKey] || 0,
            };
        });
        return chartData;
      },
    }),
    {
      name: 'quizlyai-analytics-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
