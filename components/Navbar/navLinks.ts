import { User, Heart, ShoppingCart } from "lucide-react";

interface navLinksProps {
  title: string;
  href: string;
  protected?: boolean;
}

export const navLinks: navLinksProps[] = [
  { title: "Home", href: "/" },
  { title: "Products", href: "/products" },
  { title: "Categories", href: "/categories" },
  { title: "Brands", href: "/brands" },
  { title: "Orders", href: "/allorders", protected: true },
];

export const navIcons = [
  { href: "/", icon: User, label: "Profile" },
  { href: "/wishlist", icon: Heart, label: "Wishlist", count: 0 },
  { href: "/cart", icon: ShoppingCart, label: "Cart", count: 5 },
];
