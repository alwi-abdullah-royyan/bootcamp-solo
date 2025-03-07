const ButtonOnclick = ({ label, icon = false, onClick, type = "button", disabled = false, className }) => (
  <button onClick={onClick} type={type} disabled={disabled} className={`btn ${className}`}>
    {icon}
    {label}
  </button>
);

export default ButtonOnclick;
