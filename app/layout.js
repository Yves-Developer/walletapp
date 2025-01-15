import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";
export const metadata = {
  title: "Wallet App",
  description: "Wallet APP, Budget Tracker - 2025",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body>{children}</body>
      </html>
    </ClerkProvider>
  );
}
