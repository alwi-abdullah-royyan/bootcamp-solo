const ProductInfo = ({ product }) => {
  return (
    <div className="mt-4 space-y-2">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">{product.productName}</h1>
      <p className="text-gray-700">
        <strong className="text-gray-900">Description:</strong> {product.description}
      </p>
      <p className="text-gray-700">
        <strong className="text-gray-900">Category:</strong> {product.category.name}
      </p>
      <p className="text-gray-700">
        <strong className="text-gray-900">Price:</strong> ${product.price.toFixed(2)}
      </p>
      <p className="text-gray-700">
        <strong className="text-gray-900">Stock:</strong> {product.qty} available
      </p>
      {product.disabled && <p className="text-red-600 font-semibold mt-2">This product is currently unavailable.</p>}
    </div>
  );
};

export default ProductInfo;
