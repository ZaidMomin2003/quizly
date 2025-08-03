
'use client';

import { create } from 'zustand';
import type { QuizQuestion } from '@/ai/schemas/quiz';
import { doc, getDoc, setDoc, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export interface Bookmark extends QuizQuestion {
  id: string; // Using question as ID for simplicity
  subject: string;
  date: string;
}

interface BookmarkState {
  bookmarks: Bookmark[];
  isLoaded: boolean;
  userId: string | null;
  loadBookmarks: (userId: string) => Promise<void>;
  clearBookmarks: () => void;
  addBookmark: (bookmark: Bookmark) => void;
  removeBookmark: (bookmark: Bookmark) => void;
}

const getBookmarksDocRef = (userId: string) => doc(db, 'bookmarks', userId);

const initialState = {
    bookmarks: [],
    isLoaded: false,
    userId: null,
};

export const useBookmarkStore = create<BookmarkState>((set, get) => ({
  ...initialState,
  
  loadBookmarks: async (userId: string) => {
    if (get().isLoaded && get().userId === userId) return;
    set({ isLoaded: false, userId });
    try {
        const docRef = getBookmarksDocRef(userId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            set({ bookmarks: docSnap.data().bookmarks || [], isLoaded: true });
        } else {
            // No existing bookmarks, create document
            await setDoc(docRef, { bookmarks: [] });
            set({ bookmarks: [], isLoaded: true });
        }
    } catch(error) {
        console.error("Error loading bookmarks:", error);
        set({ isLoaded: true }); // Unblock UI
    }
  },

  clearBookmarks: () => set({ ...initialState }),

  addBookmark: async (bookmark) => {
    const { userId } = get();
    if (!userId) return;

    set((state) => ({
        bookmarks: [bookmark, ...state.bookmarks],
    }));

    try {
        const docRef = getBookmarksDocRef(userId);
        await updateDoc(docRef, {
            bookmarks: arrayUnion(bookmark)
        });
    } catch(error) {
        console.error("Error adding bookmark:", error);
        // Optionally revert state on error
        set((state) => ({
            bookmarks: state.bookmarks.filter(b => b.id !== bookmark.id)
        }));
    }
  },

  removeBookmark: async (bookmark) => {
    const { userId } = get();
    if (!userId) return;

    set((state) => ({
        bookmarks: state.bookmarks.filter((b) => b.id !== bookmark.id),
    }));

    try {
        const docRef = getBookmarksDocRef(userId);
        await updateDoc(docRef, {
            bookmarks: arrayRemove(bookmark)
        });
    } catch (error) {
        console.error("Error removing bookmark:", error);
        // Optionally revert state on error
         set((state) => ({
            bookmarks: [bookmark, ...state.bookmarks],
        }));
    }
  },
}));
