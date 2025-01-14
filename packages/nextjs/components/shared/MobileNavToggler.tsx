"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "./Logo";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import { Button } from "~~/components/ui/button";
import { Sheet, SheetClose, SheetContent, SheetTrigger } from "~~/components/ui/sheet";
import { cn } from "~~/lib/utils";
import { navLinks } from "~~/utils/NavLinks";

export const MobileNavToggler = () => {
  const pathname = usePathname();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" className=" border-color2 text-color2" size="icon">
          <HamburgerMenuIcon />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <main className="flex flex-col w-full gap-16">
          <div className="flex items-center justify-between w-full">
            <Logo />
          </div>
          <ul className="flex flex-col gap-6 pl-2">
            {navLinks.map(link => (
              <li key={link.name}>
                <SheetClose asChild>
                  <Link
                    href={link.href}
                    className={cn("text-base font-medium text-color2  transition", {
                      "text-color1 underline underline-offset-2": link.href == pathname,
                      "hover:text-color1": link.href != pathname,
                    })}
                  >
                    {link.name}
                  </Link>
                </SheetClose>
              </li>
            ))}
          </ul>
        </main>
      </SheetContent>
    </Sheet>
  );
};
