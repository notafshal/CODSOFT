import React from "react";
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
export default function Login() {
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
              <Input placeholder="your username" />
              <Input placeholder="your password" />
              <Button className="bg-blue-500 text-white hover:text-black ">
                Login
              </Button>
            </CardContent>
            <CardFooter>
              <p>
                Do not have an account?
                <span className="hover:underline hover:cursor-pointer">
                  Register now
                </span>
              </p>
            </CardFooter>
          </Card>
        </div>
      </div>
    </>
  );
}
