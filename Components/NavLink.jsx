import Link from "next/link";

const NavLink = () => {
  return (
    <div className="hidden md:block">
      <div className="ml-10 flex items-baseline space-x-4">
        <Link
          href="/"
          className="text-muted-foreground hover:text-foreground px-3 py-2 rounded-md text-sm font-medium"
        >
          Dashboard
        </Link>
        <Link
          href="/Transaction"
          className="text-muted-foreground hover:text-foreground px-3 py-2 rounded-md text-sm font-medium"
        >
          Transaction
        </Link>
        <Link
          href="/Report"
          className="text-muted-foreground hover:text-foreground px-3 py-2 rounded-md text-sm font-medium"
        >
          Report
        </Link>
        <Link
          href="/Budget"
          className="text-muted-foreground hover:text-foreground px-3 py-2 rounded-md text-sm font-medium"
        >
          Budget
        </Link>
      </div>
    </div>
  );
};

export default NavLink;
