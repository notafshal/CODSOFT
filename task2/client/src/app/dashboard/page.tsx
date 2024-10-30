/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import Sidebar from "@/components/Sidebar";
import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import getUsers from "../api/getUsers";
import createTasks from "../api/createTasks";
import { toast } from "@/hooks/use-toast";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/navigation";
export default function Dashboard() {
  const [title, setTitle] = useState<string>("");
  const [deadline, setDeadLine] = useState<Date | null>(null);
  const [priority, setPriority] = useState<string>("");
  const [teammembers, setTeammembers] = useState<string[]>([]);
  const [selectedMembers, setSelectedMembers] = useState<string[]>([]);
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const fetchData = await getUsers();
        setTeammembers(fetchData);
      } catch (err) {
        console.error(err);
      }
    };
    fetchUser();
  }, []);
  const handleSelectChange = (member: any) => {
    setSelectedMembers((prevSelected) =>
      prevSelected.some((selected: any) => selected.id === member.id)
        ? prevSelected.filter((selected: any) => selected.id !== member.id)
        : [...prevSelected, member]
    );
  };
  const membersId = selectedMembers.map((member: any) => member.id);

  const CreateTask = async () => {
    const taskData = {
      title: title,
      date: deadline,
      priority: priority,
      team: membersId,
      token: user.token,
    };
    try {
      await createTasks(taskData);
      toast({
        title: "Task created successfully",
        description: "New Task created and assigned to team members",
      });
      router.push("/dashboard");
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <>
      <div className="flex">
        <Sidebar />
        <div className="mx-2">
          <div className="flex justify-end w-full">
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" className="bg-blue-500 text-white">
                  Add Task
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Add Task</DialogTitle>
                  <DialogDescription></DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-right">
                      Title
                    </Label>
                    <Input
                      id="title"
                      className="col-span-3"
                      value={title}
                      onChange={(e) => {
                        setTitle(e.target.value);
                      }}
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="username" className="text-right">
                      DeadLine
                    </Label>
                    <Input
                      type="date"
                      className="col-span-2"
                      value={
                        deadline ? deadline.toISOString().split("T")[0] : ""
                      }
                      onChange={(e) => {
                        setDeadLine(e.target.valueAsDate);
                      }}
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="priority" className="text-right">
                      Priority
                    </Label>
                    <RadioGroup
                      defaultValue="high"
                      className="flex"
                      onValueChange={(value) => {
                        setPriority(value);
                      }}
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="high" id="high" />
                        <Label htmlFor="high">High</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="medium" id="medium" />
                        <Label htmlFor="medium">Medium</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="low" id="low" />
                        <Label htmlFor="low">Low</Label>
                      </div>
                    </RadioGroup>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-right">
                      Team
                    </Label>
                    <div className="col-span-3 flex flex-col gap-1">
                      {teammembers.map((team: any) => (
                        <div key={team?.id}>
                          <button
                            className={`${
                              selectedMembers.some(
                                (selected: any) => selected.id === team.id
                              )
                                ? "bg-blue-500 text-white"
                                : "bg-gray-200 text-black"
                            } p-1 text-xs rounded-md `}
                            onClick={() => handleSelectChange(team)}
                          >
                            {team.username}-{team.role}
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-right">
                      Your Team
                    </Label>
                    <div className="col-span-3 flex flex-col gap-1">
                      {" "}
                      {selectedMembers.map((member: any) => (
                        <div key={member.id}>
                          {member.username} - {member.role}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <DialogFooter>
                  <Button type="submit" onClick={CreateTask}>
                    Add
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>
    </>
  );
}
