"use client";

// import API from "@/services/api";
import { useState, useEffect, useCallback } from "react";
import useAPI from "./useAPI";

const useFetch = (url) => {
  const API = useAPI();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await API.get(url);
      setData(response.data);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }, [url, API]);

  useEffect(() => {
    if (url) fetchData();
  }, [url, fetchData]);

  return { data, loading, error, refetch: fetchData };
};

export default useFetch;
