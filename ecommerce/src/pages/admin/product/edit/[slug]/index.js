import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useDetailProduct } from "@/hooks/useProduct";
import { updateProduct } from "@/services/productService";
import { getAllCategory } from "@/services/categoryService";
import { getToken } from "@/services/authService";

const EditProduct = () => {
  const router = useRouter();
  const { slug } = router.query; // Get product ID from URL
  const token = getToken();

  const { data: product, loading, error } = useDetailProduct(slug);

  const [formData, setFormData] = useState({
    productName: "",
    description: "",
    price: "",
    categoryId: "",
    qty: "",
  });

  const [categories, setCategories] = useState([]);
  const [image, setImage] = useState(null);
  const [loadingUpdate, setLoadingUpdate] = useState(false);
  const [errorUpdate, setErrorUpdate] = useState("");
  const [success, setSuccess] = useState("");

  // Load product data when available
  useEffect(() => {
    if (product) {
      setFormData({
        productName: product.productName || "",
        description: product.description || "",
        price: product.price || "",
        categoryId: product.categoryId || "",
        qty: product.qty || "",
      });
    }
  }, [product]);

  // Fetch categories
  useEffect(() => {
    async function fetchCategories() {
      try {
        const response = await getAllCategory();
        if (response?.status === 200) {
          setCategories(response.data);
        }
      } catch (err) {
        console.log("Error fetching categories:", err);
      }
    }
    fetchCategories();
  }, []);

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle file input change
  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  // Handle form submission (Update Product)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoadingUpdate(true);
    setErrorUpdate("");
    setSuccess("");

    // Prepare FormData
    const data = new FormData();
    data.append("productName", formData.productName);
    data.append("description", formData.description);
    data.append("price", formData.price);
    data.append("categoryId", formData.categoryId);
    data.append("qty", formData.qty);
    if (image) data.append("image", image);

    try {
      const response = await updateProduct(slug, data, token);
      if (response.status === 200) {
        setSuccess("Product updated successfully!");
        setTimeout(() => router.push("/admin/product"), 1000); // Redirect after success
      } else {
        throw new Error("Failed to update product");
      }
    } catch (err) {
      setErrorUpdate("Error updating product. Please try again.");
    }

    setLoadingUpdate(false);
  };

  if (loading) return <p className="text-center text-gray-500 text-lg">Loading product details...</p>;
  if (error) return <p className="text-center text-red-500 text-lg">{error}</p>;

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-gray-800 p-6 rounded-lg shadow-md w-full max-w-lg">
        <h1 className="text-2xl font-bold text-center text-white">Edit Product</h1>

        {errorUpdate && <p className="text-red-500 text-center mt-2">{errorUpdate}</p>}
        {success && <p className="text-green-500 text-center mt-2">{success}</p>}

        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          {/* Product Name */}
          <div>
            <label className="block font-semibold text-white">Product Name:</label>
            <input
              type="text"
              name="productName"
              value={formData.productName}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 text-black rounded-md"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block font-semibold text-white">Description:</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 text-black rounded-md"
            />
          </div>

          {/* Price */}
          <div>
            <label className="block font-semibold text-white">Price ($):</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 text-black rounded-md"
            />
          </div>

          {/* Category Dropdown */}
          <div>
            <label className="block font-semibold text-white">Category:</label>
            <select
              name="categoryId"
              value={formData.categoryId}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 text-black rounded-md"
            >
              <option value="" disabled>
                Select a category
              </option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          {/* Quantity */}
          <div>
            <label className="block font-semibold text-white">Quantity:</label>
            <input
              type="number"
              name="qty"
              value={formData.qty}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 text-black rounded-md"
            />
          </div>

          {/* Image Upload */}
          <div>
            <label className="block font-semibold text-white">Product Image (optional):</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loadingUpdate}
            className={`w-full bg-blue-600 text-white py-2 rounded-md ${
              loadingUpdate ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-800"
            }`}
          >
            {loadingUpdate ? "Updating..." : "Update Product"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditProduct;
