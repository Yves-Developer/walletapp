"use client";

import { useState } from "react";
import Link from "next/link";
import NavLink from "./NavLink";
import Wrapper from "./Wrapper";
import { Button } from "./ui/button";
import Mobile from "./Mobile";
import { Menu, X } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed w-full z-10 bg-background/80 backdrop-blur-sm">
      <Wrapper>
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0">
              <span className="text-2xl font-bold text-foreground">
                WalletApp
              </span>
            </Link>
          </div>
          <NavLink />
          <div className="hidden md:block">
            <Avatar>
              <AvatarImage src="https://github.com/Yves-Developer.png" />
              <AvatarFallback>YD</AvatarFallback>
            </Avatar>
          </div>
          <div className="-mr-2 flex md:hidden">
            <Button
              variant="outline"
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              aria-expanded="false"
            >
              {isOpen ? <X /> : <Menu />}
            </Button>
          </div>
        </div>
      </Wrapper>

      {isOpen && <Mobile />}
    </nav>
  );
};

export default Navigation;
