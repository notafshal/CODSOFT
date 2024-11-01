"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/app/context/AuthContext";
import Link from "next/link";
import { GiRoad } from "react-icons/gi";
import { useToast } from "@/hooks/use-toast";

export default function Navbar() {
  const { user, logout } = useAuth();
  const { toast } = useToast();

  const handleLogout = () => {
    logout();
    toast({
      variant: "destructive",
      title: "Logged Out Successfully",
      description: "Thank You For your time",
    });
  };
  return (
    <div>
      <div className="flex justify-between  sticky bg-blue-500 p-3">
        <div className="w-2/3 flex  gap-20">
          <p className="p-3 w-28 text-center font-semibold bg-yellow-300 rounded-full flex justify-center items-center gap-1">
            Task-Trail
            <span>
              <GiRoad />
            </span>
          </p>
        </div>
        <div className="hover:cursor-pointer">
          {user ? (
            <Avatar onClick={handleLogout}>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>UA</AvatarFallback>
            </Avatar>
          ) : (
            <Link href="/login">
              <p>LogIn</p>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
