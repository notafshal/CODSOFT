import Sidebar from "@/components/Sidebar";
import { Button } from "@/components/ui/button";
import React from "react";

export default function Dashboard() {
  return (
    <>
      <div className="flex">
        <Sidebar />
        <div className="mx-2">
          <div className="flex justify-end w-full">
            <Button className="bg-blue-500 text-white hover:text-black">
              Add Task
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
