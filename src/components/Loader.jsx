const Loader = ({ fullScreen = false }) => {
  const wrapperClass = fullScreen
    ? "min-h-screen flex items-center justify-center bg-white"
    : "flex items-center justify-center py-10";

  return (
    <div className={wrapperClass}>
      <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin" />
    </div>
  );
};

export default Loader;