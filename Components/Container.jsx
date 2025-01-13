const Container = ({ children }) => {
  return (
    <div className="grid grid-cols-1 custom:grid-cols-2 gap-2 py-6">
      {children}
    </div>
  );
};

export default Container;
