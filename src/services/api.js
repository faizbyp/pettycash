import axios from "axios";
import { getSession, signOut } from "next-auth/react";

// Config
const API = axios.create({
  baseURL: process.env.NEXT_PUBLIC_APPURL,
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
});

// // Request
// const onRequest = async (config) => {
//   const session = await getSession();
//   if (!config.headers["Authorization"])
//     config.headers["Authorization"] = `Bearer ${session?.user?.accessToken}`;
//   return config;
// };
// const onRequestError = (error) => Promise.reject(error);

// // Response
// const onResponse = (response) => response;
// const onResponseError = async (error) => {
//   // if (error.response.status === 401) {
//   //   deleteCookies(accessToken);
//   // }
//   const prevRequest = error.config;
//   if (error.response.status === 401 && !prevRequest.sent) {
//     prevRequest.sent = true;

//     // Refresh the token by calling the refresh endpoint
//     try {
//       // Call the refresh token API or NextAuth's token refresh flow
//       const refreshedSession = await axios.post(
//         `${process.env.NEXT_PUBLIC_APPURL}/refresh-token`,
//         session.user
//       );

//       const newAccessToken = refreshedSession.data.access_token;

//       // Update the request with the new token
//       prevRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;

//       // Retry the original request
//       return API(prevRequest);
//     } catch (refreshError) {
//       // Handle refresh token failure (e.g., logout user)
//       signOut();
//       return Promise.reject(refreshError);
//     }
//   }

//   return Promise.reject(error.response ? error.response.data : error);
// };

// // Middleware
// API.interceptors.request.use(onRequest, onRequestError);
// API.interceptors.response.use(onResponse, onResponseError);

export default API;
