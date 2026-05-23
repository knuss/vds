const TESTIMONIALS = [
  {
    name: "Sarah T.",
    quote:
      "Transparent pricing and friendly staff. The car was spotless and ready to go.",
  },
  {
    name: "Mark L.",
    quote:
      "Great selection of SUVs and clear, helpful advice. Highly recommended.",
  },
  {
    name: "Priya D.",
    quote:
      "Fast trade-in valuation and excellent communication from start to finish.",
  },
];

export default function Testimonials() {
  return (
    <section className="bg-slate-950 py-14 text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-amber-300">
          Reviews
        </p>
        <h2 className="font-display text-3xl">Loved by local drivers</h2>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {TESTIMONIALS.map((review) => (
            <div
              key={review.name}
              className="rounded-2xl border border-white/10 bg-white/5 p-6"
            >
              <div className="mb-3 text-amber-300">★★★★★</div>
              <p className="text-sm text-slate-200">{review.quote}</p>
              <p className="mt-4 text-sm font-semibold">{review.name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
