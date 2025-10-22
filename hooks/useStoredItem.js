import { useEffect, useState, useRef } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const useStoredItems = (keys) => {
  const [values, setValues] = useState({});
  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current) return; // prevent refetching on re-renders
    initialized.current = true;

    const fetchValues = async () => {
      try {
        const storedPairs = await AsyncStorage.multiGet(keys);
        const result = {};

        storedPairs.forEach(([key, value]) => {
          if (value !== null) {
            try {
              result[key] = JSON.parse(value);
            } catch {
              result[key] = value;
            }
          } else {
            result[key] = null;
          }
        });

        setValues(result);
      } catch (error) {
        console.warn("Error fetching multiple items:", error);
      }
    };

    fetchValues();
  }, [keys]);

  return values;
};

export default useStoredItems;
