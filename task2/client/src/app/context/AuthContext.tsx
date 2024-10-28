/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, createContext, useContext } from "react";

interface User {
  id: string | null;
  username: string | null;
  role: number | null;
  token: string;
}
interface AuthContextType {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  logout: () => void;
}
const AuthContext = createContext<AuthContextType | undefined | any>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const logout = () => {
    setUser(null);
  };
  return (
    <AuthContext.Provider value={{ user, setUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be within AuthProvider");
  }
  return context;
};
