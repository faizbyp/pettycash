"use client";

import MainLayout from "./main-layout";
import { SessionProvider } from "next-auth/react";

export default function RootLayout({ children }) {
  return (
    <MainLayout>
      <SessionProvider>{children}</SessionProvider>
    </MainLayout>
  );
}
