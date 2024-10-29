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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import getTasks from "../api/getTasks";
import Sidebar from "@/components/Sidebar";

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

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-grow overflow-y-auto p-4">
        <div className="grid grid-cols-3 gap-4">
          {tasks.map((task) => (
            <div key={task.id}>
              <Card className="bg-blue-100">
                <CardHeader>
                  <CardTitle>{task.title}</CardTitle>
                  <CardDescription>{task.date}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>Priority: {task.priority}</p>
                  <p>Stage: {task.stage}</p>
                  <p>
                    Activities:
                    {task.activities.map((active: any) => (
                      <div key={active.id || active._id}>
                        <Card className="bg-blue-500 text-white">
                          <CardHeader>
                            <CardTitle>{active.type}</CardTitle>
                            <CardDescription>{active.date}</CardDescription>
                          </CardHeader>
                          <CardContent>
                            <p>{active.activity}</p>
                          </CardContent>
                          <CardFooter>
                            <p>
                              {" "}
                              Team Leader:
                              <br /> {active.by}
                            </p>
                          </CardFooter>
                        </Card>
                      </div>
                    ))}
                  </p>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <p>
                    <Select>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Team" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value={task.team}>{task.team}</SelectItem>
                      </SelectContent>
                    </Select>
                  </p>
                </CardFooter>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
