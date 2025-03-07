const Text = ({ children, className = "" }) => {
  return <p className={`text-white font-medium ${className}`}>{children}</p>;
};

export default Text;
