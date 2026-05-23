import Link from 'next/link';

const NAV_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/vehicles', label: 'Our Stock' },
  { href: '/sell-your-car', label: 'Sell Your Car' },
  { href: '/warranty', label: 'Warranty' },
  { href: '/about', label: 'About Us' },
  { href: '/contact', label: 'Contact Us' },
];

export default function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-4">
          <Link href="/" className="font-display text-3xl tracking-wide text-slate-900">
            The Car Garage AU
          </Link>
          <span className="hidden rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold text-slate-600 md:inline-flex">
            Used Cars - Sydney
          </span>
        </div>

        <nav className="hidden items-center gap-6 lg:flex">
          {NAV_LINKS.map((link) => (
            <Link key={link.href} href={link.href} className="text-sm font-semibold text-slate-700 hover:text-slate-900">
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <Link
            href="/vehicles"
            className="rounded-full border border-slate-900 px-4 py-2 text-sm font-semibold text-slate-900 transition hover:bg-slate-900 hover:text-white"
          >
            Search Stock
          </Link>
          <Link
            href="tel:+61431000280"
            className="rounded-full bg-amber-400 px-4 py-2 text-sm font-semibold text-slate-900 transition hover:bg-amber-300"
          >
            Call Sales
          </Link>
        </div>

        <details className="group relative lg:hidden">
          <summary className="list-none rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:border-slate-400">
            Menu
          </summary>
          <div className="absolute right-0 mt-3 w-56 rounded-2xl border border-slate-200 bg-white p-4 shadow-lg">
            <div className="flex flex-col gap-3">
              {NAV_LINKS.map((link) => (
                <Link key={link.href} href={link.href} className="text-sm font-semibold text-slate-700 hover:text-slate-900">
                  {link.label}
                </Link>
              ))}
              <Link
                href="/vehicles"
                className="rounded-full border border-slate-900 px-3 py-2 text-center text-sm font-semibold text-slate-900"
              >
                Search Stock
              </Link>
            </div>
          </div>
        </details>
      </div>
    </header>
  );
}
