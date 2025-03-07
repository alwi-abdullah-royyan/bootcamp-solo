// src/components/atoms/Input.jsx
const InputOnchange = ({ type = "text", placeholder, value, onChange, name, className }) => (
  <input
    type={type}
    placeholder={placeholder}
    value={value}
    onChange={onChange}
    name={name}
    className={`${className}`}
  />
);

export default InputOnchange;
