import Hero from "@/components/home/Hero";
import StockSearch from "@/components/home/StockSearch";
import BodyTypeShortcuts from "@/components/home/BodyTypeShortcuts";
import FeaturedVehicles from "@/components/home/FeaturedVehicles";
import WhyBuyFromUs from "@/components/home/WhyBuyFromUs";
import SellYourCar from "@/components/home/SellYourCar";
import Testimonials from "@/components/home/Testimonials";
import FindUs from "@/components/home/FindUs";

export default function HomePage() {
  return (
    <div className="bg-slate-50">
      <Hero />
      <StockSearch />
      <BodyTypeShortcuts />
      <FeaturedVehicles />
      <WhyBuyFromUs />
      <SellYourCar />
      <Testimonials />
      <FindUs />
    </div>
  );
}
