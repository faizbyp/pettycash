"use client";

import { useEffect, useCallback } from "react";
import axios from "axios";
import { useSession, signOut } from "next-auth/react";

const useAPI = () => {
  const { data: session, update } = useSession();

  const API = axios.create({
    baseURL: process.env.NEXT_PUBLIC_APPURL,
    withCredentials: true,
    headers: { "Content-Type": "application/json" },
  });

  // Request Interceptor
  const onRequest = useCallback(
    async (config) => {
      if (session) {
        config.headers["Authorization"] = `Bearer ${session?.user?.accessToken}`;
      }
      return config;
    },
    [session]
  );
  const onRequestError = (error) => {
    return Promise.reject(error);
  };

  // Response Interceptor
  const onResponse = (response) => {
    return response;
  };
  const onResponseError = async (error) => {
    const prevRequest = error.config;

    if (error.response?.status === 401 && !prevRequest.sent) {
      prevRequest.sent = true;

      try {
        const refreshedSession = await API.post(`/refresh-token`, session.user);
        const newAccessToken = refreshedSession.data.access_token;
        update({ accessToken: newAccessToken });

        prevRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
        return API(prevRequest);
      } catch (refreshError) {
        signOut();
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error.response ? error.response.data : error);
  };

  useEffect(() => {
    const requestInterceptor = API.interceptors.request.use(onRequest, onRequestError);
    const responseInterceptor = API.interceptors.response.use(onResponse, onResponseError);

    return () => {
      API.interceptors.request.eject(requestInterceptor);
      API.interceptors.response.eject(responseInterceptor);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onRequest]);

  return API;
};

export default useAPI;
