"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import jwt from "jsonwebtoken";
interface User {
  id: string | null;
  email: string | null;
}

interface AuthContextType {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const AuthContext = createContext<AuthContextType | undefined | any>(undefined);
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwt.decode(token) as { id: string; email: string };
        if (decoded && decoded.id && decoded.email) {
          setUser({ id: decoded.id, email: decoded.email });
        } else {
          console.warn("Invalid token structure:", decoded);
        }
      } catch (err) {
        console.error("Error decoding token:", err);
      }
    }
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
