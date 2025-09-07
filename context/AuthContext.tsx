// context/AuthContext.tsx
"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../lib/firebaseClient";
import { onAuthStateChanged, type User } from "firebase/auth"; // ✅ itilize "type User" la

// Defini ki done context la ap kenbe
type Ctx = {
  user: User | null;
  loading: boolean;
};

// Kreye context la
const AuthCtx = createContext<Ctx>({
  user: null,
  loading: true,
});

// Provider pou tout app la
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthCtx.Provider value={{ user, loading }}>
      {children}
    </AuthCtx.Provider>
  );
}

// Custom hook pou fasilite aksè a context la
export function useAuth() {
  return useContext(AuthCtx);
}
