import OrderCard from "@/components/molecules/OrderCard";
import LoadingMessage from "@/components/atoms/LoadingMessage";

const OrderList = ({ orders, loading, error }) => {
  if (loading) return <LoadingMessage />;
  if (error) return <p className="text-center text-red-500">{error}</p>;
  if (!orders || orders.length === 0) return <p className="text-center text-gray-400 text-lg">No orders found.</p>;

  return (
    <div className="space-y-4">
      {orders.map((order) => (
        <OrderCard key={order.id} order={order} />
      ))}
    </div>
  );
};

export default OrderList;
