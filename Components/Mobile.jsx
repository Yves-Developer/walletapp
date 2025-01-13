import Link from "next/link";
import { Button } from "./ui/button";
const Mobile = () => {
  return (
    <div className="md:hidden">
      <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
        <Link
          href="/"
          className="text-gray-600 hover:text-gray-900 block px-3 py-2 rounded-md text-base font-medium"
        >
          Home
        </Link>
        <Link
          href="/features"
          className="text-gray-600 hover:text-gray-900 block px-3 py-2 rounded-md text-base font-medium"
        >
          Features
        </Link>
        <Link
          href="/pricing"
          className="text-gray-600 hover:text-gray-900 block px-3 py-2 rounded-md text-base font-medium"
        >
          Pricing
        </Link>
        <Link
          href="/about"
          className="text-gray-600 hover:text-gray-900 block px-3 py-2 rounded-md text-base font-medium"
        >
          About
        </Link>
      </div>
    </div>
  );
};

export default Mobile;
