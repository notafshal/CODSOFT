/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useEffect, useState } from "react";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import getSingleUser from "@/lib/getSingleUser";
import { useAuth } from "@/app/context/AuthContext";

interface userData {
  _id: string;
  username: string;
  isRole: number;
  email: string;
  password: string;
}

function Profile() {
  const { user } = useAuth();

  const [userData, setUserData] = useState<userData>();
  useEffect(() => {
    const fetchUserData = async () => {
      if (user && user.id) {
        try {
          const data: any = await getSingleUser({ params: { id: user.id } });
          setUserData(data);
        } catch (err) {
          console.error(err);
        }
      }
    };
    fetchUserData();
  }, [user]);

  return (
    <div className="w-screen  h-screen bg-neutral-300">
      <div className="flex justify-center ">
        <Card className="w-fit my-36">
          <CardHeader>
            <CardTitle>Profile</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-3">
              <p>
                Username: <span>{userData?.username}</span>
                <span className="text-xs underline text-blue-500 mx-3">
                  Edit
                </span>
              </p>
              <p>
                email: <span>{userData?.email}</span>{" "}
                <span className="text-xs underline text-blue-500 mx-3">
                  Edit
                </span>
              </p>
            </div>
          </CardContent>
          <CardFooter>
            <Button className="bg-red-500 hover:bg-red-700">
              Delete Account
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}

export default Profile;
