// src/components/atoms/Input.jsx
const Input = ({ type = "text", placeholder, value, name, className }) => (
  <input type={type} placeholder={placeholder} value={value} name={name} className={`input ${className}`} />
);

export default Input;
