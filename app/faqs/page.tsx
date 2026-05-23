'use client';

import { useState } from 'react';

const FAQS = [
  {
    question: 'Do you accept trade-ins?',
    answer: 'Yes. We welcome trade-ins and can provide a quick valuation.',
  },
  {
    question: 'Are prices drive-away?',
    answer: 'Many of our vehicles are advertised with drive-away pricing. Ask the team for details.',
  },
  {
    question: 'Can I book a test drive?',
    answer: 'Yes, contact us to arrange a test drive at a convenient time.',
  },
  {
    question: 'Are vehicles inspected?',
    answer: 'Every vehicle is inspected and prepared before listing.',
  },
  {
    question: 'Do you offer warranty options?',
    answer: 'Warranty options are available for selected vehicles. Speak with our team.',
  },
  {
    question: 'What documents do I need?',
    answer: 'Please bring a valid drivers license and proof of address for test drives or paperwork.',
  },
];

export default function FaqPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="bg-slate-50">
      <section className="bg-slate-950 text-white">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-amber-300">FAQs</p>
          <h1 className="font-display text-4xl">Frequently asked questions</h1>
        </div>
      </section>
      <section className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="space-y-4">
          {FAQS.map((faq, index) => (
            <div key={faq.question} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <button
                type="button"
                className="flex w-full items-center justify-between text-left text-sm font-semibold text-slate-900"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                {faq.question}
                <span className="text-xl text-slate-400">{openIndex === index ? '-' : '+'}</span>
              </button>
              {openIndex === index && (
                <p className="mt-3 text-sm text-slate-600">{faq.answer}</p>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
