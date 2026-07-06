const FormInput = ({
  label,
  type = "text",
  name,
  value,
  onChange,
  error,
  placeholder,
  autoComplete,
}) => {
  return (
    <div className="mb-4">
      <label htmlFor={name} className="block text-sm font-medium text-ink mb-1">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        autoComplete={autoComplete}
        className={`w-full px-3 py-2 border rounded-md outline-none transition
          focus:ring-2 focus:ring-primary/40 focus:border-primary
          ${error ? "border-primary" : "border-gray-300"}`}
      />
      {error && <p className="mt-1 text-sm text-primary">{error}</p>}
    </div>
  );
};

export default FormInput;