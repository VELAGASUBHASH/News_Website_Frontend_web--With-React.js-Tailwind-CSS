const StatCard = ({ label, value, accent = false }) => {
  return (
    <div className="border border-gray-200 rounded-md p-5">
      <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">{label}</p>
      <p className={`text-3xl font-bold font-serif mt-2 ${accent ? "text-primary" : "text-ink"}`}>
        {value}
      </p>
    </div>
  );
};

export default StatCard;