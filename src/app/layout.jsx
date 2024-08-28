"use client";

import { SWRConfig } from "swr";
import API from "@/services/api";
import MainLayout from "./main-layout";

export default function RootLayout({ children }) {
  const swrConfig = {
    fetcher: (url) => API.get(url).then((res) => res.data),
  };

  return (
    <MainLayout>
      <SWRConfig value={swrConfig}>{children}</SWRConfig>
    </MainLayout>
  );
}
