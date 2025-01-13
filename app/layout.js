import "./globals.css";

export const metadata = {
  title: "Wallet App",
  description: "Wallet APP, Budget Tracker - 2025",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
