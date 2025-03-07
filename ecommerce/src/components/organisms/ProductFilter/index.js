import { useState } from "react";
import FilterToggleButton from "@/components/molecules/FilterToggleButton";
import FilterInputGroup from "@/components/molecules/FilterInputGroup";

export default function ProductFilter({
  category,
  setCategory,
  minPrice,
  setMinPrice,
  maxPrice,
  setMaxPrice,
  name,
  setName,
  categories,
  applyFilters,
  resetFilters,
}) {
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  return (
    <div className="bg-gray-900 p-4 mb-6">
      <FilterToggleButton isOpen={isFilterOpen} toggleFilter={() => setIsFilterOpen(!isFilterOpen)} />
      {isFilterOpen && (
        <FilterInputGroup
          category={category}
          setCategory={setCategory}
          categories={categories}
          minPrice={minPrice}
          setMinPrice={setMinPrice}
          maxPrice={maxPrice}
          setMaxPrice={setMaxPrice}
          name={name}
          setName={setName}
          applyFilters={applyFilters}
          resetFilters={resetFilters}
        />
      )}
    </div>
  );
}
