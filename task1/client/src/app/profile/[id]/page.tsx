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
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Profile</CardTitle>
        </CardHeader>
        <CardContent>
          <div>
            <p>
              Username: <span>{userData?.username}</span>
            </p>
            <p>
              email: <span>{userData?.email}</span>
            </p>
          </div>
        </CardContent>
        <CardFooter>
          <Button>Edit</Button>
        </CardFooter>
      </Card>
    </div>
  );
}

export default Profile;
