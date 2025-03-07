import CartItem from "@/components/molecules/CartItem";

const CartDropdown = ({ cart, handleDelete, handleCheckout }) => {
  return (
    <div className="absolute bottom-20 right-0 w-72 bg-gray-900 text-white rounded-lg shadow-lg p-4">
      <h3 className="text-lg font-bold text-center">Your Cart</h3>

      {cart?.data?.length === 0 ? (
        <p className="text-center text-gray-400">Cart is empty</p>
      ) : (
        <div className="max-h-60 overflow-y-auto">
          {cart.data.map((item) => (
            <CartItem key={item.id} item={item} handleDelete={handleDelete} />
          ))}
        </div>
      )}

      {cart?.data?.length > 0 && (
        <button
          onClick={handleCheckout}
          className="w-full mt-3 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          Go to Cart
        </button>
      )}
    </div>
  );
};

export default CartDropdown;
