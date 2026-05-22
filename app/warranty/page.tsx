import Link from 'next/link';

export default function WarrantyPage() {
  return (
    <div className="bg-slate-50">
      <section className="bg-slate-950 text-white">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-amber-300">Warranty</p>
          <h1 className="font-display text-4xl">Warranty options for peace of mind</h1>
          <p className="mt-4 max-w-2xl text-sm text-slate-200">
            Ask about extended warranty options available for selected vehicles.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-6 md:grid-cols-3">
          {[
            'Coverage for major components',
            'Flexible warranty terms',
            'Support from trusted providers',
          ].map((item) => (
            <div key={item} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-lg font-semibold text-slate-900">{item}</h2>
              <p className="mt-2 text-sm text-slate-600">
                Warranty availability depends on vehicle age, mileage, and provider terms.
              </p>
            </div>
          ))}
        </div>
        <div className="mt-10 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
          <h2 className="font-display text-3xl text-slate-900">Ask our team about warranty</h2>
          <p className="mt-4 text-sm text-slate-600">
            We will walk you through warranty inclusions and help you choose the right option.
          </p>
          <Link
            href="/contact"
            className="mt-6 inline-flex rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white"
          >
            Contact Us
          </Link>
        </div>
      </section>
    </div>
  );
}
