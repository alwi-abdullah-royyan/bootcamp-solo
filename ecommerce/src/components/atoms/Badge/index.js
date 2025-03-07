const statusClasses = {
  ALL: "bg-gray-400 text-white",
  PENDING: "bg-yellow-400 text-black",
  CONFIRMED: "bg-green-500 text-white",
  PROCESSING: "bg-blue-500 text-white",
  "ON TRANSIT": "bg-indigo-500 text-white",
  DELIVERED: "bg-teal-500 text-white",
  CANCELLED: "bg-red-500 text-white",
  RETURNED: "bg-orange-500 text-white",
  REJECTED: "bg-gray-600 text-white",
  REFUNDED: "bg-purple-500 text-white",
};

const Badge = ({ status }) => {
  return (
    <span className={`px-2 py-1 text-sm font-semibold rounded-md ${statusClasses[status] || "bg-gray-300"}`}>
      {status}
    </span>
  );
};

export default Badge;
