import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { createCategory } from "@/services/categoryService";
import { getToken } from "@/services/authService";
import InputOnchange from "@/components/atoms/InputOnchange";
import Button from "@/components/atoms/Button";
import { useToast } from "@/services/ToastService";

const CategoryForm = () => {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { showToast } = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!name.trim()) {
      showToast("Category name is required.");
      setLoading(false);

      return;
    }

    try {
      const token = getToken();
      const response = await createCategory(name, token);
      console.log(response);

      if (response.status && response.status != 200) {
        showToast("failed to add category");
        setLoading(false);
        return;
      }
      showToast("Category added successfully.");
      setTimeout(() => {
        router.push("/admin/category");
      }, 1000);
    } catch (err) {
      showToast({ message: "Failed to save category.", type: "error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-gray-900 shadow-md rounded-md">
      <h2 className="text-2xl font-bold mb-4 text-center">Add New Category</h2>

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
          label={loading ? "Adding..." : "Add Category"}
          type="submit"
          disabled={loading}
          className="w-full bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
        />
      </form>
    </div>
  );
};

export default CategoryForm;
