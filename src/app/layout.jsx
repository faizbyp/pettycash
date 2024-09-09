"use client";

import { SWRConfig } from "swr";
import API from "@/services/api";
import MainLayout from "./main-layout";
import { SessionProvider } from "next-auth/react";

export default function RootLayout({ children }) {
  const swrConfig = {
    fetcher: (url) => API.get(url).then((res) => res.data),
  };

  return (
    <MainLayout>
      <SessionProvider>
        <SWRConfig value={swrConfig}>{children}</SWRConfig>
      </SessionProvider>
    </MainLayout>
  );
}
