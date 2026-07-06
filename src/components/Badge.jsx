const VARIANT_STYLES = {
  success: "bg-green-50 text-green-700 border-green-200",
  danger: "bg-red-50 text-primary border-red-200",
  neutral: "bg-gray-100 text-gray-600 border-gray-200",
  gold: "bg-yellow-50 text-accent border-yellow-200",
};

const Badge = ({ children, variant = "neutral" }) => (
  <span
    className={`inline-block px-2 py-0.5 text-xs font-semibold rounded-full border capitalize ${VARIANT_STYLES[variant]}`}
  >
    {children}
  </span>
);

export default Badge;