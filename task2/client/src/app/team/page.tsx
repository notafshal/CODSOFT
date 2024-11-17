/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Sidebar from "@/components/Sidebar";
import React, { useEffect, useState } from "react";
import getUsers from "../api/getUsers";

function Team() {
  const [userData, setUserData] = useState<any>();
  const [error, setError] = useState<string>("");
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const fetchedUserData = await getUsers();
        setUserData(fetchedUserData);
      } catch (err: any) {
        setError(err);
      }
    };
    fetchUser();
  }, []);

  return (
    <div className="flex h-screen">
      <Sidebar />

      <div className="flex-grow overflow-y-auto p-4">
        <div>{error}</div>
        <p className="text-center font-semibold text-lg">Team members</p>
        <div>
          <div className="my-10">
            <div className="my-2 border-b-2 py-2">
              <div className="w-screen grid grid-cols-3">
                <p>Username</p>
                <p>Role</p>
                <p>Email</p>
              </div>
            </div>
            <div>
              {userData?.map((data: any) => (
                <div key={data.id}>
                  <div className="w-screen grid grid-cols-3 py-2 hover:border-b-2">
                    <p>{data.username}</p>
                    <p>{data.role}</p>
                    <p>{data.email}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Team;
