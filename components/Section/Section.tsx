import { cn } from "@/lib/utils";
import { ReactNode } from "react";
import { Libre_Baskerville, Poppins } from "next/font/google";

interface SectionProps {
  title: string;
  subTitle?: string;
  children: ReactNode;
  className?: string;
}

// Fonts
export const libreBaskerville = Libre_Baskerville({
  weight: ["400", "700"],
  subsets: ["latin"],
  style: "italic",
});

export const poppins = Poppins({
  weight: ["400", "700"],
  subsets: ["latin"],
});

export default function Section({
  title,
  subTitle,
  children,
  className,
}: SectionProps) {
  return (
    <section className={cn("md:my-14 my-7", className)}>
      <div className="text-center">
        <h3
          className={cn(
            poppins.className,
            "font-semibold text-3xl flex justify-center items-center gap-3"
          )}
        >
          <span className="h-0.5 w-16 mx-2.5 bg-black inline-block" />
          {title}
          <span className="h-0.5 w-16 mx-2.5 bg-black inline-block" />
        </h3>
        {subTitle && (
          <p
            className={cn(
              libreBaskerville.className,
              "text-gray-500  text-[14px]"
            )}
          >
            {subTitle}
          </p>
        )}
      </div>
      <div className="mt-6">{children}</div>
    </section>
  );
}
