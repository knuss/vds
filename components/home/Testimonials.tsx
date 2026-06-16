"use client";

import { useEffect, useState } from "react";

const TESTIMONIALS = [
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
      "I had a great experience buying a car from The Car George Sale AU. The process was smooth and easy from start to finish. George was honest, friendly, and very helpful, answering all my questions without any pressure. The car was exactly as described and in great condition. Pricing was fair and the paperwork was handled quickly. I'm very happy with my purchase and would definitely recommend.",
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

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setActiveIndex((current) => (current + 1) % TESTIMONIALS.length);
    }, 6000);

    return () => clearInterval(intervalId);
  }, []);

  const activeReview = TESTIMONIALS[activeIndex];

  return (
    <section className="bg-slate-950 py-14 text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-amber-300">
          Reviews
        </p>
        <h2 className="font-display text-3xl">Loved by local drivers</h2>
        <div className="mt-8">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <div className="mb-3 text-amber-300">★★★★★</div>
            <p className="text-sm text-slate-200">{activeReview.quote}</p>
            <p className="mt-4 text-sm font-semibold">{activeReview.name}</p>
          </div>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() =>
                setActiveIndex(
                  (current) =>
                    (current - 1 + TESTIMONIALS.length) % TESTIMONIALS.length
                )
              }
              className="rounded-full border border-white/20 px-4 py-2 text-xs font-semibold text-white/80 transition hover:text-white"
            >
              Prev
            </button>
            <button
              type="button"
              onClick={() =>
                setActiveIndex(
                  (current) => (current + 1) % TESTIMONIALS.length
                )
              }
              className="rounded-full border border-white/20 px-4 py-2 text-xs font-semibold text-white/80 transition hover:text-white"
            >
              Next
            </button>
            <div className="flex items-center gap-2">
              {TESTIMONIALS.map((review, index) => (
                <button
                  key={review.name}
                  type="button"
                  aria-label={`Show review ${index + 1}`}
                  onClick={() => setActiveIndex(index)}
                  className={`h-2.5 w-2.5 rounded-full transition ${
                    index === activeIndex
                      ? "bg-amber-300"
                      : "bg-white/20 hover:bg-white/40"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
