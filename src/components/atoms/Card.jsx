const Card = ({ children, className = "", onClick }) => {
  return (
    <div 
      className={`bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default Card;
