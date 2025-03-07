import { useState, useEffect } from "react";
import { getOrderStatusCanChangedTo, changeOrderStatus } from "@/services/orderService";

const OrderStatusUpdate = ({ orderId, token, onStatusChange }) => {
  const [availableStatuses, setAvailableStatuses] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState("");

  useEffect(() => {
    if (orderId) {
      getOrderStatusCanChangedTo(orderId, token).then((statuses) => {
        setAvailableStatuses(statuses);
        if (statuses.length > 0) {
          setSelectedStatus(statuses[0]); // Default to first available status
        }
      });
    }
  }, [orderId, token]);

  const handleStatusChange = async () => {
    if (!selectedStatus) return;

    const response = await changeOrderStatus(orderId, selectedStatus, token);
    if (response?.status === 200) {
      alert("Order status updated successfully");
      onStatusChange();
    } else {
      alert("Failed to update order status");
    }
  };

  return (
    <div className="mt-4">
      <label className="block text-gray-900 font-semibold">Change Order Status:</label>
      <div className="flex items-center gap-2">
        {availableStatuses.length > 0 ? (
          <>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-3 py-2 border text-black border-gray-300 rounded-md"
            >
              {availableStatuses.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
            <button
              onClick={handleStatusChange}
              className="bg-blue-600 hover:bg-blue-800 text-white px-3 py-2 rounded-md"
            >
              Update
            </button>
          </>
        ) : (
          <p className="text-center text-gray-500 mt-2">Order cannot be updated.</p>
        )}
      </div>
    </div>
  );
};

export default OrderStatusUpdate;
