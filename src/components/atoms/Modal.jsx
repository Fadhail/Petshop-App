const Modal = ({ 
  isOpen, 
  onClose, 
  title, 
  children, 
  size = "medium",
  className = "" 
}) => {
  if (!isOpen) return null;

  const sizeClasses = {
    small: "sm:max-w-md",
    medium: "sm:max-w-lg", 
    large: "sm:max-w-2xl",
    xl: "sm:max-w-4xl"
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="fixed z-10 inset-0 overflow-y-auto">
      <div 
        className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0"
        onClick={handleBackdropClick}
      >
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>
        
        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
          &#8203;
        </span>
        
        <div className={`inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle ${sizeClasses[size]} sm:w-full sm:p-6 ${className}`}>
          <div>
            {title && (
              <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
                {title}
              </h3>
            )}
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
