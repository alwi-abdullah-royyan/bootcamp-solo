const Label = ({ htmlFor, text }) => (
  <label htmlFor={htmlFor} className="text-black">
    {text}
  </label>
);

export default Label;
