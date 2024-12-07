import { FeaturedProducts } from "@/components/home/FeaturedProducts";
import { HeroSection } from "@/components/home/Hero";
import { Offer } from "@/components/home/Offer";

export default function Home() {
  return (
    <div>
      <HeroSection />
      <FeaturedProducts />
      <Offer />
    </div>
  );
}
