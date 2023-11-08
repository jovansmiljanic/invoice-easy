// Core
import { useState, useEffect } from "react";

// Vendors
import axios from "axios";

// GLobal types
import { MyAccount } from "@types";

export const useFetchUserData = () => {
  const [userData, setUserData] = useState<MyAccount | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/registration");
        if (response.status === 200 && response.data) {
          setUserData(response.data.currentUser);
        } else {
          setError("Failed to fetch user data");
        }
      } catch (err) {
        setError("An error occurred while fetching user data");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { userData, loading, error };
};
