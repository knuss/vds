const ITEMS = [
  {
    title: "Carefully selected vehicles",
    description: "Every vehicle is inspected and road-tested before listing.",
  },
  {
    title: "Mechanically inspected",
    description: "We work with trusted technicians for quality assurance.",
  },
  {
    title: "Drive-away pricing",
    description: "Clear pricing with no hidden surprises.",
  },
  {
    title: "Trade-ins welcome",
    description: "Upgrade your car with a simple trade-in process.",
  },
  {
    title: "Friendly guidance",
    description: "Clear, no-pressure advice from a local team.",
  },
  {
    title: "Warranty options",
    description: "Extra peace of mind with extended coverage.",
  },
];

export default function WhyBuyFromUs() {
  return (
    <section className="py-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="font-display text-3xl text-slate-900">
          Why buy from us?
        </h2>
        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {ITEMS.map((item) => (
            <div
              key={item.title}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
            >
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-500">
                Trusted
              </p>
              <h3 className="mt-3 text-lg font-semibold text-slate-900">
                {item.title}
              </h3>
              <p className="mt-2 text-sm text-slate-600">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
