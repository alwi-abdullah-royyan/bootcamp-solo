import { useState } from "react";
import Icons from "@/components/atoms/Icons";

const ProductActions = ({ product, isAdmin, onAddToCart, onUpdate, onDelete }) => {
  const [quantity, setQuantity] = useState(1);

  return (
    <div className="mt-6 flex space-x-4 items-center">
      {/* User: Add to Cart */}
      {!isAdmin && (
        <>
          <input
            type="number"
            min="1"
            max={product.qty}
            value={quantity}
            onChange={(e) => setQuantity(Math.max(1, Math.min(product.qty, Number(e.target.value))))}
            className="text-black w-16 px-2 py-1 border rounded-lg text-center"
          />

          <button
            onClick={() => onAddToCart(product.id, quantity)}
            className={`px-6 py-2 text-white font-semibold rounded-lg ${
              product.qty > 0 && !product.disabled
                ? "flex bg-green-600 hover:bg-green-700"
                : "flex bg-gray-400 cursor-not-allowed"
            }`}
            disabled={product.qty <= 0 || product.disabled}
          >
            <Icons.Cart /> Add to Cart
          </button>
        </>
      )}

      {/* Admin: Update & Delete Buttons */}
      {isAdmin && (
        <>
          <button
            onClick={onUpdate}
            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg"
          >
            Update Product
          </button>

          <button
            onClick={onDelete}
            className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg"
          >
            Delete Product
          </button>
        </>
      )}
    </div>
  );
};

export default ProductActions;
