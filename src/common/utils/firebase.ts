import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getFunctions } from "firebase/functions";

const firebaseConfig = JSON.parse(import.meta.env.VITE_FIREBASE_CONFIG ?? '{}');

const app = initializeApp(firebaseConfig);
export const firestore = getFirestore(app);
export const functions = getFunctions(app);
