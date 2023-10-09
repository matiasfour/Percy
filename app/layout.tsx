"use client";
import "./globals.css";
import { Inter } from "@next/font/google";
import Banner from "@/components/banner/Banner";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import styles from "./styles.module.css";
import NextAuthSessionProvider from "./providers/sessionProvider";

const inter = Inter({ weight: ["500", "600", "700"], subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const queryClient = new QueryClient();

  return (
    <html className={inter.className} lang="en">
      {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />
      <body className={inter.className}>
        <NextAuthSessionProvider>
          <QueryClientProvider client={queryClient}>
            <div className={styles.page_container}>
              <Banner />
                <div className={styles.page_content}>
                    {children}
                </div>
            </div>
          </QueryClientProvider>
        </NextAuthSessionProvider>
      </body>
    </html>
  );
}
