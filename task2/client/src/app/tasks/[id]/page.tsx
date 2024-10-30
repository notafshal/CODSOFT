/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import getSingleTask from "@/app/api/getSingleTask";
import Sidebar from "@/components/Sidebar";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export default function TaskPage() {
  const params = useParams();
  const taskId: any = params?.id;

  //   console.log(`taskId ${taskId}`);
  const [task, setTask] = useState<any>(null);
  const [textActivity, setTextActivity] = useState<string>("");
  const [status, setStatus] = useState<string>("");
  useEffect(() => {
    const fetchSingleTask = async () => {
      try {
        const taskData: any = await getSingleTask(taskId);
        setTask(taskData);
      } catch (err) {
        console.error(err);
      }
    };
    fetchSingleTask();
  }, [taskId]);

  if (!task) {
    return (
      <div className="flex h-screen">
        <Sidebar />
        <div className="flex-grow overflow-y-auto p-4">Loading task...</div>
      </div>
    );
  }
  const addActivity = () => {};
  return (
    <div className="flex h-screen">
      <Sidebar />

      <div className="flex-grow overflow-y-auto p-4">
        Product page
        <div>
          <Card>
            <CardHeader className="my-2">
              <CardTitle className="mx-auto">{task.title}</CardTitle>
              <CardDescription className="mx-auto">{task.date}</CardDescription>
            </CardHeader>
            <CardContent className="flex">
              <div className="w-1/2">
                <p>{task.priority}</p>
                <p>{task.stage}</p>
                <div>
                  <p>Team Members</p>
                  {task.team.map((member: any) => (
                    <div key={member.id}>
                      <div>
                        {member.username}- {member.role}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="w-1/2">
                Content activity
                <div className=" flex flex-col gap-4">
                  <RadioGroup
                    defaultValue="option-one"
                    className="grid grid-cols-3"
                    onValueChange={(value) => setStatus(value)}
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="assigned" id="assigned" />
                      <Label htmlFor="assigned">Assigned</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="started" id="started" />
                      <Label htmlFor="started">Started</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="in progress" id="in progress" />
                      <Label htmlFor="in progress">In progress</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="bug" id="bug" />
                      <Label htmlFor="bug">Bug</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="commented" id="commented" />
                      <Label htmlFor="commented">Commented</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="completed" id="completed" />
                      <Label htmlFor="completed">Completed</Label>
                    </div>
                  </RadioGroup>
                  <Label htmlFor="activityText">What did You do?</Label>{" "}
                  <Textarea
                    value={textActivity}
                    onChange={(e) => setTextActivity(e.target.value)}
                  />
                  <Button
                    className="bg-blue-500 text-white hover:text-black"
                    onClick={addActivity}
                  >
                    Add
                  </Button>
                </div>
              </div>
            </CardContent>
            <CardFooter></CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}
