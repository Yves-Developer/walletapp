import Navigation from "@/Components/Navigation";

const DashboardLayout = ({ children }) => {
  return (
    <>
      <Navigation />
      {children}
    </>
  );
};

export default DashboardLayout;
