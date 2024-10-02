"use client";

import API from "@/services/api";
import { signOut, useSession } from "next-auth/react";

const useRefreshToken = () => {
  const { data: session } = useSession();

  const refresh = async () => {
    try {
      console.log("USER SESSION", session.user);
      const response = await API.post("/user/refresh", session.user);
      return response.data.accessToken;
    } catch (error) {
      console.error(error);
      signOut();
    }
  };

  return refresh;
};

export default useRefreshToken;
