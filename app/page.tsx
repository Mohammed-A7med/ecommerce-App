import { Poppins } from "next/font/google";

import HomeCategories from "@/components/HomeCategories/HomeCategories";
import Section from "@/components/Section/Section";
import MainSlider from "@/components/Sliders/MainSlider";

export const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

export default function Home() {
  return (
    <>
      <MainSlider />
      <HomeCategories />
      <Section title="TRENDING" subTitle="Top view in this week">
        <p>Lorem ipsum dolor sit amet consectetur adipisicing.</p>
      </Section>
    </>
  );
}
