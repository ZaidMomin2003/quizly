
'use client';

import { create } from 'zustand';
import { useAnalyticsStore } from './analytics-store';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';

const WORK_MINUTES = 25 * 60;
const BREAK_MINUTES = 5 * 60;

type PomodoroMode = 'work' | 'break';

interface PomodoroData {
  task: string | null;
  sessions: number;
  currentSession: number;
  mode: PomodoroMode;
  timeLeft: number;
  isActive: boolean;
}

interface PomodoroState extends PomodoroData {
  isLoaded: boolean;
  userId: string | null;
  loadPomodoro: (userId: string) => Promise<void>;
  clearPomodoro: () => void;
  setTask: (task: string) => void;
  setSessions: (sessions: number) => void;
  startTimer: () => void;
  pauseTimer: () => void;
  resetTimer: () => void;
  tick: () => void;
  _updateFirestore: (data: Partial<PomodoroData>) => void;
}

const getPomodoroDocRef = (userId: string) => doc(db, 'pomodoro', userId);

const initialState: PomodoroData & { isLoaded: boolean, userId: string | null } = {
  task: null,
  sessions: 1,
  currentSession: 1,
  mode: 'work',
  timeLeft: WORK_MINUTES,
  isActive: false,
  isLoaded: false,
  userId: null,
};

export const usePomodoroStore = create<PomodoroState>((set, get) => ({
  ...initialState,

  _updateFirestore: async (data) => {
    const { userId } = get();
    if (!userId || !get().isLoaded) return;
    try {
        const docRef = getPomodoroDocRef(userId);
        await setDoc(docRef, data, { merge: true });
    } catch (error) {
        console.error("Error updating Pomodoro state in Firestore:", error);
    }
  },

  loadPomodoro: async (userId: string) => {
    if (get().isLoaded && get().userId === userId) return;
    set({ userId, isLoaded: false });
    try {
        const docRef = getPomodoroDocRef(userId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            set({ ...(docSnap.data() as PomodoroData), isLoaded: true });
        } else {
            await setDoc(docRef, { ...initialState, isLoaded: true, userId });
            set({ isLoaded: true });
        }
    } catch(error) {
        console.error("Error loading Pomodoro state from Firestore:", error);
        set({ isLoaded: true }); // Unblock UI
    }
  },

  clearPomodoro: () => set({ ...initialState }),

  setTask: (task) => {
    const newState = { task };
    set(newState);
    get()._updateFirestore(newState);
  },

  setSessions: (sessions) => {
    const newState = { sessions, currentSession: 1 };
    set(newState);
    get()._updateFirestore(newState);
  },

  startTimer: () => {
    const newState = { isActive: true };
    set(newState);
    get()._updateFirestore(newState);
  },
  
  pauseTimer: () => {
    const newState = { isActive: false };
    set(newState);
    get()._updateFirestore(newState);
  },

  resetTimer: () => {
    const newState = {
      task: null,
      sessions: 1,
      currentSession: 1,
      mode: 'work' as PomodoroMode,
      timeLeft: WORK_MINUTES,
      isActive: false,
    };
    set(newState);
    get()._updateFirestore(newState);
  },

  tick: () => {
    const { timeLeft, mode, currentSession, sessions, isActive, task } = get();

    if (!isActive) return;

    if (timeLeft > 0) {
      const newState = { timeLeft: timeLeft - 1 };
      set(newState);
       // We don't update Firestore every second to avoid excessive writes.
       // It will be updated on state changes like pause, reset, mode change.
    } else {
      // Timer finished
      if (mode === 'work') {
        if (currentSession < sessions) {
          // Start a break
          const newState = {
            mode: 'break' as PomodoroMode,
            timeLeft: BREAK_MINUTES,
          };
          set(newState);
          get()._updateFirestore(newState);
        } else {
          // All sessions are complete
          if (task) {
            useAnalyticsStore.getState().logPomodoro(task);
          }
          get().resetTimer(); // This will also update Firestore
        }
      } else if (mode === 'break') {
        // Start next work session
        const newState = {
          mode: 'work' as PomodoroMode,
          timeLeft: WORK_MINUTES,
          currentSession: currentSession + 1,
        };
        set(newState);
        get()._updateFirestore(newState);
      }
    }
  },
}));
