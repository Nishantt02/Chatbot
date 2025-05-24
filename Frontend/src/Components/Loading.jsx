// LoadingSpinner: For inline button spinner
export const LoadingSpinner = () => {
  return (
    <div
      className="inline-block w-5 h-5 border-2 border-t-2 border-r-transparent border-white rounded-full animate-spin"
      role="status"
    ></div>
  );
};

// LoadingBig: For full-page loading indication
export const LoadingBig = () => {
  return (
    <div className="flex space-x-2 justify-center items-center w-[200px] mx-auto mt-[300px]" role="status">
      <div className="h-8 w-8 bg-white rounded-full animate-bounce [animation-delay:-0.3s]"></div>
      <div className="h-8 w-8 bg-white rounded-full animate-bounce [animation-delay:-0.15s]"></div>
      <div className="h-8 w-8 bg-white rounded-full animate-bounce"></div>
    </div>
  );
};

// LoadingSmall: For smaller loading indicators
export const LoadingSmall = () => {
  return (
    <div className="flex space-x-2 justify-center items-center" role="status">
      <div className="h-4 w-4 bg-white rounded-full animate-bounce [animation-delay:-0.3s]"></div>
      <div className="h-4 w-4 bg-white rounded-full animate-bounce [animation-delay:-0.15s]"></div>
      <div className="h-4 w-4 bg-white rounded-full animate-bounce"></div>
    </div>
  );
};
