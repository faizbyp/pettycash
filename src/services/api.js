import axios from "axios";

// Config
const API = axios.create({
  baseURL: process.env.NEXT_PUBLIC_APPURL,
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
});

export default API;
