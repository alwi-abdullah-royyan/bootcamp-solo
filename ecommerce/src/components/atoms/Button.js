const Button = ({ label, type = "button", disabled = false, className }) => (
  <button type={type} disabled={disabled} className={`btn ${className}`}>
    {label}
  </button>
);

export default Button;
