import Navigation from "@/Components/Navigation";
import { Toaster } from "@/Components/ui/toaster";

const DashboardLayout = ({ children }) => {
  return (
    <>
      <Navigation />
      {children}
      <Toaster />
    </>
  );
};

export default DashboardLayout;
