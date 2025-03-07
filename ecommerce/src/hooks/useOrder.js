import { useState, useEffect, useCallback } from "react";
import {
  changeOrderStatus,
  getAllOrder,
  getOrderById,
  getOrderByStatus,
  getOrderByUser,
  getOrderByUserAndStatus,
} from "@/services/orderService";

export const useOrderByStatus = (token, status = null, page = 0, size = 10) => {
  const [data, setData] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!token) return;

    setData([]);
    setError(null);
    setLoading(true);

    const fetchOrderByStatus = async () => {
      try {
        let response;
        if (status) {
          response = await getOrderByStatus(token, status, page, size);
        } else {
          response = await getAllOrder(token, page, size);
        }

        if (response?.status === 200) {
          setData(response.data.data);
          setTotalPages(response.data.totalPages || 1);
        } else {
          setError("Failed to fetch orders.");
        }
      } catch (err) {
        console.log("Error fetching orders:", err);
        setError("Failed to fetch order by status.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrderByStatus();
  }, [status, token, page, size]);

  return { data, totalPages, loading, error };
};

export const useOrderById = (id, token) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchOrderById = useCallback(async () => {
    if (!id || !token) return;

    setLoading(true);
    setError(null);

    try {
      const orderData = await getOrderById(id, token);
      setData(orderData);
    } catch (err) {
      setError("Failed to fetch order.");
    } finally {
      setLoading(false);
    }
  }, [id, token]);

  useEffect(() => {
    fetchOrderById();
  }, [fetchOrderById]);

  return { data, loading, error, refetch: fetchOrderById };
};

export const useChangeOrderStatus = (id, status, token) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const changeStatusHandler = async () => {
    if (!id || !status || !token) return;

    setLoading(true);
    setError(null);

    try {
      const updatedData = await changeOrderStatus(id, status, token);
      setData(updatedData);
    } catch (err) {
      setError("Failed to change order status.");
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, changeOrderStatus: changeStatusHandler };
};

export function useOrdersUserAndStatus(token, status = null, initialPage = 0, pageSize = 10) {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [totalPages, setTotalPages] = useState(1); // Default total pages

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        let response;

        if (status) {
          response = await getOrderByUserAndStatus(token, status, currentPage, pageSize);
        } else {
          response = await getOrderByUser(token, currentPage, pageSize);
        }

        if (response?.status !== 200) {
          setError("Failed to load orders");
        } else {
          setOrders(response.data.data);
          setTotalPages(response.data.totalPages || 1); // Get total pages from API response
        }
      } catch (err) {
        console.log("Failed to fetch orders", err);
        setError(err.message || "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchOrders();
    }
  }, [token, status, currentPage, pageSize]); // Re-fetch when page changes

  return { orders, loading, error, currentPage, setCurrentPage, totalPages };
}
