"use client";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { SESSION } from "@/app/constants";
import { WHITE_LIST } from "./constants";

/** Posible component for session handling*/
export default function WithSession({
  children,
}: {
  children: React.ReactNode;
}) {
  // const { data: session, status } = useSession();
  const router = useRouter();
  const pathname = usePathname();
  const [isAuthorized, setIsAuthorized] = useState(true);

  /* useEffect(() => {
    if (
      !session?.user &&
      status !== SESSION.LOADING &&
      !WHITE_LIST.some((path) => path === pathname)
    ) {
      router.push("/");
    } else {
      setIsAuthorized(true);
    }
  }, [pathname, router, session, status]);
 */
  return <>{isAuthorized && children}</>;
}
