import { useState } from "react";
import {
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  updateProfile,
  signOut as firebaseSignOut,
  User,
} from "firebase/auth";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { Firestore } from "firebase/firestore";
import { useDocumentData } from "react-firebase-hooks/firestore";
import { firestore } from "./init";
import { User as AppUser } from "@/firebase/models/user";

/**
 * Hook for user sign up
 * @param auth Firebase Auth instance
 * @param firestore Firestore instance
 * @returns Sign up function and loading state
 */
export const useSignUp = (auth: Auth, firestore: Firestore) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const signUp = async (
    email: string,
    password: string,
    displayName?: string
  ) => {
    setIsLoading(true);
    setError(null);

    try {
      // Create user with email and password
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      // Update profile if display name provided
      if (displayName) {
        await updateProfile(user, { displayName });
      }

      // Create user document in Firestore
      await createUserDocument(firestore, user, displayName);

      return userCredential;
    } catch (error) {
      console.error("Sign up error:", error);
      setError(error instanceof Error ? error : new Error("Sign up failed"));
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return { signUp, isLoading, error };
};

/**
 * Hook for user sign in with email and password
 * @param auth Firebase Auth instance
 * @returns Sign in function and loading state
 */
export const useSignIn = (auth: Auth) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const signIn = async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);

    try {
      return await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.error("Sign in error:", error);
      setError(error instanceof Error ? error : new Error("Sign in failed"));
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return { signIn, isLoading, error };
};

/**
 * Hook for Google sign in
 * @param auth Firebase Auth instance
 * @param firestore Firestore instance
 * @returns Google sign in function and loading state
 */
export const useGoogleSignIn = (auth: Auth, firestore: Firestore) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const googleProvider = new GoogleAuthProvider();

  const signInWithGoogle = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const userCredential = await signInWithPopup(auth, googleProvider);
      const user = userCredential.user;

      // Create or update user document in Firestore
      await createUserDocument(firestore, user);

      return userCredential;
    } catch (error) {
      console.error("Google sign in error:", error);
      setError(
        error instanceof Error ? error : new Error("Google sign in failed")
      );
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return { signInWithGoogle, isLoading, error };
};

/**
 * Hook for sign out
 * @param auth Firebase Auth instance
 * @returns Sign out function and loading state
 */
export const useSignOut = (auth: Auth) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const signOut = async () => {
    setIsLoading(true);
    setError(null);

    try {
      await firebaseSignOut(auth);
    } catch (error) {
      console.error("Sign out error:", error);
      setError(error instanceof Error ? error : new Error("Sign out failed"));
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return { signOut, isLoading, error };
};

/**
 * Hook to get current user
 * @param auth Firebase Auth instance
 * @returns Current user
 */
export const useCurrentUser = (auth: Auth) => {
  const [profile] = useDocumentData(
    doc(firestore, "users", auth.currentUser?.uid ?? "null")
  );
  return { user: auth.currentUser, profile: profile as AppUser | undefined };
};

export const useCachedCurrentUser = (auth: Auth) => {
  return { user: auth.currentUser, profile: undefined };
};

/**
 * Create or update user document in Firestore
 * @param firestore Firestore instance
 * @param user Firebase user object
 * @param displayName Optional display name
 */
const createUserDocument = async (
  firestore: Firestore,
  user: User,
  displayName?: string
) => {
  if (!user) return;

  const userRef = doc(firestore, "users", user.uid);

  try {
    await setDoc(
      userRef,
      {
        email: user.email,
        displayName: displayName || user.displayName,
        profilePicture: user.photoURL || null,
        dateCreated: serverTimestamp(),
        lastLogin: serverTimestamp(),
      },
      { merge: true }
    );
  } catch (error) {
    console.error("Error creating user document:", error);
    throw error;
  }
};
