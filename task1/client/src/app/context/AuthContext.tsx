"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import jwt from "jsonwebtoken";
interface AuthContextType {
  user: { id: string | null; email: string | null } | null;
  setUser: React.Dispatch<React.SetStateAction<string | null>>;
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const AuthContext = createContext<AuthContextType | undefined | any>(" ");
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<{
    id: string | null;
    email: string | null;
  } | null>(null);
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwt.decode(token);
        if (decoded && typeof decoded === "object") {
          setUser({ id: decoded.id, email: decoded.email });
        } else {
          console.warn("Decoded token is null");
        }
      } catch (err) {
        console.log(err);
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
