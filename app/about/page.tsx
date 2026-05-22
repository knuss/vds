import Link from 'next/link';

export default function AboutPage() {
  return (
    <div className="bg-slate-50">
      <section className="bg-slate-950 text-white">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-amber-300">About us</p>
          <h1 className="font-display text-4xl">Local used-car experts</h1>
          <p className="mt-4 max-w-2xl text-sm text-slate-200">
            The Car Garage AU has been helping Sydney drivers find reliable used cars with confidence.
          </p>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:px-8">
        <div>
          <h2 className="font-display text-3xl text-slate-900">Our story</h2>
          <p className="mt-4 text-sm text-slate-600">
            We are a family-operated dealership focused on transparency, reliability, and friendly service.
            Our team hand-picks vehicles and supports you through finance, trade-ins, and after-sales care.
          </p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {['Transparency', 'Reliability', 'Friendly service', 'Quality stock'].map((value) => (
              <div key={value} className="rounded-2xl border border-slate-200 bg-white p-4 text-sm font-semibold text-slate-700">
                {value}
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-slate-900">Meet the team</h2>
          <p className="mt-4 text-sm text-slate-600">
            Our sales and service team is ready to help you find the right vehicle.
          </p>
          <Link
            href="/contact"
            className="mt-6 inline-flex rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white"
          >
            Contact the team
          </Link>
        </div>
      </section>
    </div>
  );
}
