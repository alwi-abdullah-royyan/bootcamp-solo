import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { createProduct } from "@/services/productService";
import { getAllCategory } from "@/services/categoryService";
import { getToken } from "@/services/authService";

const AddProduct = () => {
  const router = useRouter();
  const token = getToken();

  const [formData, setFormData] = useState({
    productName: "",
    description: "",
    price: "",
    categoryId: "",
    qty: "",
  });

  const [categories, setCategories] = useState([]);
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Fetch categories on component mount
  useEffect(() => {
    async function fetchCategories() {
      try {
        const response = await getAllCategory();

        if (response?.status === 200) {
          setCategories(response.data); // Set category list
        }
      } catch (err) {
        console.log("Error fetching categories:", err);
        setError("Failed to load categories");
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

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    // Prepare FormData
    const data = new FormData();
    data.append("productName", formData.productName);
    data.append("description", formData.description);
    data.append("price", formData.price);
    data.append("categoryId", formData.categoryId);
    data.append("qty", formData.qty);
    if (image) data.append("image", image); // Append image if selected

    // API Call
    try {
      const response = await createProduct(data, token);
      if (response.status === 200) {
        setSuccess("Product added successfully!");
        setTimeout(() => router.push("/admin/product"), 1000); // Redirect after success
      } else {
        throw new Error("Failed to add product");
      }
    } catch (err) {
      setError("Error adding product. Please try again.");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-gray-800 p-6 rounded-lg shadow-md w-full max-w-lg">
        <h1 className="text-2xl font-bold text-center text-white">Add New Product</h1>

        {error && <p className="text-red-500 text-center mt-2">{error}</p>}
        {success && <p className="text-green-500 text-center mt-2">{success}</p>}

        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          {/* Product Name */}
          <div>
            <label className="block font-semibold">Product Name:</label>
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
            <label className="block font-semibold">Description:</label>
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
            <label className="block font-semibold">Price ($):</label>
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
            <label className="block font-semibold">Category:</label>
            <select
              name="categoryId"
              value={formData.categoryId}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border text-black border-gray-300 rounded-md"
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
            <label className="block font-semibold">Quantity:</label>
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
            <label className="block font-semibold">Product Image:</label>
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
            disabled={loading}
            className={`w-full bg-blue-600 text-white py-2 rounded-md ${
              loading ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-800"
            }`}
          >
            {loading ? "Adding..." : "Add Product"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
