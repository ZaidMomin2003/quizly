
'use client';

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { QuizQuestion } from '@/ai/schemas/quiz';

export interface Bookmark extends QuizQuestion {
  id: string; // Using question as ID for simplicity
  subject: string;
  date: string;
}

interface BookmarkState {
  bookmarks: Bookmark[];
  addBookmark: (bookmark: Bookmark) => void;
  removeBookmark: (questionId: string) => void;
}

export const useBookmarkStore = create<BookmarkState>()(
  persist(
    (set) => ({
      bookmarks: [],
      addBookmark: (bookmark) =>
        set((state) => ({
          bookmarks: [bookmark, ...state.bookmarks],
        })),
      removeBookmark: (questionId) =>
        set((state) => ({
          bookmarks: state.bookmarks.filter((b) => b.id !== questionId),
        })),
    }),
    {
      name: 'quizlyai-bookmark-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
