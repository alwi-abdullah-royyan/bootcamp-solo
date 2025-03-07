import Image from "next/image";
import { getImageProduct } from "@/services/productService";
import { useRouter } from "next/router";

export default function ProductCard({ product, admin = false }) {
  const router = useRouter();

  return (
    <div
      key={product.id}
      className={`border text-black rounded-lg p-4 shadow-sm hover:shadow-md transition cursor-pointer ${
        product.disabled ? "bg-gray-300" : "bg-white"
      }`}
      onClick={() => {
        if (!product.disabled) {
          admin ? router.push(`/admin/product/details/${product.id}`) : router.push(`/product/${product.id}`);
        }
      }}
    >
      <Image
        src={getImageProduct(product.id)}
        alt={product.productName}
        className="w-full h-40 object-cover rounded-md mb-3"
        width={100}
        height={100}
      />
      <h3 className="text-lg font-semibold">{product.productName}</h3>
      <p className="">{product.description}</p>
      <p className="font-bold text-blue-500">${product.price}</p>
      <p className="text-sm text-gray-500">{product.category.name}</p>
      <p className={`text-sm ${product.disabled ? "text-red-500" : "text-green-500"}`}>
        {product.disabled ? "Out of Stock" : "In Stock"}
      </p>
    </div>
  );
}
