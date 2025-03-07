import { useRouter } from "next/router";
import { useDetailProduct } from "@/hooks/useProduct";
import ProductDetailCard from "@/components/molecules/ProductDetailCard";
import { getToken, isAdminUser } from "@/services/authService";
import { deleteProduct } from "@/services/productService";
import { useToast } from "@/services/ToastService";

const ProductDetail = () => {
  const router = useRouter();
  const { slug } = router.query;
  const token = getToken();
  const id = slug ? slug.split("-").pop() : null;
  const { data: product, loading, error } = useDetailProduct(id);
  const isAdmin = isAdminUser();
  const { showToast } = useToast();

  if (loading) return <p className="text-center text-gray-500 text-lg">Loading...</p>;
  if (error) return <p className="text-center text-red-500 text-lg">{error}</p>;
  if (!product) return <p className="text-center text-gray-500 text-lg">Product not found.</p>;

  const handleUpdateProduct = () => router.push(`/admin/product/edit/${product.id}`);

  const handleDeleteProduct = async () => {
    if (confirm("Are you sure you want to delete this product?")) {
      try {
        const response = await deleteProduct(product.id, token);
        if (response.status === 200) {
          showToast("Product deleted successfully.", "success");
          router.push("/admin/product");
        }
      } catch {
        showToast("Error deleting product. Please try again.", "error");
      }
    }
  };

  return (
    <div className="flex w-full min-h-screen bg-gray-100 p-4">
      <ProductDetailCard
        product={product}
        isAdmin={isAdmin}
        onUpdate={handleUpdateProduct}
        onDelete={handleDeleteProduct}
      />
    </div>
  );
};

export default ProductDetail;
