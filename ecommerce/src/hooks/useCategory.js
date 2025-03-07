import { getAllCategory, getCategoryById } from "@/services/categoryService";
import { useState, useEffect } from "react";

// Hook to fetch all categories
export const useAllCategories = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setData(null);
    setError(null);
    setLoading(true);

    const fetchAllCategories = async () => {
      try {
        const categoryData = await getAllCategory();

        setData(categoryData);
      } catch (err) {
        setError("Failed to fetch categories.");
      } finally {
        setLoading(false);
      }
    };

    fetchAllCategories();
  }, []);

  return { data, setData, loading, error };
};

// Hook to fetch a category by ID
export const useCategoryById = (id) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;

    setData(null);
    setError(null);
    setLoading(true);

    const fetchCategoryById = async () => {
      try {
        const categoryData = await getCategoryById(id);
        setData(categoryData);
      } catch (err) {
        setError("Failed to fetch category.");
      } finally {
        setLoading(false);
      }
    };

    fetchCategoryById();
  }, [id]);

  return { data, loading, error };
};
