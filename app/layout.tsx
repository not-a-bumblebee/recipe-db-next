"use client"
import '@mantine/core/styles.css';
import { ColorSchemeScript, Flex, MantineProvider, Paper } from '@mantine/core';
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import SearchBar from '@/components/Searchbar';
import '@mantine/dropzone/styles.css';
const inter = Inter({ subsets: ["latin"] });
import '@mantine/tiptap/styles.css';
import { useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useAuthStore } from './store';

// export const metadata: Metadata = {
//   title: "Create Next App",
//   description: "Generated by create next app",
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const router = useRouter()
  const pesterUsername = useAuthStore((state) => state.pesterUsername)
  const _hasHydrated = useAuthStore((state) => state._hasHydrated)
  const userCred = useAuthStore((state) => state.userCred)
  const pathname = usePathname()

  // checks if Oauth user has set their username.
  // Redirects them if they haven't

  useEffect(() => {
    console.log("BIG EFFECT", userCred?.displayName == 'anonymouse', _hasHydrated);
    console.log(pathname);

    if (userCred?.displayName == 'anonymouse' && _hasHydrated) {
      router.push("/settings")
    }


  }, [pesterUsername, pathname])


  return (
    <html lang="en">

      <body className={inter.className}>
        <MantineProvider>
          <SearchBar />
          {children}
        </MantineProvider>
      </body>
    </html>
  );
}
