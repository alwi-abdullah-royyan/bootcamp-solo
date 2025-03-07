import { useOrdersUserAndStatus } from "@/hooks/useOrder";
import { getToken } from "@/services/authService";
import { useState } from "react";
import Dropdown from "@/components/atoms/Dropdown";
import PaginationControls from "@/components/molecules/PaginationControls";
import UserOrderList from "@/components/organisms/UserOrderList";

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

const OrderHistory = () => {
  const token = getToken();
  const [status, setStatus] = useState("ALL");
  const [currentPage, setCurrentPage] = useState(0);
  const pageSize = 10;

  const { orders, loading, error, totalPages } = useOrdersUserAndStatus(
    token,
    status !== "ALL" ? status : null,
    currentPage,
    pageSize
  );

  return (
    <div className="max-w-3xl mx-auto p-4 mt-2 bg-gray-900 shadow-md rounded-md">
      <h2 className="text-2xl font-bold mb-4 text-center text-white">Order History</h2>

      <Dropdown
        label="Filter by Status:"
        options={statusOptions}
        value={status}
        onChange={(e) => {
          setStatus(e.target.value);
          setCurrentPage(0);
        }}
      />

      <UserOrderList orders={orders} loading={loading} error={error} />

      <PaginationControls page={currentPage} setPage={setCurrentPage} totalPages={totalPages} />
    </div>
  );
};

export default OrderHistory;
