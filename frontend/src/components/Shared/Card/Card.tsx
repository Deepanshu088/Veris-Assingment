const Card = ({ className, children }: { className?: string, children: any }) => {
  return (
    <div className={`relative shadow-xl m-auto p-4 overflow-hidden rounded  ${className}`} >
      {children}
    </div>
  );
};

export default Card;
