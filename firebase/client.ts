import { initializeApp, getApp, getApps} from "firebase/app";
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB7Ya6dFfu3BjxJZkg4KDWZ4jA9i4jhFWQ",
  authDomain: "interlab-e1795.firebaseapp.com",
  projectId: "interlab-e1795",
  storageBucket: "interlab-e1795.firebasestorage.app",
  messagingSenderId: "1001047083627",
  appId: "1:1001047083627:web:1af9fda966a0f96824ff2e",
  measurementId: "G-HGMRSF92M3"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

export const auth = getAuth(app);
export const db = getFirestore(app);