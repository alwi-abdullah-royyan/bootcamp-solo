import ButtonOnclick from "@/components/atoms/ButtonOnclick";
import Icons from "@/components/atoms/Icons";
import OrderInfo from "@/components/molecules/OrderInfo";
import OrderHistoryList from "@/components/organisms/OrderHistoryList";
import OrderItemsList from "@/components/organisms/OrderItemsList";
import OrderStatusUpdate from "@/components/organisms/OrderStatusUpdate";

const AdminOrderDetailTemplate = ({ order, orderItems, orderHistory, token, onBack, onStatusChange }) => {
  return (
    <div className="relative my-5 bg-white shadow-lg rounded-lg p-6 w-full max-w-2xl mx-auto">
      {/* Back Button */}
      <ButtonOnclick
        onClick={onBack}
        icon={<Icons.Back />}
        className="absolute top-0 left-0 bg-blue-700 hover:bg-blue-900 text-white px-3 py-1 rounded-tl-lg"
      />

      <h1 className="text-2xl pt-5 font-bold text-gray-800 mb-4 text-center">Admin Order Details</h1>

      <OrderInfo order={order} />

      {/* Status Update Dropdown */}
      <OrderStatusUpdate orderId={order.id} token={token} onStatusChange={onStatusChange} />

      <h2 className="text-xl font-bold text-gray-800 mt-6">Purchased Items</h2>
      <OrderItemsList orderItems={orderItems} />

      <h2 className="text-xl font-bold text-gray-800 mt-6">Order History</h2>
      <OrderHistoryList orderHistory={orderHistory} />
    </div>
  );
};

export default AdminOrderDetailTemplate;
