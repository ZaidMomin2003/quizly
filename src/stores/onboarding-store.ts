
'use client';

import { create } from 'zustand';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export interface OnboardingData {
  exam?: 'NEET' | 'JEE Main' | 'JEE Advanced';
  yearOfStudy?: 'first_year' | 'second_year' | 'repeater';
  source?: string;
  mobileNumber?: string;
  onboardingCompleted: boolean;
}

interface OnboardingState {
  formData: OnboardingData;
  isLoaded: boolean;
  userId: string | null;
  loadOnboardingData: (userId: string) => Promise<void>;
  setFormData: (data: Partial<OnboardingData>) => void;
  saveOnboardingData: (userId: string, data: Partial<OnboardingData>) => Promise<void>;
  clearOnboarding: () => void;
}

const getOnboardingDocRef = (userId: string) => doc(db, 'users', userId);

const initialState: OnboardingData & { isLoaded: boolean, userId: string | null } = {
  formData: { onboardingCompleted: false },
  isLoaded: false,
  userId: null,
};

export const useOnboardingStore = create<OnboardingState>((set, get) => ({
  ...initialState,
  
  loadOnboardingData: async (userId: string) => {
    if (get().isLoaded && get().userId === userId) return;
    set({ userId, isLoaded: false });
    try {
        const docRef = getOnboardingDocRef(userId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            set({ formData: docSnap.data() as OnboardingData, isLoaded: true });
        } else {
            set({ isLoaded: true }); // No data, but loading is complete
        }
    } catch(error) {
        console.error("Error loading onboarding data from Firestore:", error);
        set({ isLoaded: true });
    }
  },

  setFormData: (data) => {
    set(state => ({
      formData: { ...state.formData, ...data }
    }));
  },

  saveOnboardingData: async (userId: string, data: Partial<OnboardingData>) => {
    const finalData = { ...get().formData, ...data, onboardingCompleted: true };
    set({ formData: finalData });
    try {
        const docRef = getOnboardingDocRef(userId);
        await setDoc(docRef, finalData, { merge: true });
    } catch (error) {
        console.error("Error saving onboarding data to Firestore:", error);
    }
  },

  clearOnboarding: () => set({ ...initialState }),
}));
