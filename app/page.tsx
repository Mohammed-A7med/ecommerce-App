import { Poppins } from "next/font/google";

import HomeCategories from "@/components/HomeCategories/HomeCategories";
import Section from "@/components/Section/Section";
import MainSlider from "@/components/Sliders/MainSlider";
import { Product, ProductData } from "@/types/product";
import ProductCard from "@/components/Product/ProductCard";

export const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

async function getProducts(): Promise<Product[]> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/products`
  );

  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

  const data: ProductData = await res.json();
  return data.data;
}

export default async function Home() {
  const products = await getProducts();

  return (
    <>
      <MainSlider />
      <HomeCategories />
      <Section title="TRENDING" subTitle="Top view in this week">
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </Section>
    </>
  );
}
