import { useRouter } from "next/router";
import { useOrderItemById } from "@/hooks/useOrderItem";
import { useOrderHistoryById } from "@/hooks/useOrderHistory";
import { getToken } from "@/services/authService";
import AdminOrderDetailTemplate from "@/components/templates/AdminOrderDetailTemplate";
import { useOrderById } from "@/hooks/useOrder";

const OrderDetailAdmin = () => {
  const router = useRouter();
  const { slug } = router.query;
  const token = getToken();

  const { data: order, loading, error, refetch } = useOrderById(slug, token);
  const { data: orderItems } = useOrderItemById(slug, token);
  const { data: orderHistory } = useOrderHistoryById(slug, token);

  if (loading) return <p className="text-center text-gray-500 text-lg">Loading...</p>;
  if (error || !order) return <p className="text-center text-red-500 text-lg">{error || "Order not found"}</p>;

  return (
    <AdminOrderDetailTemplate
      order={order}
      orderItems={orderItems}
      orderHistory={orderHistory}
      token={token}
      onBack={() => router.back()}
      onStatusChange={refetch} // Refresh order details when status changes
    />
  );
};

export default OrderDetailAdmin;
