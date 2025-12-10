"use client";

import Link from "next/link";
import { useState } from "react";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Heart, Menu, Search, ShoppingCart, User, X } from "lucide-react";
import { Poppins } from "next/font/google";
import Image from "next/image";

import NavLogo from "@/public/borcelle_shop.png"
import { useIsMobile } from "@/hooks/use-mobile";

export const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

const navLinks = [
  { title: "Home", href: "/" },
  { title: "Products", href: "/products" },
  { title: "Categories", href: "/categories" },
  { title: "Brands", href: "/brands" },
  { title: "Orders", href: "/allorders" },
];

export default function Navbar() {
  const isMobile = useIsMobile();
  const [open, setOpen] = useState(false);

  return (
    <header className="w-full border-b bg-white sticky top-0 z-50">
      <div className="container mx-auto flex items-center justify-between py-3">
        {/* LEFT — Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Image className="w-22 bg-transparent" src={NavLogo} alt="borcelle shop logo"/>
        </Link>

        {/* MOBILE MENU TOGGLE */}
        <button
          className="md:hidden p-2"
          onClick={() => setOpen(!open)}
          aria-label="Toggle Menu"
        >
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>

        {/* CENTER — Desktop Links */}
        <nav className="hidden md:flex">
          <NavigationMenu viewport={isMobile}>
            <NavigationMenuList className="flex gap-2">
              {navLinks.map(({ title, href }) => (
                <NavigationMenuItem key={href}>
                  <NavigationMenuLink
                    asChild
                    className={navigationMenuTriggerStyle()}
                  >
                    <Link href={href}>{title}</Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </nav>

        {/* RIGHT — Desktop Icons */}
        <div className="hidden md:flex items-center gap-4">
          <Link href="/">
            <User className="w-5 h-5" />
          </Link>
          <Link href="/wishlist">
            <Heart className="w-5 h-5" />
          </Link>
          <Link href="/cart">
            <ShoppingCart className="w-5 h-5" />
          </Link>
        </div>
      </div>

      {/* MOBILE DROPDOWN MENU */}
      {open && (
        <div className="md:hidden bg-white shadow-inner px-4 py-3 space-y-3">
          {navLinks.map(({ title, href }) => (
            <Link
              key={href}
              href={href}
              className="block text-lg font-medium"
              onClick={() => setOpen(false)}
            >
              {title}
            </Link>
          ))}

          <div className="flex items-center gap-4 mt-4 pt-4 border-t">
            <Link href="/search">
              <Search className="w-5 h-5" />
            </Link>
            <Link href="/cart">
              <ShoppingCart className="w-5 h-5" />
            </Link>
            <Link href="/profile">
              <User className="w-5 h-5" />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
