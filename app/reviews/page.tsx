import Link from 'next/link';

const REVIEWS = [
  {
    name: 'Daniel R.',
    quote: 'Great range of vehicles and honest advice. The team made it easy.',
  },
  {
    name: 'Emily K.',
    quote: 'Smooth purchase experience and clear communication. Highly recommend.',
  },
  {
    name: 'Jade M.',
    quote: 'Fast trade-in valuation and a clean, well-prepared vehicle.',
  },
];

export default function ReviewsPage() {
  return (
    <div className="bg-slate-50">
      <section className="bg-slate-950 text-white">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-amber-300">Reviews</p>
          <h1 className="font-display text-4xl">What customers say</h1>
          <p className="mt-4 max-w-2xl text-sm text-slate-200">
            Real feedback from drivers who have purchased from The Car Garage AU.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-6 md:grid-cols-3">
          {REVIEWS.map((review) => (
            <div key={review.name} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="mb-3 text-amber-400">★★★★★</div>
              <p className="text-sm text-slate-600">{review.quote}</p>
              <p className="mt-4 text-sm font-semibold text-slate-900">{review.name}</p>
            </div>
          ))}
        </div>
        <div className="mt-10 flex flex-wrap gap-4">
          <Link
            href="/vehicles"
            className="rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white"
          >
            Browse Stock
          </Link>
          <Link
            href="/contact"
            className="rounded-full border border-slate-300 px-6 py-3 text-sm font-semibold text-slate-700"
          >
            Contact Us
          </Link>
        </div>
      </section>
    </div>
  );
}
