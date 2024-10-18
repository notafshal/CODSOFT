"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/context/AuthContext";
import jwt from "jsonwebtoken";

const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const router = useRouter();
  const { setUser } = useAuth();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleLogin = async (e: any) => {
    e.preventDefault();
    await axios
      .post("http://localhost:5000/api/auth/login", { email, password })
      .then((result) => {
        if (result.status === 200) {
          const token = result.data.token;
          const decoded = jwt.decode(token) as {
            id: string;
            email: string;
          };
          const isAdmin = result.data.isRole;
          setUser({
            id: decoded.id,
            email: decoded.email,
            isRole: isAdmin,
          });

          localStorage.setItem("token", token);
          // eslint-disable-next-line @typescript-eslint/no-unused-expressions
          isAdmin === 1 ? router.push("/dashboard") : router.push("/");
        } else {
          alert(result.data);
        }
      })
      .catch((err) => {
        console.log(err);
        alert("An error occurred. Please try again.");
      });
  };
  return (
    <>
      <div className="w-screen h-screen flex flex-col justify-center">
        <div className="bg-gray-200 h-screen w-screen md:h-96 md:w-96 mx-auto rounded-md">
          <div className="flex flex-col mx-28 my-28 lg:my-20 gap-4">
            <p className="text-center">Login</p>
            <form className="flex flex-col gap-4" onSubmit={handleLogin}>
              <input
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="email"
                type="text"
                className="p-1 rounded-md"
              />

              <input
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="password"
                type="password"
                className="p-1 rounded-md"
              />
              <Button type="submit" variant="outline">
                Login
              </Button>
            </form>
            <p className="text-xs font-extralight">
              Don&apos;t have an account?
              <Link href="/register">
                <span className="hover:underline">Register now</span>
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};
export default Login;
