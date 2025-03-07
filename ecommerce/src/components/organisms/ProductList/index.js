import ButtonOnclick from "@/components/atoms/ButtonOnclick";
import Icons from "@/components/atoms/Icons";
import ProductCard from "@/components/molecules/ProductCard";
import { useRouter } from "next/router";

export default function ProductList({ data, admin = false }) {
  const router = useRouter();
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {admin && (
        <ButtonOnclick
          icon={Icons.AddBox()}
          label="Add Product"
          onClick={() => router.push("/admin/product/add")}
          className="flex flex-col items-center justify-center text-center bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-900 transition-colors"
        />
      )}
      {data?.map((product) => (
        <ProductCard key={product.id} product={product} admin={admin} />
      ))}
    </div>
  );
}
