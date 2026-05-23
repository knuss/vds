import Link from 'next/link';

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-slate-950 text-white">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(251,191,36,0.25),_transparent_60%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(120deg,_rgba(15,23,42,0.95)_0%,_rgba(15,23,42,0.8)_55%,_rgba(30,41,59,0.7)_100%)]" />
      </div>
      <div className="relative mx-auto grid max-w-7xl gap-10 px-4 py-20 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:px-8">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-amber-300">Sydney Used Cars</p>
          <h1 className="font-display text-5xl leading-tight sm:text-6xl">
            Quality Used Cars in Western Sydney
          </h1>
          <p className="mt-5 max-w-xl text-lg text-slate-200">
            Browse inspected used vehicles with drive-away pricing, trade-ins welcome, and friendly local service.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/vehicles"
              className="rounded-full bg-amber-400 px-6 py-3 text-sm font-semibold text-slate-900 transition hover:bg-amber-300"
            >
              Search Our Stock
            </Link>
            <Link
              href="/sell-your-car"
              className="rounded-full border border-white/40 px-6 py-3 text-sm font-semibold text-white transition hover:border-white"
            >
              Sell Your Car
            </Link>
          </div>
          <div className="mt-8 flex flex-wrap gap-3 text-xs text-slate-200">
            <span className="rounded-full border border-white/20 px-3 py-2">Drive-away pricing</span>
            <span className="rounded-full border border-white/20 px-3 py-2">Roadworthy included</span>
            <span className="rounded-full border border-white/20 px-3 py-2">Trade-ins welcome</span>
            <span className="rounded-full border border-white/20 px-3 py-2">Warranty options</span>
          </div>
        </div>

        <div className="relative">
          <div className="absolute -right-6 top-8 h-24 w-24 rounded-full bg-amber-400/30 blur-2xl" />
          <div className="relative rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur">
            <div className="rounded-2xl bg-[linear-gradient(135deg,_rgba(255,255,255,0.1),_rgba(255,255,255,0))] p-6">
              <p className="text-xs uppercase tracking-[0.3em] text-slate-300">Featured this week</p>
              <h2 className="mt-4 text-2xl font-semibold">2019 Mazda CX-5 Touring</h2>
              <p className="mt-2 text-sm text-slate-300">Low km, full service history, ready for immediate inspection.</p>
              <div className="mt-6 flex items-center justify-between">
                <div>
                  <p className="text-xs text-slate-400">Drive Away</p>
                  <p className="text-3xl font-semibold">$29,990</p>
                </div>
                <Link
                  href="/vehicles"
                  className="rounded-full border border-white/30 px-4 py-2 text-xs font-semibold"
                >
                  View Stock
                </Link>
              </div>
            </div>
            <div className="mt-6 grid grid-cols-3 gap-4 text-center text-xs text-slate-300">
              <div>
                <p className="text-base font-semibold text-white">110+</p>
                <p>Vehicles</p>
              </div>
              <div>
                <p className="text-base font-semibold text-white">4.8</p>
                <p>Google Rating</p>
              </div>
              <div>
                <p className="text-base font-semibold text-white">15</p>
                <p>Years</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
