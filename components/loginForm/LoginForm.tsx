"use client"

import React, { SyntheticEvent } from 'react'
import { signIn } from "next-auth/react";
import { useState } from "react";
import styles from "./styles.module.css";
import { useRouter } from 'next/navigation';

const LoginForm = () => {
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const router = useRouter();

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()
    try {
      const response = await signIn<'credentials'>("credentials", { email, password, redirect: false, callbackUrl: "/" });
  
      if(response?.ok) {
        router.push("/")
      }
      if(response?.error) {
        setError("Invalid credentials");
      }
    } catch (error) {
      console.error("Error during authentication:", error);
    }

    setEmail("");
    setPassword("");
  }

  const emailSetter = (e: SyntheticEvent) => setEmail((e.target as HTMLInputElement).value)

  const passwordSetter = (e: SyntheticEvent) => setPassword((e.target as HTMLInputElement).value)

  return (
    <div className={styles.login}>
        <form className={styles.login_form}>
            <h2 className="font-xl">Login</h2>
            <input value={email} onChange={emailSetter} placeholder="email" className={styles.input} type="text" />
            <input value={password} onChange={passwordSetter} placeholder="password" className={styles.input} type="password" />
            <button onClick={handleSubmit} className={styles.submit_button}>Login</button>
            {
              error && <span className={styles.error}>{error}</span>
            }
        </form>
    </div>
  )
}

export default LoginForm