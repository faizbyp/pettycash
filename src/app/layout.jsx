"use client";

import { SWRConfig } from "swr";
import MainLayout from "./main-layout";
import useAPI from "@/hooks/useAPI";

export default function RootLayout({ children }) {
  const API = useAPI();
  const swrConfig = {
    fetcher: (url) => API.get(url).then((res) => res.data),
  };

  return (
    <MainLayout>
      <SWRConfig value={swrConfig}>{children}</SWRConfig>
    </MainLayout>
  );
}
