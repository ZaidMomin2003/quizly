
'use client';

import { create } from 'zustand';
import { format } from 'date-fns';
import type { Quiz } from '@/ai/schemas/quiz';
import type { QuizResult } from '@/components/quizzes/QuizTaker';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';

type Subject = 'Physics' | 'Chemistry' | 'Biology' | 'Mixed';

export type { QuizResult };

export interface Activity {
  date: string;
  subject: Subject | string;
  title: string;
  type: 'quiz' | 'pomodoro' | 'quiz_generated';
  quiz?: Quiz;
  results?: QuizResult[];
}

interface AnalyticsData {
  stats: {
    subjects: Record<Subject, { solved: number; correct: number; attempted: number }>;
    pomodoroSessions: number;
  };
  weeklyProgress: Record<string, number>; // { 'YYYY-MM-DD': count }
  weakConcepts: Record<string, number>; // { topic: incorrectCount }
  activities: Activity[];
}

interface AnalyticsState extends AnalyticsData {
  isLoaded: boolean;
  userId: string | null;
  loadAnalytics: (userId: string) => Promise<void>;
  clearAnalytics: () => void;
  logQuiz: (data: { quiz: Quiz, results: QuizResult[], analytics: { topics: string[], questions: { topic: string, isCorrect: boolean }[], subject: Subject | string } }) => void;
  logQuizGeneration: (data: { subject: Subject; questionsGenerated: number, topics: string[] }) => void;
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
};

const initialState: AnalyticsData = {
  stats: initialStats,
  weeklyProgress: {},
  weakConcepts: {},
  activities: [],
};

const getAnalyticsDocRef = (userId: string) => doc(db, 'analytics', userId);

// Helper function to extract only the serializable data from the state
const extractSerializableData = (state: AnalyticsState): AnalyticsData => {
  return {
    stats: state.stats,
    weeklyProgress: state.weeklyProgress,
    weakConcepts: state.weakConcepts,
    activities: state.activities,
  };
};

export const useAnalyticsStore = create<AnalyticsState>((set, get) => ({
  ...initialState,
  isLoaded: false,
  userId: null,

  loadAnalytics: async (userId: string) => {
    if (get().isLoaded && get().userId === userId) return;
    set({ isLoaded: false, userId });

    try {
      const docRef = getAnalyticsDocRef(userId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data() as AnalyticsData;
        set({ ...data, isLoaded: true });
      } else {
        // No existing data, set initial state and create document
        await setDoc(docRef, initialState);
        set({ ...initialState, isLoaded: true });
      }
    } catch (error) {
      console.error("Error loading analytics from Firestore:", error);
      set({ isLoaded: true }); // Still set to true to unblock UI
    }
  },

  clearAnalytics: () => {
    set({ ...initialState, isLoaded: false, userId: null });
  },
  
  logQuizGeneration: (data) => {
    const currentState = get();
    if (!currentState.userId) return;

    const newStats = JSON.parse(JSON.stringify(currentState.stats));
    const { subject, questionsGenerated, topics } = data;

    if (!newStats.subjects[subject]) {
      newStats.subjects[subject] = { ...initialSubjectStats };
    }
    newStats.subjects[subject].attempted += questionsGenerated;

    const newActivity: Activity = {
        date: new Date().toISOString(),
        subject: subject,
        title: `Quiz Generated: ${topics.join(', ')}`,
        type: 'quiz_generated',
    };

    const newState = {
      stats: newStats,
      activities: [newActivity, ...currentState.activities].slice(0, 50),
    };

    set(newState);
    
    // Create the final data object to be saved, ensuring no functions are included.
    const dataToSave = {
        ...extractSerializableData(currentState),
        ...newState,
    };
    
    setDoc(getAnalyticsDocRef(currentState.userId), dataToSave, { merge: true });
  },

  logQuiz: ({ quiz, results, analytics }) => {
    const currentState = get();
    if (!currentState.userId) return;

    const today = format(new Date(), 'yyyy-MM-dd');
    const questionsSolvedCount = analytics.questions.length;

    const newStats = JSON.parse(JSON.stringify(currentState.stats));
    const newWeakConcepts = { ...currentState.weakConcepts };
    
    let subject: Subject | string = analytics.subject;
    if (!newStats.subjects[subject as Subject]) {
        newStats.subjects[subject as Subject] = { ...initialSubjectStats };
    }
    newStats.subjects[subject as Subject].solved += 1;
    newStats.subjects[subject as Subject].attempted += questionsSolvedCount;
    
    analytics.questions.forEach(q => {
        if (q.isCorrect) {
          newStats.subjects[subject as Subject].correct += 1;
        } else {
            const topic = q.topic;
            newWeakConcepts[topic] = (newWeakConcepts[topic] || 0) + 1;
        }
    });

    const newActivity: Activity = {
      date: new Date().toISOString(),
      subject: subject,
      title: `Quiz: ${analytics.topics.join(', ')}`,
      type: 'quiz',
      quiz: quiz,
      results: results,
    };
    
    const newState = {
        stats: newStats,
        weeklyProgress: {
            ...currentState.weeklyProgress,
            [today]: (currentState.weeklyProgress[today] || 0) + questionsSolvedCount,
        },
        weakConcepts: newWeakConcepts,
        activities: [newActivity, ...currentState.activities].slice(0, 50),
    };

    set(newState);

    const dataToSave = {
        ...extractSerializableData(currentState),
        ...newState
    };

    setDoc(getAnalyticsDocRef(currentState.userId), dataToSave, { merge: true });
  },

  logPomodoro: (task) => {
    const currentState = get();
    if (!currentState.userId) return;
    
    const newStats = JSON.parse(JSON.stringify(currentState.stats));
    newStats.pomodoroSessions += 1;

    const newActivity: Activity = {
        date: new Date().toISOString(),
        subject: 'Focus',
        title: `Pomodoro: ${task}`,
        type: 'pomodoro',
    };

    const newState = {
        stats: newStats,
        activities: [newActivity, ...currentState.activities].slice(0, 50),
    };

    set(newState);

    const dataToSave = {
      ...extractSerializableData(currentState),
      ...newState,
    };

    setDoc(getAnalyticsDocRef(currentState.userId), dataToSave, { merge: true });
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
}));
