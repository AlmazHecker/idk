"use client";
import { signOut } from "next-auth/react";
import { LogOut } from "lucide-react";

const LogoutButton = () => {
  return (
    <div className="group">
      <LogOut
        cursor="pointer"
        onClick={() => signOut({ callbackUrl: "/login" })}
        className="relative transition-all left-0 group-hover:left-1"
      />
    </div>
  );
};

export default LogoutButton;
