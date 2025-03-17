"use client";

import { createContext, useState, useEffect, ReactNode } from "react";
import { login, logout, getAuthToken } from "app/infrastructure/externals/api/auth";

interface AuthContextType {
  user: { userId: number; username: string; isAdmin: boolean } | null;
  loginUser: (username: string, password: string) => Promise<void>;
  logoutUser: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<{ userId: number; username: string; isAdmin: boolean } | null>(
    null
  );
 
  useEffect(() => {
    const token = getAuthToken();
    if (token) {
      setUser({ userId: 1, username: "Usuario", isAdmin: false });
    }
  }, []);

  const loginUser = async (username: string, password: string) => {
    const userData = await login(username, password);
    setUser({ userId: userData.userId, username: userData.name, isAdmin: userData.isAdmin });
  };

  const logoutUser = () => {
    logout();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loginUser, logoutUser }}>
      {children}
    </AuthContext.Provider>
  );
}
