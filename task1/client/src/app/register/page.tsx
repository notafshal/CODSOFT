/* eslint-disable @typescript-eslint/no-unused-expressions */
"use client";

import { Button } from "@/components/ui/button";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const Register = () => {
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const router = useRouter();
  /* eslint-disable @typescript-eslint/no-explicit-any */
  const handelRegister = (e: any) => {
    e.preventDefault();
    axios
      .post("http://localhost:5000/api/users/register", {
        username,
        email,
        password,
      })
      .then((result) => {
        if (result.status == 200) {
          console.log("user created" + result);
          router.push("/");
        }
      })
      .catch((err) => {
        if (err.response && err.response.status == 400) {
          window.alert("Email already in use.Try new one");
        } else {
          console.log(err);
        }
      });
  };
  return (
    <>
      <div className="w-screen h-screen flex flex-col justify-center overflow-hidden">
        <div className="bg-gray-200 h-screen w-screen md:h-96 md:w-96 mx-auto rounded-md">
          <div className="flex flex-col mx-28 my-28 lg:my-20 gap-4">
            <p className="text-center">Register</p>
            <form className="flex flex-col gap-4" onSubmit={handelRegister}>
              <input
                name="username"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                type="text"
                className="p-1 rounded-md"
              />

              <input
                name="email"
                placeholder="Email"
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="p-1 rounded-md"
              />

              <input
                name="password"
                placeholder="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="p-1 rounded-md"
              />
              <Button variant="outline" type="submit">
                Create Account
              </Button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
export default Register;
