"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

interface AuthContextType {
  user: string | null;
  setUser: React.Dispatch<React.SetStateAction<string | null>>;
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const AuthContext = createContext<AuthContextType | undefined | any>(" ");
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<string | null>(null);
  useEffect(() => {
    const token = localStorage.getItem("token");
    setUser(token);
  }, []);
  return (
    <AuthContext.Provider value={{ user, setUser }}>
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
