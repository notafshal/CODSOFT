"use client";

import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import loginUser from "../api/loginUser";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";

export default function Login() {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { setUser } = useAuth();
  const router = useRouter();
  const { toast } = useToast();
  const handelLogin = async () => {
    const userData = { username: username, password: password };
    try {
      const loggedIn = await loginUser(userData);
      if (loggedIn) {
        const { token, id, username, email, isAdmin } = loggedIn;
        setUser({ id, username, email, isAdmin, token });
        toast({
          title: "Logged in successfully",
          description: "Thank you for checking in. Please complete your tasks",
        });
        router.push("/");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className="flex items-center justify-center flex-col w-full h-screen bg-neutral-100">
        <div className="mx-auto  w-1/4">
          <Card className="bg-white">
            <CardHeader>
              <CardTitle>Login</CardTitle>
              <CardDescription>Login to TaskTrail </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-2">
              <Input
                placeholder="your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <Input
                placeholder="your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button
                className="bg-blue-500 text-white hover:text-black "
                onClick={handelLogin}
              >
                Login
              </Button>
            </CardContent>
            <CardFooter>
              <p>
                Do not have an account?&nbsp;
                <Link href="/register">
                  <span className="hover:underline hover:cursor-pointer">
                    Register now
                  </span>
                </Link>
              </p>
            </CardFooter>
          </Card>
        </div>
      </div>
    </>
  );
}
