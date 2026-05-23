import Link from 'next/link';

export default function UtilityBar() {
  return (
    <div className="bg-slate-950 text-slate-100">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2 text-xs sm:px-6 lg:px-8">
        <div className="hidden items-center gap-4 md:flex">
          <span className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" aria-hidden="true" />
            Open today 9:00 AM - 5:30 PM
          </span>
          <span>721-725 High St, Preston VIC 3072, Australia</span>
          <Link href="tel:+61431000280" className="hover:text-white">
            +61 431 000 280
          </Link>
        </div>
        <div className="hidden items-center gap-4 md:flex">
          <Link href="/sell-your-car" className="hover:text-white">
            Sell Your Car
          </Link>
          <Link href="/contact" className="hover:text-white">
            Find Us
          </Link>
        </div>
        <div className="flex w-full items-center justify-between gap-3 md:hidden">
          <Link
            href="tel:+61431000280"
            className="flex-1 rounded-full bg-white/10 px-3 py-2 text-center font-semibold"
          >
            Call
          </Link>
          <Link
            href="https://maps.google.com/?q=721-725+High+St,+Preston+VIC+3072,+Australia"
            className="flex-1 rounded-full bg-white/10 px-3 py-2 text-center font-semibold"
            target="_blank"
            rel="noreferrer"
          >
            Directions
          </Link>
        </div>
      </div>
    </div>
  );
}
