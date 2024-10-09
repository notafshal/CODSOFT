import { Button } from "@/components/ui/button";
import React from "react";

const Register = () => {
  return (
    <>
      <div className="w-screen h-screen flex flex-col justify-center overflow-hidden">
        <div className="bg-gray-200 h-screen w-screen md:h-96 md:w-96 mx-auto rounded-md">
          <div className="flex flex-col mx-28 my-28 lg:my-20 gap-4">
            <p className="text-center">Register</p>
            <form className="flex flex-col gap-4">
              <input
                placeholder="Username"
                type="text"
                className="p-1 rounded-md"
              />

              <input
                placeholder="Email"
                type="text"
                className="p-1 rounded-md"
              />

              <input
                placeholder="Password"
                type="password"
                className="p-1 rounded-md"
              />
              <Button variant="outline">Create Account</Button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
export default Register;
