const QuantityInput = ({ value, onChange }) => (
  <input
    type="number"
    min="1"
    value={value}
    onChange={onChange}
    className="w-16 px-2 py-1 bg-gray-700 text-white rounded text-center"
  />
);

export default QuantityInput;
