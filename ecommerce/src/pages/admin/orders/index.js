import { useOrderByStatus } from "@/hooks/useOrder";
import { getToken } from "@/services/authService";
import { useState } from "react";
import Dropdown from "@/components/atoms/Dropdown";
import PaginationControls from "@/components/molecules/PaginationControls";
import OrderList from "@/components/organisms/OrderList";

const statusOptions = [
  "ALL",
  "PENDING",
  "CONFIRMED",
  "PROCESSING",
  "ON TRANSIT",
  "DELIVERED",
  "CANCELLED",
  "RETURNED",
  "REJECTED",
  "REFUNDED",
];

const OrderHistoryAdmin = () => {
  const token = getToken();
  const [status, setStatus] = useState("ALL");
  const [page, setPage] = useState(0);
  const size = 10;

  const {
    data: orders,
    totalPages,
    loading,
    error,
  } = useOrderByStatus(token, status !== "ALL" ? status : null, page, size);

  return (
    <div className="max-w-3xl mx-auto p-4 my-4 bg-gray-900 shadow-md rounded-md">
      <h2 className="text-2xl font-bold mb-4 text-center text-white">Order History</h2>

      <Dropdown
        label="Filter by Status:"
        options={statusOptions}
        value={status}
        onChange={(e) => {
          setStatus(e.target.value);
          setPage(0);
        }}
      />

      <OrderList orders={orders} loading={loading} error={error} />

      <PaginationControls page={page} setPage={setPage} totalPages={totalPages} className="text-white" />
    </div>
  );
};

export default OrderHistoryAdmin;
