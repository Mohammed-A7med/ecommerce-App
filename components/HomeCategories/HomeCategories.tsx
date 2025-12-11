import Image, { StaticImageData } from "next/image";
import { cn } from "@/lib/utils";
import { Poppins } from "next/font/google";
import { Button } from "@/components/ui/button";

import WomenImage from "@/assets/Women.webp";
import AccessoriesImage from "@/assets/accessories.webp";
import FootwearImage from "@/assets/footwear.webp";
import WatchImage from "@/assets/watch.webp";


export const poppins = Poppins({
  weight: ["400", "700"],
  subsets: ["latin"],
});
// CategoryCard Props Type
interface CategoryCardProps {
  src: StaticImageData;
  alt: string;
  label: string;
  classes?: string;
}

const CategoryCard = ({ src, alt, label, classes }: CategoryCardProps) => (
  <div className={cn(`relative group overflow-hidden`, classes)}>
    <Image
      src={src}
      alt={alt}
      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
    />
    <Button
      className={cn(
        poppins.className,
        `absolute bottom-4 left-1/2 -translate-x-1/2 px-10 py-5 shadow-md bg-white text-black hover:text-white hover:bg-black transition rounded-none font-semibold`
      )}
    >
      {label}
    </Button>
  </div>
);

export default function HomeCategories() {
  return (
    <div className="md:mt-12 md:mb-25 my-6 w-full">
      <div className="w-[90%] md:w-[65%] mx-auto grid grid-cols-12 gap-6 md:gap-8">
        {/* Left Big Image */}
        <CategoryCard
          src={WomenImage}
          alt="Women Image"
          label="Women"
          classes="col-span-12 md:col-span-6"
        />

        {/* Middle Two Images (stacked) */}
        <div className="col-span-6 md:col-span-3 flex flex-col gap-6 md:gap-8">
          <CategoryCard
            src={AccessoriesImage}
            alt="Accessories Image"
            label="Accessories"
          />
          <CategoryCard
            src={FootwearImage}
            alt="Footwear Image"
            label="Footwear"
          />
        </div>

        {/* Right Single Image */}
        <CategoryCard
          src={WatchImage}
          alt="Watch Image"
          label="Watch"
          classes="col-span-6 md:col-span-3"
        />
      </div>
    </div>
  );
}
