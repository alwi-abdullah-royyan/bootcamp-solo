import OrderItemCard from "@/components/molecules/OrderItemCard";

const OrderItemsList = ({ orderItems }) => {
  return (
    <div className="mt-4 space-y-4">
      {orderItems && orderItems?.length > 0 ? (
        orderItems.map((item) => <OrderItemCard key={item.id} item={item} />)
      ) : (
        <p className="text-center text-gray-500 mt-2">No items found for this order.</p>
      )}
    </div>
  );
};

export default OrderItemsList;
