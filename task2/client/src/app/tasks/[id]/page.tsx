/* eslint-disable @typescript-eslint/no-unused-expressions */
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
import { useAuth } from "@/app/context/AuthContext";
import createActivity from "@/app/api/createActivity";
import { toast } from "@/hooks/use-toast";
import { LuListTodo } from "react-icons/lu";
import { RiProgress1Line } from "react-icons/ri";
import {
  FaCheckCircle,
  FaBug,
  FaComment,
  FaGripLinesVertical,
} from "react-icons/fa";
import { MdAssignmentAdd } from "react-icons/md";
import { MdNotStarted } from "react-icons/md";

export default function TaskPage() {
  const params = useParams();
  const taskId: any = params?.id;
  const [task, setTask] = useState<any>(null);
  const [textActivity, setTextActivity] = useState<string>("");
  const [status, setStatus] = useState<string>("");
  const [error, setError] = useState<string>("");
  const { user } = useAuth();

  useEffect(() => {
    const fetchSingleTask = async () => {
      try {
        const taskData: any = await getSingleTask(taskId);
        setTask(taskData);
      } catch (err: any) {
        setError(err);
        toast({
          title: "Error!!!",
          description: `${error}`,
        });
      }
    };
    fetchSingleTask();
  }, [taskId]);
  const addActivity = async () => {
    try {
      const newStatus = status === "completed" ? "completed" : "in progress";
      const activityData = {
        status: status,
        activityText: textActivity,
        date: Date.now(),
        doneBy: user?.id,
        taskId: taskId,
        token: user?.token,
        taskStage: newStatus,
      };
      const newActivity = await createActivity(activityData);
      setTask((prevTask: any) => ({
        ...prevTask,
        activities: [...prevTask.activities, newActivity],
      }));
      setTextActivity("");
      setStatus("");
      toast({
        title: "Activity added",
        description: "Your activity was added successfully.",
      });
    } catch (err) {
      console.log("Error adding activity:", err);
    }
  };
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
  const activitySign = (status: string) => {
    switch (status) {
      case "assigned":
        return <MdAssignmentAdd className="text-2xl text-yellow-500" />;
      case "started":
        return <MdNotStarted className="text-2xl text-pink-500" />;
      case "in progress":
        return <RiProgress1Line className="text-2xl  text-indigo-500" />;
      case "bug":
        return <FaBug className="text-2xl text-red-500" />;
      case "commented":
        return <FaComment className="text-2xl text-blue-500" />;
      case "completed":
        return <FaCheckCircle className="text-2xl text-green-500" />;
    }
  };

  if (!task) {
    return (
      <div className="flex h-screen">
        <Sidebar />
        <div className="flex-grow overflow-y-auto p-4">Loading task...</div>
      </div>
    );
  }
  const canPostActivity = task?.team?.some(
    (member: { id: string }) => member.id === user?.id
  );
  if (!canPostActivity) {
    toast({
      title: "Cannot post",
      description:
        "You are not assigned to this task and cannot post activities.",
    });
  }
  return (
    <div className="flex h-screen">
      <Sidebar />

      <div className="flex-grow overflow-y-auto p-4">
        <div>
          <Card>
            <CardHeader className="my-2">
              <CardTitle className="mx-auto">{task.title}</CardTitle>
              <CardDescription className="mx-auto text-white bg-red-500 p-1 rounded-2xl">
                {task.date}
              </CardDescription>
            </CardHeader>
            <CardContent className="flex">
              <div className="w-1/2">
                <div className="flex">
                  Priority:
                  <p
                    className={`w-4 h-4 rounded-full mt-1 mx-2 ${priorityColor(
                      task.priority
                    )}`}
                  ></p>
                </div>
                <p className="flex">
                  Stage:
                  <span className="mt-1 mx-2 ">{stageSign(task.stage)}</span>
                </p>
                <div className="mt-2 border-2 w-72">
                  <p className="text-white bg-green-500  p-1  border-2">
                    Team Members
                  </p>
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
                {canPostActivity ? <p>Content activity</p> : <p></p>}
                {canPostActivity && (
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
                )}
              </div>
            </CardContent>
            <CardFooter>
              <div>
                {task.activities.map((activity: any) => {
                  const member = task.team.find(
                    (member: any) => member.id === activity.doneBy
                  );
                  return (
                    <div key={activity.id}>
                      <div className="flex flex-col ">
                        <p>{activitySign(activity.status)}</p>
                        <p>
                          {activity.activityText} -{" "}
                          {member?.username || "Unknown User"}
                        </p>
                      </div>
                      <div className="my-1">
                        <FaGripLinesVertical className="text-gray-400" />
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}
