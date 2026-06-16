import Link from "next/link";
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
      <section className="bg-slate-950 py-16 text-white">
        <div className="mx-auto grid max-w-7xl items-center gap-8 px-4 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:px-8">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-amber-300">
              Warranty
            </p>
            <h2 className="font-display text-3xl">Instant warranty quote</h2>
            <p className="mt-4 text-sm text-slate-200">
              Use our Endurance Warranty Calculator to explore plan options and
              pricing for your vehicle in minutes.
            </p>
          </div>
          <div className="flex flex-wrap gap-4">
            <Link
              href="/warranty"
              className="rounded-full bg-amber-400 px-6 py-3 text-sm font-semibold text-slate-900"
            >
              Open Warranty Calculator
            </Link>
            <Link
              href="/contact"
              className="rounded-full border border-white/30 px-6 py-3 text-sm font-semibold text-white"
            >
              Talk to our team
            </Link>
          </div>
        </div>
      </section>
      <SellYourCar />
      <Testimonials />
      <FindUs />
    </div>
  );
}
