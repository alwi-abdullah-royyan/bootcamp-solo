import OrderHistoryItem from "../OrderHistoryItem";

const OrderHistoryList = ({ orderHistory }) => {
  return (
    <div className="mt-4 space-y-2 bg-gray-50 p-4 rounded-lg shadow-md">
      {orderHistory && orderHistory?.length > 0 ? (
        orderHistory.map((history) => <OrderHistoryItem key={history.id} history={history} />)
      ) : (
        <p className="text-center text-gray-500 mt-2">No order history available.</p>
      )}
    </div>
  );
};

export default OrderHistoryList;
