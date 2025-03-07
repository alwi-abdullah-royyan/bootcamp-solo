import { useState } from "react";
import { useRouter } from "next/router";
import { useAllCategories } from "@/hooks/useCategory";
import { useProducts } from "@/hooks/useProduct";
import ProductFilter from "@/components/organisms/ProductFilter";
import ProductList from "@/components/organisms/ProductList";
import PaginationControls from "@/components/molecules/PaginationControls";
import ButtonOnclick from "@/components/atoms/ButtonOnclick";

export default function AdminProductsPage() {
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(10);
  const [category, setCategory] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [name, setName] = useState("");

  const { data, loading, error, totalPages } = useProducts(page, size, category, minPrice, maxPrice, name);
  const { data: categories } = useAllCategories();
  const router = useRouter();

  const applyFilters = () => setPage(0);
  const resetFilters = () => {
    setCategory("");
    setMinPrice("");
    setMaxPrice("");
    setName("");
    setPage(0);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 pb-8">
      {/* Filter Section */}
      <ProductFilter
        category={category}
        setCategory={setCategory}
        minPrice={minPrice}
        setMinPrice={setMinPrice}
        maxPrice={maxPrice}
        setMaxPrice={setMaxPrice}
        name={name}
        setName={setName}
        categories={categories?.data || []}
        applyFilters={applyFilters}
        resetFilters={resetFilters}
      />

      {/* Page Title */}
      <h1 className="text-3xl font-bold text-center text-black mb-6">Product List Admin</h1>

      {/* Loading & Error Handling */}
      {loading && <p className="text-center">Loading products...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}

      {/* Product List */}
      <ProductList data={data} admin={true} />

      {/* Pagination Controls */}
      <PaginationControls page={page} setPage={setPage} totalPages={totalPages} />
    </div>
  );
}
