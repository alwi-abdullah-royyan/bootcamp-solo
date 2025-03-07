import Badge from "@/components/atoms/Badge";

const OrderInfo = ({ order }) => {
  return (
    <div className="space-y-3">
      <p className="text-gray-700">
        <strong>Order ID:</strong> {order.id}
      </p>
      <p className="text-gray-700">
        <strong>User:</strong> {order.user.username}
      </p>
      <p className="text-gray-700">
        <strong>Status:</strong> <Badge status={order.status} />
      </p>
      <p className="text-gray-700">
        <strong>Total Price:</strong> ${order.totalPrice.toFixed(2)}
      </p>
      <p className="text-gray-700">
        <strong>Created At:</strong> {new Date(order.createdAt).toLocaleString()}
      </p>
      <p className="text-gray-700">
        <strong>Last Updated:</strong> {new Date(order.updatedAt).toLocaleString()}
      </p>
    </div>
  );
};

export default OrderInfo;
