import { getAllProduct, getProductDetail, getProductWithFilter } from "@/services/productService";
import { useState, useEffect } from "react";

export const useProducts = (page = 0, size = 10, category, minPrice, maxPrice, name) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalPages, setTotalPages] = useState(1);

  const hasFilters = category || minPrice !== undefined || maxPrice !== undefined || name;

  useEffect(() => {
    setData(null);
    setError(null);
    setLoading(true);

    const fetchProducts = async () => {
      try {
        let productResponse;
        if (hasFilters) {
          productResponse = await getProductWithFilter(page, size, category, minPrice, maxPrice, name);
        } else {
          productResponse = await getAllProduct(page, size);
        }

        setData(productResponse.data || []);
        setTotalPages(productResponse?.totalPages || 1);
      } catch (err) {
        setError("Failed to fetch products.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [page, size, category, minPrice, maxPrice, name, hasFilters]);

  return { data, loading, error, totalPages };
};

export const useDetailProduct = (id) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;

    const fetchProduct = async () => {
      try {
        const response = await getProductDetail(id);
        setData(response.data.data);
      } catch (err) {
        setError("Failed to fetch product.");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  return { data, loading, error };
};
