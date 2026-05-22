'use client';

import { useState } from 'react';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export default function SellYourCarPage() {
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    make: '',
    model: '',
    year: '',
    mileage: '',
    registration: '',
    condition: '',
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
      await addDoc(collection(db, 'tradeInLeads'), {
        ...formData,
        createdAt: serverTimestamp(),
        status: 'new',
      });
      setSubmitted(true);
      setFormData({
        name: '',
        phone: '',
        email: '',
        make: '',
        model: '',
        year: '',
        mileage: '',
        registration: '',
        condition: '',
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
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-amber-300">Sell or trade</p>
          <h1 className="font-display text-4xl">Sell or trade your car</h1>
          <p className="mt-4 max-w-2xl text-sm text-slate-200">
            Get a fast valuation from our team. Trade-ins welcome and we make the process simple.
          </p>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:px-8">
        <div>
          <h2 className="font-display text-3xl text-slate-900">Why sell with us</h2>
          <ul className="mt-6 space-y-3 text-sm text-slate-600">
            <li>Fast valuation response</li>
            <li>Trade-ins welcome</li>
            <li>Simple, transparent process</li>
            <li>Local dealership support</li>
          </ul>
          <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-slate-900">What happens next</h3>
            <ol className="mt-4 space-y-2 text-sm text-slate-600">
              <li>1. Submit your vehicle details.</li>
              <li>2. Our team reviews your car.</li>
              <li>3. Receive a valuation.</li>
              <li>4. Visit the dealership or complete the sale.</li>
            </ol>
          </div>
        </div>
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-slate-900">Request a valuation</h2>
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
            <div className="grid gap-4 sm:grid-cols-2">
              <input
                name="make"
                value={formData.make}
                onChange={handleChange}
                placeholder="Vehicle make"
                className="rounded-2xl border border-slate-200 px-4 py-3 text-sm"
                required
              />
              <input
                name="model"
                value={formData.model}
                onChange={handleChange}
                placeholder="Vehicle model"
                className="rounded-2xl border border-slate-200 px-4 py-3 text-sm"
                required
              />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <input
                name="year"
                value={formData.year}
                onChange={handleChange}
                placeholder="Year"
                className="rounded-2xl border border-slate-200 px-4 py-3 text-sm"
              />
              <input
                name="mileage"
                value={formData.mileage}
                onChange={handleChange}
                placeholder="Mileage"
                className="rounded-2xl border border-slate-200 px-4 py-3 text-sm"
              />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <input
                name="registration"
                value={formData.registration}
                onChange={handleChange}
                placeholder="Registration"
                className="rounded-2xl border border-slate-200 px-4 py-3 text-sm"
              />
              <input
                name="condition"
                value={formData.condition}
                onChange={handleChange}
                placeholder="Condition"
                className="rounded-2xl border border-slate-200 px-4 py-3 text-sm"
              />
            </div>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Additional details"
              rows={4}
              className="rounded-2xl border border-slate-200 px-4 py-3 text-sm"
            />
            <button
              type="submit"
              disabled={submitting}
              className="rounded-2xl bg-amber-400 px-6 py-3 text-sm font-semibold text-slate-900 transition hover:bg-amber-300 disabled:cursor-not-allowed"
            >
              {submitting ? 'Submitting...' : 'Request a Valuation'}
            </button>
            {submitted && (
              <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
                Thanks! Our team will be in touch shortly.
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
