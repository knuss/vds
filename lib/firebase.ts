import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyBjWEm1kzHRWlmRqBKM8pE52dKQ8mAqCRo',
  authDomain: 'freelancer-4c52f.firebaseapp.com',
  databaseURL: 'https://freelancer-4c52f.firebaseio.com',
  projectId: 'freelancer-4c52f',
  storageBucket: 'freelancer-4c52f.firebasestorage.app',
  messagingSenderId: '86686743843',
  appId: '1:86686743843:web:b1614caf35896f8c472096',
  measurementId: 'G-0DBKTPVDRL',
};

export const app = initializeApp(firebaseConfig);
export const analytics = typeof window !== 'undefined' ? getAnalytics(app) : null;
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
