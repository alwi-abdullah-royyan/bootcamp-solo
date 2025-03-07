import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useCart } from "@/hooks/useCart";
import { getToken } from "@/services/authService";
import { deleteCart } from "@/services/cartService";
import Icons from "@/components/atoms/Icons";
import CartDropdown from "@/components/molecules/CartDropdown";

const FloatingCart = () => {
  const [isClient, setIsClient] = useState(false);
  const token = getToken();
  const { data: cart, refetch } = useCart(token);
  const [open, setOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsClient(true);
  }, []);

  const hiddenPages = ["/checkout", "/cart"];
  const isAdminPage = router.pathname.startsWith("/admin");

  if (!isClient || !token || hiddenPages.includes(router.pathname) || isAdminPage) {
    open && setOpen(false);
    return null;
  }

  const handleDelete = async (id) => {
    await deleteCart(id, token);
    refetch();
  };

  const handleCheckout = () => router.push("/cart");

  return (
    <div className="fixed bottom-5 right-5 z-50">
      {/* Cart Button */}
      <button
        className="relative w-16 h-16 bg-blue-700 text-white rounded-full flex items-center justify-center shadow-lg cursor-pointer hover:bg-green-600 transition"
        onClick={() => {
          refetch();
          setOpen(!open);
        }}
      >
        <Icons.Cart />
        {cart?.data?.length > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs px-2 py-1 rounded-full">
            {cart.data.length}
          </span>
        )}
      </button>

      {/* Cart Dropdown */}
      {open && <CartDropdown cart={cart} handleDelete={handleDelete} handleCheckout={handleCheckout} />}
    </div>
  );
};

export default FloatingCart;
