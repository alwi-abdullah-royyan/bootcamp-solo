import InputOnchange from "@/components/atoms/InputOnchange";
import ButtonOnclick from "@/components/atoms/ButtonOnclick";

export default function FilterInputGroup({
  category,
  categories,
  setCategory,
  minPrice,
  setMinPrice,
  maxPrice,
  setMaxPrice,
  name,
  setName,
  applyFilters,
  resetFilters,
}) {
  return (
    <div className="mt-4 grid text-black grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <InputOnchange
        type="text"
        placeholder="Product Name"
        className="p-2 border rounded"
        value={name}
        onChange={(e) => setName(e.target.value)}
        name="productName"
      />
      <select className="p-2 border rounded" value={category} onChange={(e) => setCategory(e.target.value)}>
        <option value="">All Categories</option>
        {categories?.map((cat) => (
          <option key={cat.name} value={cat.name}>
            {cat.name}
          </option>
        ))}
      </select>

      <InputOnchange
        type="number"
        placeholder="Min Price"
        className="p-2 border rounded"
        value={minPrice}
        onChange={(e) => setMinPrice(e.target.value)}
        name="minPrice"
      />
      <InputOnchange
        type="number"
        placeholder="Max Price"
        className="p-2 border rounded"
        value={maxPrice}
        onChange={(e) => setMaxPrice(e.target.value)}
        name="maxPrice"
      />
      <ButtonOnclick
        onClick={applyFilters}
        className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        label="Apply Filters"
      />
      <ButtonOnclick
        onClick={resetFilters}
        className="bg-red-500 text-white p-2 rounded hover:bg-red-600"
        label="Reset"
      />
    </div>
  );
}
