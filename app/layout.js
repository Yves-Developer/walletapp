import "./globals.css";
import Navigation from "@/Components/Navigation";
export const metadata = {
  title: "Wallet App",
  description: "Wallet APP, Budget Tracker - 2025",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navigation />
        {children}
      </body>
    </html>
  );
}
