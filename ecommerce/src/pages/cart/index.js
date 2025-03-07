import { useCart } from "@/hooks/useCart";
import { getToken } from "@/services/authService";
import { checkCart, manageCart, deleteCart } from "@/services/cartService";
import { createOrder } from "@/services/orderService";
import { useState, useMemo } from "react";
import { useToast } from "@/services/ToastService";
import CartItem from "@/components/organisms/CartItem";
import ButtonOnclick from "@/components/atoms/ButtonOnclick";
import { useRouter } from "next/router";

const Cart = () => {
  const token = getToken();
  const { data: cart, loading, error, refetch } = useCart(token);
  const [checkedItems, setCheckedItems] = useState({});
  const { showToast } = useToast();
  const router = useRouter();
  const handleCheck = async (id, checked) => {
    await checkCart(id, checked, token);
    setCheckedItems((prev) => ({ ...prev, [id]: checked }));
  };

  const handleQtyChange = async (qty, productId) => {
    if (qty < 1) return;
    await manageCart(qty, productId, token);
    refetch();
  };

  const handleDelete = async (id) => {
    await deleteCart(id, token);
    refetch();
  };

  const totalPrice = useMemo(() => {
    if (!cart?.data) return 0;
    return cart.data
      .filter((item) => checkedItems[item.id] ?? item.checked)
      .reduce((sum, item) => sum + item.price * item.qty, 0);
  }, [cart, checkedItems]);

  const handleBuy = async () => {
    try {
      const response = await createOrder(token);
      console.log(response);
      if (response.status === 200) {
        showToast("Order created successfully.");
        router.push(`/order/${response.data.data.id}`);
      } else {
        showToast(response.response.data.message, "error");
      }
    } catch (error) {
      showToast("Something went wrong. Please try again.", "error");
    }
  };

  if (loading) return <p className="text-center text-gray-400">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="max-w-3xl mx-auto p-4 mt-2 bg-gray-900 shadow-md rounded-md">
      <h2 className="text-2xl font-bold mb-4 text-center text-white">Shopping Cart</h2>

      {cart?.data?.length === 0 ? (
        <p className="text-center text-gray-400 text-lg">Cart is empty</p>
      ) : (
        <>
          <div className="space-y-4">
            {cart.data.map((item) => (
              <CartItem
                key={item.id}
                item={item}
                checked={checkedItems[item.id] ?? item.checked}
                onCheck={(e) => handleCheck(item.id, e.target.checked)}
                onQtyChange={handleQtyChange}
                onDelete={() => handleDelete(item.id)}
              />
            ))}
          </div>

          <div className="mt-6 flex flex-col sm:flex-row justify-between items-center">
            <p className="text-xl text-white font-bold">Total: ${totalPrice.toFixed(2)}</p>
            <ButtonOnclick
              label="Buy"
              onClick={handleBuy}
              disabled={totalPrice === 0}
              className="px-4 py-2 mt-3 sm:mt-0 bg-green-500 text-white rounded disabled:opacity-50"
            />
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
