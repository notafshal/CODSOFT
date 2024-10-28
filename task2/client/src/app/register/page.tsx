/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import registerUser from "../api/registerUser";
import { useRouter } from "next/navigation";

export default function Register() {
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const router = useRouter();
  const handleRegister = () => {
    const userData = {
      username: username,
      email: email,
      password: password,
    };
    try {
      registerUser(userData);
      router.push("/");
      setEmail("");
      setPassword("");
      setUsername("");
    } catch (err: any) {
      console.log(err);
    }
  };

  return (
    <>
      <div className="flex items-center justify-center flex-col w-full h-screen bg-neutral-100">
        <div className="mx-auto  w-1/4">
          <Card className="bg-white">
            <CardHeader>
              <CardTitle>Register</CardTitle>
              <CardDescription>SignUp to TaskTrail </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-2">
              <Label htmlFor="username">Username</Label>
              <Input
                placeholder="your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />

              <Label htmlFor="email">Email</Label>
              <Input
                placeholder="your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <Label htmlFor="password">Password</Label>
              <Input
                placeholder="your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button
                className="bg-blue-500 text-white hover:text-black "
                onClick={handleRegister}
              >
                Register
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
