import Link from "next/link";
import BodyTypeIcon from "../icons/BodyTypeIcons";

const BODY_TYPES = [
  "SUV",
  "Sedan",
  "Hatchback",
  "Ute",
  "Van",
  "Wagon",
  "Coupe",
];

export default function BodyTypeShortcuts() {
  return (
    <section className="py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <h2 className="font-display text-3xl text-slate-900">
            Browse by body type
          </h2>
          <Link
            href="/vehicles"
            className="text-sm font-semibold text-slate-600 hover:text-slate-900"
          >
            View all stock
          </Link>
        </div>
        <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-7">
          {BODY_TYPES.map((type) => (
            <Link
              key={type}
              href={`/vehicles?bodyType=${encodeURIComponent(type)}`}
              className="group rounded-2xl border border-slate-200 bg-white px-4 py-6 text-center text-sm font-semibold text-slate-700 shadow-sm transition hover:-translate-y-1 hover:border-slate-300 hover:shadow-md"
            >
              <div className="mx-auto mb-3 h-8 w-8 text-amber-400">
                <BodyTypeIcon type={type} className="h-8 w-8" />
              </div>
              <span className="text-slate-900">{type}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
