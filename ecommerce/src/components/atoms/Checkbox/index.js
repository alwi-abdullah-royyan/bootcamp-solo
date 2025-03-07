const Checkbox = ({ checked, onChange }) => (
  <input type="checkbox" checked={checked} onChange={onChange} className="w-5 h-5 accent-green-500" />
);

export default Checkbox;
