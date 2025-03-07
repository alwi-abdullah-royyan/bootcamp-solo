import ProductImage from "@/components/atoms/ProductImage";
import ProductInfo from "@/components/atoms/ProductInfo";
import ProductActions from "@/components/atoms/ProductActions";
import Icons from "@/components/atoms/Icons";
import { useRouter } from "next/router";

const ProductDetailCard = ({ product, isAdmin, onAddToCart, onUpdate, onDelete }) => {
  const router = useRouter();
  return (
    <div className="relative bg-white shadow-lg rounded-lg p-6 w-full">
      <button
        onClick={() => router.back()}
        className="absolute top-0 left-0 bg-blue-700 hover:bg-blue-900 rounded-tl-lg p-2"
      >
        <Icons.Back />
      </button>
      <ProductImage product={product} />
      <ProductInfo product={product} />
      <ProductActions
        product={product}
        isAdmin={isAdmin}
        onAddToCart={onAddToCart}
        onUpdate={onUpdate}
        onDelete={onDelete}
      />
    </div>
  );
};

export default ProductDetailCard;
