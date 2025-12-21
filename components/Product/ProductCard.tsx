import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Poppins } from "next/font/google";

import { Product as ProductType } from "@/types/product";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

export default function ProductCard({ product }: { product: ProductType }) {
  return (
    <Link href={`/products/${product.slug}`} className="group overflow-hidden">
      <div
        className="relative w-full overflow-hidden bg-gray-100"
        style={{ aspectRatio: "0.78" }}
      >
        {/* Main image */}
        <Image
          src={product.imageCover}
          alt={product.title}
          fill
          className="object-cover transition-opacity duration-500 group-hover:opacity-0"
          sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
          priority={false}
        />

        {/* Hover image */}
        {product.images?.[0] && (
          <Image
            src={product.images[0]}
            alt={product.title}
            fill
            className="object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
          />
        )}
      </div>

      {/* Info */}
      <div className="mt-3 space-y-0.5">
        <h4
          className={cn(
            poppins.className,
            `text-sm font-medium hover:text-cyan-500 transition`
          )}
        >
          {product.title}
        </h4>

        <p className={cn(poppins.className, `text-sm text-gray-500`)}>
          ${product.price.toFixed(2)}
        </p>
      </div>
    </Link>
  );
}
