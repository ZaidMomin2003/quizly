
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { useAnalyticsStore } from './analytics-store';

const WORK_MINUTES = 25 * 60;
const BREAK_MINUTES = 5 * 60;

type PomodoroMode = 'work' | 'break';

interface PomodoroState {
  task: string | null;
  sessions: number;
  currentSession: number;
  mode: PomodoroMode;
  timeLeft: number;
  isActive: boolean;
  setTask: (task: string) => void;
  setSessions: (sessions: number) => void;
  startTimer: () => void;
  pauseTimer: () => void;
  resetTimer: () => void;
  tick: () => void;
}

export const usePomodoroStore = create<PomodoroState>()(
  persist(
    (set, get) => ({
      task: null,
      sessions: 1,
      currentSession: 1,
      mode: 'work',
      timeLeft: WORK_MINUTES,
      isActive: false,

      setTask: (task) => set({ task }),
      setSessions: (sessions) => set({ sessions, currentSession: 1 }),

      startTimer: () => set({ isActive: true }),
      pauseTimer: () => set({ isActive: false }),
      resetTimer: () =>
        set({
          task: null,
          sessions: 1,
          currentSession: 1,
          mode: 'work',
          timeLeft: WORK_MINUTES,
          isActive: false,
        }),

      tick: () => {
        const { timeLeft, mode, currentSession, sessions, isActive, task } = get();

        if (!isActive) return;

        if (timeLeft > 0) {
          set({ timeLeft: timeLeft - 1 });
        } else {
          // Timer finished
          if (mode === 'work') {
            if (currentSession < sessions) {
              // Start a break
              set({
                mode: 'break',
                timeLeft: BREAK_MINUTES,
              });
            } else {
              // All sessions are complete
              if (task) {
                useAnalyticsStore.getState().logPomodoro(task);
              }
              get().resetTimer();
            }
          } else if (mode === 'break') {
            // Start next work session
            set({
              mode: 'work',
              timeLeft: WORK_MINUTES,
              currentSession: currentSession + 1,
            });
          }
        }
      },
    }),
    {
      name: 'pomodoro-storage', // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => sessionStorage), // (optional) by default, 'localStorage' is used
    }
  )
);
