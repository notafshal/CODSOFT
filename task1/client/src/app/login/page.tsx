import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
const Login = () => {
  return (
    <>
      <div className="w-screen h-screen flex flex-col justify-center">
        <div className="bg-gray-200 h-screen w-screen md:h-96 md:w-96 mx-auto rounded-md">
          <div className="flex flex-col mx-28 my-28 lg:my-20 gap-4">
            <p className="text-center">Login</p>
            <form className="flex flex-col gap-4">
              <input
                placeholder="email"
                type="text"
                className="p-1 rounded-md"
              />

              <input
                placeholder="password"
                type="password"
                className="p-1 rounded-md"
              />
              <Button variant="outline">Login</Button>
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
