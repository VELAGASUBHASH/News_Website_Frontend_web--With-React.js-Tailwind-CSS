const Button = ({
  children,
  type = "button",
  onClick,
  variant = "primary",
  loading = false,
  disabled = false,
  fullWidth = true,
}) => {
  const base =
    "py-2.5 px-4 rounded-md font-semibold transition disabled:opacity-60 disabled:cursor-not-allowed";
  const variants = {
    primary: "bg-primary text-white hover:bg-primary-dark",
    outline: "border border-ink text-ink hover:bg-ink hover:text-white",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`${base} ${variants[variant]} ${fullWidth ? "w-full" : ""}`}
    >
      {loading ? "Please wait..." : children}
    </button>
  );
};

export default Button;