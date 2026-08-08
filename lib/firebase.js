import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { initializeFirestore, getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

export const firebaseReady = Boolean(firebaseConfig.apiKey && firebaseConfig.projectId);

const app = firebaseReady ? (getApps().length ? getApp() : initializeApp(firebaseConfig)) : null;

export const auth = app ? getAuth(app) : null;

function createDb() {
  if (!app) return null;
  try {
    // Streaming WebChannel connections are blocked in some sandboxed/proxied
    // network environments, which makes Firestore hang forever with no error.
    // Long-polling works everywhere at the cost of a little latency.
    return initializeFirestore(app, { experimentalAutoDetectLongPolling: true });
  } catch {
    return getFirestore(app);
  }
}

export const db = createDb();
