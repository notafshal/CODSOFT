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
import { LuListTodo } from "react-icons/lu";
import { RiProgress1Line } from "react-icons/ri";
import { FaCheckCircle } from "react-icons/fa";

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
        return "bg-yellow-400";
      case "low":
        return "bg-green-500";
      default:
        "bg-gray-500";
    }
  };
  const stageSign = (stage: string) => {
    switch (stage) {
      case "preceding":
        return <LuListTodo />;
      case "in progress":
        return <RiProgress1Line />;
      case "completed":
        return <FaCheckCircle />;
      default:
        <LuListTodo />;
    }
  };
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-grow overflow-y-auto p-4">
        <h1 className="text-lg font-semibold text-center my-3">Tasks</h1>
        <div className="grid grid-cols-3 gap-4">
          {tasks.map((task) => (
            <div key={task.id}>
              <Link href={`tasks/${task.id}`}>
                <Card className="bg-blue-100">
                  <CardHeader>
                    <CardTitle>{task.title}</CardTitle>
                    <CardDescription className="text-white bg-red-500 p-1 text-xs rounded-2xl w-fit">
                      {task.date}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex">
                      <p> Priority:</p>
                      <p
                        className={`w-4 h-4 rounded-full mt-1 mx-2 ${priorityColor(
                          task.priority
                        )}`}
                      ></p>
                    </div>
                    <p className="flex">
                      Stage:{" "}
                      <span className={`mt-1 mx-2 `}>
                        {stageSign(task.stage)}
                      </span>
                    </p>
                  </CardContent>
                  <CardFooter>
                    <div className="flex flex-col border-2 border-black rounded-xl  bg-white text-sm">
                      <p className="bg-green-500 text-white border-b-2 p-1 rounded-t-xl border-black text-center">
                        Team members
                      </p>
                      <div className="flex justify-between rounded-xl">
                        <div className="flex flex-col p-2">
                          {task.team.map((user: any) => (
                            <div key={user.id}>
                              {user.username}-{user.role}
                            </div>
                          ))}
                        </div>
                      </div>
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
