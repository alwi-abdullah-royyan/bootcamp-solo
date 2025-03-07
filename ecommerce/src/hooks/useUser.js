import { getAllUser, getUserById } from "@/services/userService";
import { useState, useEffect } from "react";

export const useAllUsers = (page = 0, size = 10, token) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!token) return;

    setData(null);
    setError(null);
    setLoading(true);

    const fetchAllUsers = async () => {
      try {
        const userData = await getAllUser(page, size, token);

        setData(userData);
      } catch (err) {
        setError("Failed to fetch users.");
      } finally {
        setLoading(false);
      }
    };

    fetchAllUsers();
  }, [page, size, token]);

  return { data, loading, error };
};

export const useUserById = (id, token) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id || !token) return;

    setData(null);
    setError(null);
    setLoading(true);

    const fetchUserById = async () => {
      try {
        const userData = await getUserById(id, token);
        setData(userData);
      } catch (err) {
        setError("Failed to fetch user.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserById();
  }, [id, token]);

  return { data, loading, error };
};
