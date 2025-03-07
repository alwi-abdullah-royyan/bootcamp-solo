import Input from "../atoms/InputOnchange";
import Label from "../atoms/Label";

const InputField = ({ label, type = "text", placeholder = "", value, onChange, name, className = "" }) => (
  <div className={`flex flex-col gap-1 ${className}`}>
    {label && <Label htmlFor={name} text={label} className="text-sm font-medium text-gray-700" />}
    <Input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      name={name}
      className={`rounded-md border text-gray-700 placeholder-gray-400 border-gray-300 focus:outline-none 
                focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-allshadow-sm ${className}`}
    />
  </div>
);

export default InputField;
