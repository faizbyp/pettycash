"use client";

import { useState, useEffect } from "react";

function useSessionStorage(key, initialValue = JSON.stringify("")) {
  // Check if we are in the browser environment
  const isBrowser = typeof window !== "undefined";

  // Get the initial value from sessionStorage or use the provided initialValue
  const getStoredValue = () => {
    if (isBrowser) {
      const storedValue = sessionStorage.getItem(key);

      // If storedValue is null, return initialValue
      if (!storedValue) {
        return initialValue;
      }

      try {
        // Parse the stored value (and avoid parsing undefined or invalid JSON)
        return JSON.parse(storedValue);
      } catch (error) {
        console.error("Error parsing JSON from sessionStorage:", error);
        return initialValue; // Return initial value if there's a parsing error
      }
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
