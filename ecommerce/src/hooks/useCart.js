import { getCart } from "@/services/cartService";
import { useState, useEffect, useCallback } from "react";

export const useCart = (token) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCart = useCallback(async () => {
    if (!token) return;

    setLoading(true);
    setError(null);

    try {
      const cartData = await getCart(token);
      setData(cartData);
    } catch (err) {
      setError("Failed to fetch cart.");
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  return { data, loading, error, refetch: fetchCart };
};
