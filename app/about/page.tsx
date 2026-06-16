export default function AboutPage() {
  return (
    <div className="bg-slate-50">
      <section className="bg-slate-950 text-white">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-amber-300">
            About us
          </p>
          <h1 className="font-display text-4xl">Local used-car experts</h1>
          <p className="mt-4 max-w-2xl text-sm text-slate-200">
            The Car Garage AU has been helping Sydney drivers find reliable used
            cars with confidence.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <h2 className="font-display text-3xl text-slate-900">Our story</h2>
        <p className="mt-4 text-sm text-slate-600">
          We are a family-operated dealership focused on transparency,
          reliability, and friendly service. Our team hand-picks vehicles and
          supports you through trade-ins and after-sales care.
        </p>
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {[
            "Transparency",
            "Reliability",
            "Friendly service",
            "Quality stock",
          ].map((value) => (
            <div
              key={value}
              className="rounded-2xl border border-slate-200 bg-white p-4 text-sm font-semibold text-slate-700"
            >
              {value}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
