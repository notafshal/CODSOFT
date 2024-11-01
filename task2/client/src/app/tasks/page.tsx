/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useEffect, useState } from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import getTasks from "../api/getTasks";
import Sidebar from "@/components/Sidebar";
import Link from "next/link";

export default function Tasks() {
  const [tasks, setTasks] = useState<any[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedTask = await getTasks();
        setTasks(fetchedTask);
      } catch (err) {
        console.log(`${err}`);
      }
    };
    fetchData();
  }, []);
  const priorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-500";
      case "medium":
        return "bg-orange-500";
      case "low":
        return "bg-green-500";
      default:
        "bg-gray-500";
    }
  };
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-grow overflow-y-auto p-4">
        <div className="grid grid-cols-3 gap-4">
          {tasks.map((task) => (
            <div key={task.id}>
              <Link href={`tasks/${task.id}`}>
                <Card className="bg-blue-100">
                  <CardHeader>
                    <CardTitle>{task.title}</CardTitle>
                    <CardDescription>{task.date}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p> Priority:</p>
                    <p
                      className={`w-4 h-4 rounded-full ${priorityColor(
                        task.priority
                      )}`}
                    ></p>
                    <p>Stage: {task.stage}</p>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <div className="flex flex-col">
                      {task.team.map((user: any) => (
                        <div key={user.id}>
                          {user.username}-{user.role}
                        </div>
                      ))}
                    </div>
                  </CardFooter>
                </Card>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
