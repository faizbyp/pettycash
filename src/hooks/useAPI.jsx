import { useEffect } from "react";
import useAuthStore from "./useAuthStore";
import API from "@/services/api";

const useAPI = () => {
  const id_user = useAuthStore((state) => state.id_user);
  const username = useAuthStore((state) => state.username);
  const name = useAuthStore((state) => state.name);
  const email = useAuthStore((state) => state.email);

  const accessToken = useAuthStore((state) => state.access_token);
  const setAccessToken = useAuthStore((state) => state.setAccessToken);

  const signOut = useAuthStore((state) => state.signOut);

  useEffect(() => {
    const requestIntercept = API.interceptors.request.use(
      (config) => {
        if (!config.headers["Authorization"]) {
          config.headers["Authorization"] = `Bearer ${accessToken}`;
        }

        return config;
      },
      (error) => Promise.reject(error)
    );

    const responseIntercept = API.interceptors.response.use(
      (response) => response,
      async (error) => {
        const prevRequest = error?.config;

        if (error?.response?.status === 401 && !prevRequest?.sent) {
          prevRequest.sent = true;

          const resAccessToken = await API.post("/user/get-token", {
            id_user,
            username,
            name,
            email,
          });
          const newAccessToken = resAccessToken.data.access_token;

          prevRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
          setAccessToken(newAccessToken);

          return API(prevRequest);
        }

        if (error?.response?.status === 403) {
          signOut();
        }

        return Promise.reject(error);
      }
    );

    return () => {
      API.interceptors.request.eject(requestIntercept);
      API.interceptors.response.eject(responseIntercept);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accessToken]);

  return API;
};

export default useAPI;
