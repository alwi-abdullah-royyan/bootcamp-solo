import ButtonOnclick from "@/components/atoms/ButtonOnclick";
import QuantityInput from "@/components/atoms/QuantityInput";

const QuantitySelector = ({ qty, onIncrease, onDecrease, onChange }) => (
  <div className="flex items-center gap-2">
    <ButtonOnclick
      label="-"
      onClick={onDecrease}
      disabled={qty <= 1}
      className="px-2 py-1 bg-gray-700 text-white rounded disabled:opacity-50"
    />
    <QuantityInput value={qty} onChange={onChange} />
    <ButtonOnclick label="+" onClick={onIncrease} className="px-2 py-1 bg-gray-700 text-white rounded" />
  </div>
);

export default QuantitySelector;
