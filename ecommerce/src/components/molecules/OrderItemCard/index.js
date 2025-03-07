import Image from "next/image";
import { getImageProduct } from "@/services/productService";

const OrderItemCard = ({ item }) => {
  return (
    <div className="flex items-center bg-gray-100 p-4 rounded-lg shadow-md">
      <Image
        src={getImageProduct(item.product.id)}
        alt={item.product.name}
        className="w-16 h-16 object-cover rounded-lg"
        width={100}
        height={100}
      />
      <div className="ml-4">
        <p className="text-gray-900 font-medium">{item.product.name}</p>
        <p className="text-gray-700 text-sm">Qty: {item.qty}</p>
        <p className="text-gray-700 text-sm">Price: ${item.product.price.toFixed(2)}</p>
        <p className="text-gray-700 text-sm font-semibold">Subtotal: ${item.subtotal.toFixed(2)}</p>
      </div>
    </div>
  );
};

export default OrderItemCard;
