"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";
const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const router = useRouter();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleLogin = (e: any) => {
    e.preventDefault();
    axios
      .post("http://localhost:5000/api/users/login", { email, password })
      .then((result) => {
        if (result.data === "Success") {
          router.push("/");
        } else {
          alert(result.data);
        }
      })
      .catch((err) => console.log(err));
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
