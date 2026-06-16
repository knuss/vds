import Link from "next/link";

export default function SiteFooter() {
  return (
    <footer className="bg-slate-950 text-slate-200">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-4 lg:px-8">
        <div>
          <p className="font-display text-2xl text-white">The Car Garage AU</p>
          <p className="mt-3 text-sm text-slate-400">
            Trusted used cars with drive-away pricing, friendly service, and
            trade-ins welcome.
          </p>
          <div className="mt-6 space-y-2 text-sm">
            <p>721-725 High St, Preston VIC 3072, Australia</p>
            <p>
              <Link href="tel:+61431000280" className="hover:text-white">
                +61 431 000 280
              </Link>
            </p>
            <p>
              <Link
                href="mailto:info@thecargarageau.com"
                className="hover:text-white"
              >
                info@thecargarageau.com
              </Link>
            </p>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-widest text-slate-400">
            Inventory
          </h3>
          <ul className="mt-4 space-y-2 text-sm">
            <li>
              <Link href="/vehicles" className="hover:text-white">
                All Stock
              </Link>
            </li>
            <li>
              <Link href="/vehicles?bodyType=SUV" className="hover:text-white">
                SUVs
              </Link>
            </li>
            <li>
              <Link
                href="/vehicles?bodyType=Sedan"
                className="hover:text-white"
              >
                Sedans
              </Link>
            </li>
            <li>
              <Link
                href="/vehicles?bodyType=Hatchback"
                className="hover:text-white"
              >
                Hatchbacks
              </Link>
            </li>
            <li>
              <Link href="/vehicles?bodyType=Ute" className="hover:text-white">
                Utes
              </Link>
            </li>
            <li>
              <Link href="/vehicles?bodyType=Van" className="hover:text-white">
                Vans
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-widest text-slate-400">
            Customer Tools
          </h3>
          <ul className="mt-4 space-y-2 text-sm">
            <li>
              <Link href="/sell-your-car" className="hover:text-white">
                Sell Your Car
              </Link>
            </li>
            <li>
              <Link href="/warranty" className="hover:text-white">
                Warranty
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-white">
                Book Test Drive
              </Link>
            </li>
            <li>
              <Link href="/reviews" className="hover:text-white">
                Reviews
              </Link>
            </li>
            <li>
              <Link href="/faqs" className="hover:text-white">
                FAQs
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-widest text-slate-400">
            Opening Hours
          </h3>
          <ul className="mt-4 space-y-2 text-sm text-slate-300">
            <li>Monday - Friday: 10:00 AM - 4:00 PM</li>
            <li>Saturday: 10:00 AM - 3:00 PM</li>
            <li>Sunday: Closed</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-slate-800">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-4 py-6 text-xs text-slate-500 sm:flex-row sm:px-6 lg:px-8">
          <div className="flex items-center gap-4">
            <Link href="/privacy" className="hover:text-white">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-white">
              Terms of Use
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <span>Copyright 2026 The Car Garage AU</span>
            <Link
              href="/admin/login"
              className="text-slate-600 hover:text-slate-300"
            >
              Admin
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
