import { useRouter } from "next/router";

const UserOrderCard = ({ order }) => {
  const router = useRouter();

  return (
    <div className="p-4 bg-gray-800 rounded-md cursor-pointer" onClick={() => router.push(`/order/${order.id}`)}>
      <div className="flex justify-between items-center">
        <div>
          <p className="text-white font-medium text-sm sm:text-base">
            <strong>Order ID:</strong> {order.id}
          </p>
          <p className="text-gray-400 text-xs sm:text-sm">
            <strong>Status:</strong> {order.status}
          </p>
          <p className="text-gray-400 text-xs sm:text-sm">
            <strong>Date:</strong> {new Date(order.createdAt).toLocaleString()}
          </p>
        </div>
        <p className="text-white font-bold text-sm sm:text-lg">${order.totalPrice.toFixed(2)}</p>
      </div>
    </div>
  );
};

export default UserOrderCard;
