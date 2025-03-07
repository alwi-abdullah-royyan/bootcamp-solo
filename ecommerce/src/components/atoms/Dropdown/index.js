const Dropdown = ({ label, options, value, onChange }) => {
  return (
    <div className="mb-4 text-center">
      <label htmlFor="dropdown" className="text-white font-medium mr-2">
        {label}
      </label>
      <select
        id="dropdown"
        value={value}
        onChange={onChange}
        className="bg-gray-800 text-white px-3 py-1 rounded-md focus:outline-none"
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Dropdown;
