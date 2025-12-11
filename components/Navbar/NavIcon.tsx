import Link from "next/link";
import { cn } from "@/lib/utils";

interface NavIconProps {
  href: string;
  Icon: React.ElementType;
  label: string;
  count?: number | null;
}

export default function NavIcon({ href, Icon, label, count }: NavIconProps) {
  return (
    <Link
      href={href}
      aria-label={label}
      className="relative inline-flex items-center"
    >
      <Icon
        className={cn(
          `w-5 h-5 text-gray-800 hover:text-cyan-400 `,
          `transition-transform duration-350 `,
          `ease-[cubic-bezier(.25,.1,.25,1)] hover:scale-125`
        )}
      />
      {count !== undefined && (
        <span
          className={cn(
            `absolute -top-2 -right-2 flex h-4 w-4 items-center justify-center `,
            `rounded-full bg-gray-800 text-[10px] text-white font-bold`
          )}
        >
          {count}
        </span>
      )}
    </Link>
  );
}
