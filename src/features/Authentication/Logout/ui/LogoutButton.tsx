"use client";
import { signOut } from "next-auth/react";
import { LogOut } from "lucide-react";
import { Button } from "@ui/button";

const LogoutButton = () => {
  return (
    <Button
      variant="ghost"
      className="size-8 group"
      onClick={() => signOut({ callbackUrl: "/login" })}
    >
      <LogOut className="!size-5 relative transition-all left-0 group-hover:left-1" />
    </Button>
  );
};

export default LogoutButton;
