import axios from "axios";

// Config
const API = axios.create({
  baseURL: process.env.NEXT_PUBLIC_APPURL,
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
});

// // Request
// const onRequest = (config) => {
//   if (getCookies(accessToken)) config.headers.Authorization = `Bearer ${getCookies(accessToken)}`;
//   return config;
// };
// const onRequestError = (error) => Promise.reject(error);

// // Response
// const onResponse = (response) => response.data;
// const onResponseError = (error) => {
//   if (error.response.status === 401) {
//     deleteCookies(accessToken);
//   }
//   return Promise.reject(error.response ? error.response.data : error);
// };

// // Middleware
// API.interceptors.request.use(onRequest, onRequestError);
// API.interceptors.response.use(onResponse, onResponseError);

export default API;
