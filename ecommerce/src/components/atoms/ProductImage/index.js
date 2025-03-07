import Image from "next/image";
import { getImageProduct } from "@/services/productService";

const ProductImage = ({ product }) => {
  return (
    <div className="flex justify-center mt-10">
      <Image
        src={getImageProduct(product.id)}
        alt={product.productName}
        width={300}
        height={300}
        className="rounded-lg"
      />
    </div>
  );
};

export default ProductImage;
