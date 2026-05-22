'use client';

import { useState } from 'react';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export default function FinancePage() {
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    employmentStatus: '',
    budget: '',
    vehicleOfInterest: '',
    message: '',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');

    try {
      await addDoc(collection(db, 'financeLeads'), {
        ...formData,
        createdAt: serverTimestamp(),
        status: 'new',
      });
      setSubmitted(true);
      setFormData({
        name: '',
        phone: '',
        email: '',
        employmentStatus: '',
        budget: '',
        vehicleOfInterest: '',
        message: '',
      });
    } catch (err: any) {
      setError(err.message || 'Unable to submit your request');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-slate-50">
      <section className="bg-slate-950 text-white">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-amber-300">Finance</p>
          <h1 className="font-display text-4xl">Vehicle finance made simple</h1>
          <p className="mt-4 max-w-2xl text-sm text-slate-200">
            Flexible options designed to help you drive away sooner. Our team will guide you through the process.
          </p>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:px-8">
        <div>
          <h2 className="font-display text-3xl text-slate-900">Finance benefits</h2>
          <ul className="mt-6 space-y-3 text-sm text-slate-600">
            <li>Flexible terms and repayment options</li>
            <li>Fast response times</li>
            <li>Support for different budgets</li>
            <li>Drive away sooner with the right plan</li>
          </ul>
          <p className="mt-6 text-xs text-slate-500">
            Finance is subject to approval. Terms, conditions, fees, and lending criteria may apply.
          </p>
        </div>
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-slate-900">Finance enquiry</h2>
          <form onSubmit={handleSubmit} className="mt-6 grid gap-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <input
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Full name"
                className="rounded-2xl border border-slate-200 px-4 py-3 text-sm"
                required
              />
              <input
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Phone"
                className="rounded-2xl border border-slate-200 px-4 py-3 text-sm"
                required
              />
            </div>
            <input
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              type="email"
              className="rounded-2xl border border-slate-200 px-4 py-3 text-sm"
              required
            />
            <input
              name="employmentStatus"
              value={formData.employmentStatus}
              onChange={handleChange}
              placeholder="Employment status"
              className="rounded-2xl border border-slate-200 px-4 py-3 text-sm"
            />
            <input
              name="budget"
              value={formData.budget}
              onChange={handleChange}
              placeholder="Approximate budget"
              className="rounded-2xl border border-slate-200 px-4 py-3 text-sm"
            />
            <input
              name="vehicleOfInterest"
              value={formData.vehicleOfInterest}
              onChange={handleChange}
              placeholder="Vehicle of interest"
              className="rounded-2xl border border-slate-200 px-4 py-3 text-sm"
            />
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Message"
              rows={4}
              className="rounded-2xl border border-slate-200 px-4 py-3 text-sm"
            />
            <button
              type="submit"
              disabled={submitting}
              className="rounded-2xl bg-amber-400 px-6 py-3 text-sm font-semibold text-slate-900 transition hover:bg-amber-300 disabled:cursor-not-allowed"
            >
              {submitting ? 'Submitting...' : 'Submit Enquiry'}
            </button>
            {submitted && (
              <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
                Thanks! Our finance team will be in touch shortly.
              </div>
            )}
            {error && (
              <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                {error}
              </div>
            )}
          </form>
        </div>
      </section>
    </div>
  );
}
