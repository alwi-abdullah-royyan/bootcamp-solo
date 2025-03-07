import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { getToken } from "@/services/authService";
import InputOnchange from "@/components/atoms/InputOnchange";
import Button from "@/components/atoms/Button";
import { useToast } from "@/services/ToastService";
import { useCategoryById } from "@/hooks/useCategory";
import { updateCategory } from "@/services/categoryService";

const EditCategory = () => {
  const router = useRouter();
  const { slug } = router.query; // Get category ID (slug) from URL
  const { data: category, loading, error } = useCategoryById(slug); // Fetch category data
  const [name, setName] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);
  const { showToast } = useToast();

  // Set category name when data is loaded
  useEffect(() => {
    if (category) {
      setName(category.name);
    }
  }, [category]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim()) {
      showToast("Category name is required.");
      return;
    }

    try {
      setIsUpdating(true);
      const token = getToken();
      const response = await updateCategory(slug, name, token);

      if (response.status && response.status !== 200) {
        showToast("Failed to update category.");
        setIsUpdating(false);
        return;
      }

      showToast("Category updated successfully.");
      setTimeout(() => router.push("/admin/category"), 1000);
    } catch (err) {
      showToast({ message: "Failed to update category.", type: "error" });
    } finally {
      setIsUpdating(false);
    }
  };

  if (loading) return <p className="text-center text-gray-400">Loading...</p>;
  if (error) return <p className="text-center text-red-500">Error: {error}</p>;

  return (
    <div className="max-w-md mx-auto p-6 bg-gray-900 shadow-md rounded-md">
      <h2 className="text-2xl font-bold mb-4 text-center">Edit Category</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <InputOnchange
          type="text"
          placeholder="Category Name"
          value={name}
          name="name"
          onChange={(e) => setName(e.target.value)}
          className="w-full px-4 py-2 border rounded-md text-black"
        />

        <Button
          label={isUpdating ? "Updating..." : "Update Category"}
          type="submit"
          disabled={isUpdating}
          className="w-full bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
        />
      </form>
    </div>
  );
};

export default EditCategory;
