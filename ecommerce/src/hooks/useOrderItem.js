import { getOrderItemById } from "@/services/orderItemService";
import { useState, useEffect } from "react";

export const useOrderItemById = (id, token) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id || !token) return;

    setData(null);
    setError(null);
    setLoading(true);

    const fetchOrderItem = async () => {
      try {
        const orderItemData = await getOrderItemById(id, token);

        setData(orderItemData.data.data);
      } catch (err) {
        setError("Failed to fetch order item.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrderItem();
  }, [id, token]);

  return { data, loading, error };
};
