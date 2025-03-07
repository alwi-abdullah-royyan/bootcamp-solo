import { useEffect, useState } from "react";
import { useAllCategories } from "@/hooks/useCategory";
import { deleteCategory } from "@/services/categoryService";
import CategoryList from "@/components/organisms/CategoryList";
import { getToken } from "@/services/authService";

const AllCategory = () => {
  const { data: categories, setData: setCategories, loading, error } = useAllCategories();
  const [deleting, setDeleting] = useState(null);

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this category?")) return;
    const token = getToken();
    setDeleting(id);

    try {
      await deleteCategory(id, token);
      setCategories((prevCategories) => ({
        ...prevCategories, // Keep other properties intact
        data: prevCategories.data.filter((category) => category.id !== id),
      }));
    } catch (error) {
      console.log("Failed to delete category:", error);
      alert("Failed to delete category. Please try again.");
    } finally {
      setDeleting(null);
    }
  };
  return (
    <div className="p-6 bg-gray-900 rounded-lg border border-gray-700">
      <h2 className="text-2xl font-semibold text-white mb-4">All Categories</h2>
      <CategoryList
        categories={categories}
        onDelete={handleDelete}
        deleting={deleting}
        loading={loading}
        error={error}
      />
    </div>
  );
};

export default AllCategory;
