import Link from 'next/link';

export default function FinanceCta() {
  return (
    <section className="py-14">
      <div className="mx-auto grid max-w-7xl gap-10 rounded-3xl border border-slate-200 bg-white px-6 py-12 shadow-sm sm:px-10 lg:grid-cols-[1.2fr_0.8fr]">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">Finance</p>
          <h2 className="font-display text-3xl text-slate-900">Need finance? We can help</h2>
          <p className="mt-4 text-sm text-slate-600">
            Explore flexible finance options designed to help you drive away sooner.
          </p>
          <div className="mt-6 flex flex-wrap gap-3 text-xs text-slate-500">
            <span className="rounded-full border border-slate-200 px-3 py-2">Fast approvals</span>
            <span className="rounded-full border border-slate-200 px-3 py-2">Flexible terms</span>
            <span className="rounded-full border border-slate-200 px-3 py-2">All credit types</span>
          </div>
        </div>
        <div className="flex flex-col justify-center gap-4">
          <Link
            href="/finance"
            className="rounded-full bg-slate-900 px-6 py-3 text-center text-sm font-semibold text-white transition hover:bg-slate-800"
          >
            Apply for Finance
          </Link>
          <Link
            href="/contact"
            className="rounded-full border border-slate-300 px-6 py-3 text-center text-sm font-semibold text-slate-700"
          >
            Speak with our team
          </Link>
        </div>
      </div>
    </section>
  );
}
