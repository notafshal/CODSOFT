"use client";
import axios from "axios";
import React from "react";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

function Profile() {
  axios
    .get(`http://localhost:5000/api/users/670c9bfccc084c011cbf96d5`)
    .then((result) => console.log(result))
    .catch((err) => console.error(err));
  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Profile</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Card Content</p>
        </CardContent>
        <CardFooter>
          <Button>Edit</Button>
        </CardFooter>
      </Card>
    </div>
  );
}

export default Profile;
