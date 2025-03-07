import { useState, useEffect } from "react";
import { getToken, me } from "@/services/authService";

export function useUser() {
  const token = getToken();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!token) return;

    const fetchUser = async () => {
      setLoading(true);
      try {
        const userData = await me(token);
        setUser(userData);
      } catch (err) {
        setError("Failed to fetch user data");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [token]);

  return { user, loading, error };
}
