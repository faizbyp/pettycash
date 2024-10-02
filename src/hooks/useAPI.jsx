"use client";

import { useEffect } from "react";
import useRefreshToken from "./useRefreshToken";
import API from "@/services/api";
import { signOut, useSession, getSession } from "next-auth/react";

const useAPI = () => {
  const refresh = useRefreshToken();
  const { data: session, update } = useSession();

  useEffect(() => {
    const requestIntercept = API.interceptors.request.use(
      (config) => {
        if (!config.headers["Authorization"]) {
          config.headers["Authorization"] = `Bearer ${session.user.accessToken}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    const responseIntercept = API.interceptors.response.use(
      (response) => response,
      async (error) => {
        const prevRequest = error?.config;
        if (error?.response?.status === 403 && !prevRequest?.sent) {
          prevRequest.sent = true;
          const newAccessToken = await refresh();
          prevRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
          console.log("BEFORE UPDATE", session.user.accessToken);
          await update({ ...session, user: { ...session.user, accessToken: newAccessToken } });
          console.log("NEW TOKEN", newAccessToken);
          console.log("AFTER UPDATE", session.user.accessToken);
          return API(prevRequest);
        }
        return Promise.reject(error);
      }
    );
    return () => {
      API.interceptors.request.eject(requestIntercept);
      API.interceptors.response.eject(responseIntercept);
    };
  }, [session, refresh, update]);

  return API;
};

export default useAPI;
