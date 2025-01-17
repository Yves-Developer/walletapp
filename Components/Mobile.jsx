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
          Dashboard
        </Link>
        <Link
          href="/Transaction"
          className="text-gray-600 hover:text-gray-900 block px-3 py-2 rounded-md text-base font-medium"
        >
          Transaction
        </Link>
        <Link
          href="/Report"
          className="text-gray-600 hover:text-gray-900 block px-3 py-2 rounded-md text-base font-medium"
        >
          Report
        </Link>
        <Link
          href="/Budget"
          className="text-gray-600 hover:text-gray-900 block px-3 py-2 rounded-md text-base font-medium"
        >
          Budget
        </Link>
      </div>
    </div>
  );
};

export default Mobile;
