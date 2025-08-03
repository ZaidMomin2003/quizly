import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut as firebaseSignOut,
  updateProfile,
  type User,
} from 'firebase/auth';
import { app, db } from './firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';

const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

// Error handling helper
const getFirebaseAuthErrorMessage = (error: any): string => {
    switch (error.code) {
        case 'auth/invalid-email':
            return 'The email address is not valid.';
        case 'auth/user-disabled':
            return 'This user account has been disabled.';
        case 'auth/user-not-found':
            return 'No user found with this email.';
        case 'auth/wrong-password':
            return 'Incorrect password. Please try again.';
        case 'auth/email-already-in-use':
            return 'This email address is already in use by another account.';
        case 'auth/weak-password':
            return 'The password is too weak. Please use at least 6 characters.';
        case 'auth/popup-closed-by-user':
            return 'The sign-in process was cancelled. Please try again.';
        case 'auth/cancelled-popup-request':
            return 'The sign-in process was cancelled. Please try again.';
        default:
            return error.message || 'An unexpected error occurred. Please try again.';
    }
};

const isNewUser = async (userId: string): Promise<boolean> => {
    const userDocRef = doc(db, 'users', userId);
    const docSnap = await getDoc(userDocRef);
    // If the document doesn't exist, it's a new user in our system.
    // metadata.creationTime could also be used but this check is simpler
    // and covers users created via different methods (e.g. Google auth)
    return !docSnap.exists();
};


// Sign up with email and password
export const signUpWithEmail = async (email: string, password: string, displayName: string): Promise<{user: User, isNew: boolean}> => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(userCredential.user, { displayName });
    return { user: userCredential.user, isNew: true }; // Email signup is always a new user for our app logic
  } catch (error) {
    throw new Error(getFirebaseAuthErrorMessage(error));
  }
};

// Sign in with email and password
export const signInWithEmail = async (email: string, password: string): Promise<{user: User, isNew: boolean}> => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const isNew = await isNewUser(userCredential.user.uid);
    return { user: userCredential.user, isNew };
  } catch (error) {
    throw new Error(getFirebaseAuthErrorMessage(error));
  }
};

// Sign in with Google
export const signInWithGoogle = async (): Promise<{user: User, isNew: boolean}> => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const isNew = await isNewUser(result.user.uid);
    return { user: result.user, isNew };
  } catch (error) {
    throw new Error(getFirebaseAuthErrorMessage(error));
  }
};

// Sign out
export const signOut = async (): Promise<void> => {
  try {
    await firebaseSignOut(auth);
  } catch (error) {
    console.error('Error signing out:', error);
    throw new Error('Failed to sign out.');
  }
};

// Auth state listener
export const onAuthStateChanged = (callback: (user: User | null) => void) => {
  return auth.onAuthStateChanged(callback);
};