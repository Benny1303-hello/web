'use client';

import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { doc, onSnapshot } from 'firebase/firestore';
import { auth, db, firebaseReady } from '@/lib/firebase';

const AuthContext = createContext({
  user: null,
  profile: null,
  loading: true,
  firebaseReady: false,
  logout: async () => {},
});

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!firebaseReady) {
      setLoading(false);
      return undefined;
    }

    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!firebaseReady || !user) {
      setProfile(null);
      return undefined;
    }

    const unsubscribe = onSnapshot(doc(db, 'users', user.uid), (snap) => {
      setProfile(snap.exists() ? snap.data() : null);
    });

    return () => unsubscribe();
  }, [user]);

  const logout = async () => {
    if (!firebaseReady) return;
    await signOut(auth);
  };

  const value = useMemo(
    () => ({ user, profile, loading, firebaseReady, logout }),
    [user, profile, loading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
