import Image from "next/image";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react"
import styles from "./styles.module.css";
import React, { useEffect, useState } from "react";

export default function Banner() {

  const { data: session, status } = useSession();
  const [token, setToken] = useState("");

  useEffect(() => {
    //@ts-ignore
    setToken(session?.access)
  }, [session]);

  const href = session ? '/' : '/auth/signIn';
  
  return (
    <div className={styles.banner}>
      <Link href={href}>
        <Image
          className={styles.nav_logo}
          alt={"Percy logo"}
          width={100}
          height={50}
          src={"/static/media/side-menu-header.svg"}
        />
      </Link>
      <div>
        {status === "authenticated" && <button className={styles.button} onClick={() => signOut()}>Logout</button>}
      </div> 
    </div>
  );
}
