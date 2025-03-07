import Image from "next/image";
import { getImageProduct } from "@/services/productService";

const CartItem = ({ item, handleDelete }) => {
  return (
    <div className="flex items-center justify-between p-2 border-b border-gray-700">
      <Image
        src={getImageProduct(item.product.id)}
        width={40}
        height={40}
        alt={item.product.name}
        className="w-10 h-10 rounded-md"
      />
      <div className="flex-1 ml-3">
        <p className="text-sm font-medium">{item.product.name}</p>
        <p className="text-xs text-gray-400">${item.price.toFixed(2)}</p>
      </div>
      <button onClick={() => handleDelete(item.id)} className="text-red-500 hover:text-red-400 text-sm">
        ✕
      </button>
    </div>
  );
};

export default CartItem;
