const Loader = () => {
  return (
    <div className=" absolute right-0  left-0 top-0 bottom-0 z-50 flex space-x-2 justify-center items-center bg-white/50 h-screen dark:invert">
      <span className="sr-only">Loading...</span>
      <div className="h-8 w-8 bg-black rounded-full animate-bounce [animation-delay:-0.3s]"></div>
      <div className="h-8 w-8 bg-black rounded-full animate-bounce [animation-delay:-0.15s]"></div>
      <div className="h-8 w-8 bg-black rounded-full animate-bounce"></div>
    </div>
  );
};

export default Loader;
