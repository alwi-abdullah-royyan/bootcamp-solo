export default function FilterToggleButton({ isOpen, toggleFilter }) {
  return (
    <button
      onClick={toggleFilter}
      className="w-full flex justify-between items-center bg-gray-800 text-white px-4 py-2 rounded-lg"
    >
      <span>Filter Products</span>
      <span>{isOpen ? "▲" : "▼"}</span>
    </button>
  );
}
