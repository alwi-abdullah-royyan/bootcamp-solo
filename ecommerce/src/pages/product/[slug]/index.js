import { useRouter } from "next/router";
import { useDetailProduct } from "@/hooks/useProduct";
import ProductDetailCard from "@/components/molecules/ProductDetailCard";
import { getToken } from "@/services/authService";
import { manageCart } from "@/services/cartService";
import { useToast } from "@/services/ToastService";

const ProductDetail = () => {
  const router = useRouter();
  const { slug } = router.query;
  const token = getToken();
  const id = slug ? slug.split("-").pop() : null;
  const { data: product, loading, error } = useDetailProduct(id);
  const { showToast } = useToast();

  if (loading) return <p className="text-center text-gray-500 text-lg">Loading...</p>;
  if (error) return <p className="text-center text-red-500 text-lg">{error}</p>;
  if (!product) return <p className="text-center text-gray-500 text-lg">Product not found.</p>;

  const handleAddToCart = async (id, qty) => {
    try {
      if (!token) {
        showToast("You must login.", "failed");
        router.push("/login");
        return;
      }
      const cartItem = await manageCart(qty, id, token);
      if (cartItem.status === 200) {
        showToast("Product added to cart successfully.", "success");
      } else {
        showToast(cartItem.message || "Failed to add product to cart.", "error");
      }
    } catch (error) {
      showToast("Something went wrong. Please try again.", "error");
    }
  };

  return (
    <div className="flex w-full min-h-screen bg-gray-100 p-4">
      <ProductDetailCard product={product} onAddToCart={handleAddToCart} />
    </div>
  );
};

export default ProductDetail;
