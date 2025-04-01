// Import the functions you need from the SDKs you need
import { FirebaseError, initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { connectAuthEmulator, getAuth } from "firebase/auth";
import { connectFirestoreEmulator, getFirestore } from "firebase/firestore";
import { connectFunctionsEmulator, getFunctions } from "firebase/functions";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = typeof window !== "undefined" ? getAnalytics(app) : null;

// Initialize services
const auth = getAuth(app);
const firestore = getFirestore(app);
const functions = getFunctions(app);

// Connect to emulators if NEXT_PUBLIC_FIREBASE_USE_EMULATOR is true
if (process.env.NEXT_PUBLIC_FIREBASE_USE_EMULATOR === "true") {
  // Emulator host and port configuration
  const emulatorHost = "localhost";
  const authPort = 9099;
  const firestorePort = 8080;
  const functionsPort = 5001;

  // Connect to respective emulators
  connectAuthEmulator(auth, `http://${emulatorHost}:${authPort}`);
  connectFirestoreEmulator(firestore, emulatorHost, firestorePort);
  connectFunctionsEmulator(functions, emulatorHost, functionsPort);

  console.log("🚀 Firebase Emulators Connected");
}

function getErrMsg(error: FirebaseError) {
  switch (error.code) {
    case "auth/invalid-credential":
      return "Wrong email or password";
    default:
      console.log(`Unknown Error: ${error.code}`);
      return error.code;
  }
}

export { app, analytics, auth, firestore, functions, getErrMsg };
