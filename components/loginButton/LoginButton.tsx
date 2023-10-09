"use client";
import { SESSION } from "@/app/constants";
import { signIn, signOut, useSession } from "next-auth/react";
import { SessionProvider } from 'next-auth/react'

export default function LoginButton() {
  const { data: session, status } = useSession();

  const handleClick = () => {
    if (session) {
      return signOut();
    }
    signIn();
  };
  return (
    <SessionProvider session={session}>
        <button onClick={handleClick}>
      {session?.user && status !== SESSION.LOADING ? "Logout" : "Login"}
    </button>
  </SessionProvider>

  );
}
