import Link from "next/link";

const REVIEWS = [
  {
    name: "Shinez interior",
    quote:
      "Bought my first BMW from these guys and couldn't be happier. The service was excellent from start to finish, very honest and professional. The car was in superb condition and drives perfectly. Highly recommend them if you're looking for a quality car and great customer service.",
  },
  {
    name: "Wajeeh Rehman",
    quote:
      "Honestly one of the best dealerships I've been to. I believe the guy who helped me was Abdul. An extremely professional guy who has a true passion for cars and helping people. I recommend anyone to come here if they are looking for quality customer service and cars that are looked after! Thankyou to the team at Car Garage, we are loving our new car.",
  },
  {
    name: "Ruhani Kaur",
    quote:
      "I had a great experience buying a car from The Car George Sale AU. The process was smooth and easy from start to finish. George was honest, friendly, and very helpful, answering all my questions without any pressure. The car was exactly as described and in great condition. Pricing was fair and the paperwork was handled quickly. I'm very happy with my purchase and would definitely recommend. Thank a lot.",
  },
  {
    name: "Noah Chalhoub",
    quote:
      "Was recommended to this place by a gentleman up in Albury. Came down and had a great experience with Abdul, has an option for everybody no matter your budget. Wasn't pressured at all into buying - he's an absolute gun with top customer service and great quality vehicles.",
  },
  {
    name: "Abhishek Perera",
    quote:
      "I bought a used car here and had a smooth, straightforward experience. The staff were clear, helpful, and easy to work with. The car matched its description and has been great so far. I appreciated the transparency and efficient paperwork. I'd return and recommend them based on this experience.",
  },
];

export default function ReviewsPage() {
  return (
    <div className="bg-slate-50">
      <section className="bg-slate-950 text-white">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-amber-300">
            Reviews
          </p>
          <h1 className="font-display text-4xl">What customers say</h1>
          <p className="mt-4 max-w-2xl text-sm text-slate-200">
            Real feedback from drivers who have purchased from The Car Garage
            AU.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-6 md:grid-cols-3">
          {REVIEWS.map((review) => (
            <div
              key={review.name}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
            >
              <div className="mb-3 text-amber-400">★★★★★</div>
              <p className="text-sm text-slate-600">{review.quote}</p>
              <p className="mt-4 text-sm font-semibold text-slate-900">
                {review.name}
              </p>
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
