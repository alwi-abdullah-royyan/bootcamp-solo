import Image from "next/image";
import { getImageProduct } from "@/services/productService";
import Checkbox from "@/components/atoms/Checkbox";
import QuantitySelector from "@/components/molecules/QuantitySelector";
import ButtonOnclick from "@/components/atoms/ButtonOnclick";
import Icons from "@/components/atoms/Icons";
import { useRouter } from "next/router";

const CartItem = ({ item, checked, onCheck, onQtyChange, onDelete }) => {
  const router = useRouter();
  return (
    <div className="flex flex-wrap items-center justify-between p-4 bg-gray-800 rounded-md">
      <div className="flex items-center gap-3 w-full sm:w-auto">
        <Checkbox checked={checked} onChange={onCheck} />
        <Image
          src={getImageProduct(item.product.id)}
          width={80}
          height={80}
          alt={item.product.name}
          className="w-16 h-16 rounded-md"
        />

        <div>
          <p className="text-white font-medium text-sm sm:text-base">{item.product.name}</p>
          <QuantitySelector
            qty={item.qty}
            onIncrease={() => onQtyChange(item.qty + 1, item.product.id)}
            onDecrease={() => onQtyChange(item.qty - 1, item.product.id)}
            onChange={(e) => onQtyChange(Number(e.target.value), item.product.id)}
          />
        </div>
      </div>

      <div className="flex items-center justify-between w-full sm:w-auto mt-2 sm:mt-0 gap-2">
        <p className="text-white font-bold text-sm sm:text-lg">${(item.price * item.qty).toFixed(2)}</p>
        <ButtonOnclick
          icon={Icons.OpenInNew()}
          onClick={() => router.push(`/product/${item.product.id}`)}
          className="p-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm sm:text-base"
        />
        <ButtonOnclick
          icon={Icons.Trash()}
          onClick={onDelete}
          className="ml-4 p-2 bg-red-600 text-white rounded hover:bg-red-700 text-sm sm:text-base"
        />
      </div>
    </div>
  );
};

export default CartItem;
