import { useRouter } from "next/router";
import { useOrderById } from "@/hooks/useOrder";
import { useOrderItemById } from "@/hooks/useOrderItem";
import { useOrderHistoryById } from "@/hooks/useOrderHistory";
import { getToken } from "@/services/authService";
import OrderDetailTemplate from "@/components/templates/OrderDetailTemplate";

const OrderDetail = () => {
  const router = useRouter();
  const { slug } = router.query;
  const token = getToken();

  const { data: order, loading, error } = useOrderById(slug, token);
  const { data: orderItems } = useOrderItemById(slug, token);
  const { data: orderHistory } = useOrderHistoryById(slug, token);

  if (loading) return <p>Loading...</p>;
  if (error || !order) return <p>Error: {error || "Order not found"}</p>;

  return (
    <OrderDetailTemplate
      order={order}
      orderItems={orderItems}
      orderHistory={orderHistory}
      onBack={() => router.back()}
    />
  );
};

export default OrderDetail;
