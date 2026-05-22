'use client';

import { useState } from 'react';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export default function SellYourCar() {
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
      await addDoc(collection(db, 'sellYourCarLeads'), {
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
        message: '',
      });
    } catch (err: any) {
      setError(err.message || 'Unable to submit your request');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="py-14">
      <div className="mx-auto grid max-w-7xl gap-10 rounded-3xl border border-slate-200 bg-white px-6 py-12 shadow-sm sm:px-10 lg:grid-cols-[1fr_1.1fr]">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">Sell or trade</p>
          <h2 className="font-display text-3xl text-slate-900">Sell or trade your car</h2>
          <p className="mt-4 text-sm text-slate-600">
            Get a fast valuation from our team. Trade-ins welcome and we make the process simple.
          </p>
          <ul className="mt-6 space-y-2 text-sm text-slate-600">
            <li>Quick appraisal response</li>
            <li>Fair market pricing</li>
            <li>Local dealership support</li>
          </ul>
          {submitted && (
            <div className="mt-6 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
              Thanks! Our team will be in touch shortly.
            </div>
          )}
          {error && (
            <div className="mt-6 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
            </div>
          )}
        </div>
        <form onSubmit={handleSubmit} className="grid gap-4">
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
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Tell us about your vehicle"
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
        </form>
      </div>
    </section>
  );
}
