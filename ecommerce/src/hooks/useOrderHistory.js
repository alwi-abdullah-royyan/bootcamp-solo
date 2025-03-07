import { getOrderHistoryById } from "@/services/orderHistoryService";
import { useState, useEffect } from "react";

export const useOrderHistoryById = (id, token) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id || !token) return;

    setData(null);
    setError(null);
    setLoading(true);

    const fetchOrderHistory = async () => {
      try {
        const orderData = await getOrderHistoryById(id, token);
        setData(orderData);
      } catch (err) {
        setError("Failed to fetch order history.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrderHistory();
  }, [id, token]);

  return { data, loading, error };
};
