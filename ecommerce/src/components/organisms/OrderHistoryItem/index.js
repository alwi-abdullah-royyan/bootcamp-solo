import Badge from "@/components/atoms/Badge";

const OrderHistoryItem = ({ history }) => {
  return (
    <div className="flex justify-between p-2 border-b border-gray-300">
      <span className="text-gray-700">{new Date(history.date).toLocaleString()}</span>
      <Badge status={history.status} />
    </div>
  );
};

export default OrderHistoryItem;
