import Link from 'next/link';

export default function FindUs() {
  return (
    <section className="py-14">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:px-8">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="font-display text-3xl text-slate-900">Find us in Preston</h2>
          <p className="mt-4 text-sm text-slate-600">
            Visit our yard to inspect vehicles, chat with our team, and book a test drive.
          </p>
          <div className="mt-6 space-y-2 text-sm text-slate-600">
            <p>721-725 High St, Preston VIC 3072, Australia</p>
            <p>Phone: +61 431 000 280</p>
            <p>Open today 9:00 AM - 5:30 PM</p>
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="https://maps.google.com/?q=721-725+High+St,+Preston+VIC+3072,+Australia"
              target="_blank"
              rel="noreferrer"
              className="rounded-full bg-slate-900 px-5 py-2 text-sm font-semibold text-white"
            >
              Get Directions
            </Link>
            <Link
              href="/contact"
              className="rounded-full border border-slate-300 px-5 py-2 text-sm font-semibold text-slate-700"
            >
              Contact Us
            </Link>
          </div>
        </div>
        <div className="overflow-hidden rounded-3xl border border-slate-200 bg-slate-100 shadow-sm">
          <iframe
            title="Map"
            src="https://www.google.com/maps?q=721-725+High+St,+Preston+VIC+3072,+Australia&output=embed"
            className="h-full min-h-[320px] w-full"
            loading="lazy"
          />
        </div>
      </div>
    </section>
  );
}
