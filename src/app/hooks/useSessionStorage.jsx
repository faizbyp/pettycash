"use client";

import { useState, useEffect } from "react";

function useSessionStorage(key, initialValue) {
  // Check if we are in the browser environment
  const isBrowser = typeof window !== "undefined";

  // Get the initial value from sessionStorage or use the provided initialValue
  const getStoredValue = () => {
    if (isBrowser) {
      const storedValue = sessionStorage.getItem(key);
      return storedValue ? JSON.parse(storedValue) : initialValue;
    }
    return initialValue;
  };

  // State to store the value
  const [value, setValue] = useState(getStoredValue);

  // Update sessionStorage whenever the value changes
  useEffect(() => {
    if (isBrowser) {
      sessionStorage.setItem(key, JSON.stringify(value));
    }
  }, [key, value, isBrowser]);

  // Function to update the value
  const setStoredValue = (newValue) => {
    setValue((prevValue) => {
      const valueToStore = newValue instanceof Function ? newValue(prevValue) : newValue;
      if (isBrowser) {
        sessionStorage.setItem(key, JSON.stringify(valueToStore));
      }
      return valueToStore;
    });
  };

  return [value, setStoredValue];
}

export default useSessionStorage;
