const Spinner = () => {
  return (
    <div className="flex flex-col justify-center items-center">
      <div>
        <div className="border-t-transparent w-16 h-16 border-4 border-blue-400 border-solid rounded-full animate-spin"></div>
      </div>
      <span className="visually-hidden">Loading...</span>
    </div>
  );
};

export default Spinner;
