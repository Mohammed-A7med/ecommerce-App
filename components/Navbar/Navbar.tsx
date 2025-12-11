"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
import { Poppins } from "next/font/google";
import { usePathname } from "next/navigation";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

import NavIcon from "./NavIcon";
import { navLinks, navIcons } from "./navLinks";
import NavLogo from "@/public/borcelle_shop.png";
import { useIsMobile } from "@/hooks/use-mobile";

export const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

export default function Navbar() {
  const isMobile = useIsMobile();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="w-full bg-white sticky top-0 z-50">
      <div className="container mx-auto flex items-center justify-between py-3">
        {/* LOGO */}
        <Link href="/" className="flex items-center gap-2">
          <Image
            src={NavLogo}
            alt="Borcelle Shop Logo"
            className="w-14 md:w-17"
          />
        </Link>

        {/* MOBILE MENU TOGGLE */}
        <button
          className="md:hidden p-2"
          onClick={() => setOpen(!open)}
          aria-label="Toggle Menu"
        >
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>

        {/* DESKTOP NAV LINKS */}
        <nav className="hidden md:flex">
          <NavigationMenu viewport={isMobile}>
            <NavigationMenuList className="flex gap-2">
              {navLinks.map(({ title, href }) => {
                const isActive = pathname === href;

                return (
                  <NavigationMenuItem key={href}>
                    <NavigationMenuLink
                      asChild
                      className={cn(
                        navigationMenuTriggerStyle(),
                        isActive && "text-cyan-500 scale-[1.02]"
                      )}
                    >
                      <Link className={poppins.className} href={href}>
                        {title}
                      </Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                );
              })}
            </NavigationMenuList>
          </NavigationMenu>
        </nav>

        {/* DESKTOP ICONS */}
        <div className="hidden md:flex items-center gap-4">
          {navIcons.map(({ href, icon, label, count }) => (
            <NavIcon
              key={href}
              href={href}
              Icon={icon}
              label={label}
              count={count}
            />
          ))}
        </div>
      </div>

      {/* MOBILE DROPDOWN MENU */}
      {open && (
        <div className="md:hidden bg-white shadow-inner px-4 py-3 space-y-3">
          {navLinks.map(({ title, href }) => {
            const isActive = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                onClick={() => setOpen(false)}
                className={cn(
                  "block text-lg font-medium transition-all duration-200",
                  "hover:text-cyan-400 hover:bg-transparent hover:opacity-100",
                  "focus:text-cyan-400 focus:bg-transparent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 rounded-md",
                  "active:scale-[0.98] active:text-cyan-500",
                  isActive && "text-cyan-500 scale-[1.02]"
                )}
              >
                {title}
              </Link>
            );
          })}

          {/* MOBILE ICONS */}
          <div className="flex items-center gap-4 mt-4 pt-4 border-t">
            {navIcons.map(({ href, icon, label, count }) => (
              <NavIcon
                key={href}
                href={href}
                Icon={icon}
                label={label}
                count={count}
              />
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
