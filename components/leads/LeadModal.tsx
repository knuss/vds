'use client';

import { useEffect, useState } from 'react';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export type LeadType = 'inquiry' | 'testDrive' | 'tradeIn';

interface LeadModalProps {
  type: LeadType;
  open: boolean;
  onClose: () => void;
  vehicleId?: string;
  vehicleTitle?: string;
}

const TYPE_CONFIG = {
  inquiry: {
    title: 'Enquire Now',
    collection: 'inquiries',
  },
  testDrive: {
    title: 'Book Test Drive',
    collection: 'testDrives',
  },
  tradeIn: {
    title: 'Value My Trade-In',
    collection: 'tradeInLeads',
  },
} as const;

export default function LeadModal({ type, open, onClose, vehicleId, vehicleTitle }: LeadModalProps) {
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState<Record<string, string>>({});

  useEffect(() => {
    if (open) {
      setSubmitted(false);
      setError('');
      setFormData({
        name: '',
        phone: '',
        email: '',
        message: '',
        preferredDate: '',
        preferredTime: '',
        make: '',
        model: '',
        year: '',
        mileage: '',
      });
    }
  }, [open, vehicleTitle]);

  if (!open) return null;

  const { title, collection: collectionName } = TYPE_CONFIG[type];

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
      const payload: Record<string, unknown> = {
        createdAt: serverTimestamp(),
        status: 'new',
      };

      if (vehicleId) payload.vehicleId = vehicleId;
      if (vehicleTitle) payload.vehicleTitle = vehicleTitle;

      switch (type) {
        case 'testDrive':
          Object.assign(payload, {
            name: formData.name,
            phone: formData.phone,
            email: formData.email,
            preferredDate: formData.preferredDate,
            preferredTime: formData.preferredTime,
            message: formData.message,
          });
          break;
        case 'tradeIn':
          Object.assign(payload, {
            name: formData.name,
            phone: formData.phone,
            email: formData.email,
            make: formData.make,
            model: formData.model,
            year: formData.year,
            mileage: formData.mileage,
            message: formData.message,
          });
          break;
        default:
          Object.assign(payload, {
            name: formData.name,
            phone: formData.phone,
            email: formData.email,
            message: formData.message,
          });
      }

      await addDoc(collection(db, collectionName), payload);
      setSubmitted(true);
    } catch (err: any) {
      setError(err.message || 'Unable to submit your request');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 px-4">
      <div className="w-full max-w-lg rounded-3xl bg-white p-6 shadow-xl">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-xl font-semibold text-slate-900">{title}</h2>
            {vehicleTitle && (
              <p className="text-sm text-slate-600">{vehicleTitle}</p>
            )}
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-sm font-semibold text-slate-500"
          >
            Close
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-6 grid gap-3 text-sm">
          <div className="grid gap-3 sm:grid-cols-2">
            <input
              name="name"
              value={formData.name || ''}
              onChange={handleChange}
              placeholder="Full name"
              className="rounded-2xl border border-slate-200 px-4 py-2"
              required
            />
            <input
              name="phone"
              value={formData.phone || ''}
              onChange={handleChange}
              placeholder="Phone"
              className="rounded-2xl border border-slate-200 px-4 py-2"
              required
            />
          </div>
          <input
            name="email"
            type="email"
            value={formData.email || ''}
            onChange={handleChange}
            placeholder="Email"
            className="rounded-2xl border border-slate-200 px-4 py-2"
            required
          />

          {type === 'testDrive' && (
            <div className="grid gap-3 sm:grid-cols-2">
              <input
                name="preferredDate"
                value={formData.preferredDate || ''}
                onChange={handleChange}
                placeholder="Preferred date"
                className="rounded-2xl border border-slate-200 px-4 py-2"
                required
              />
              <input
                name="preferredTime"
                value={formData.preferredTime || ''}
                onChange={handleChange}
                placeholder="Preferred time"
                className="rounded-2xl border border-slate-200 px-4 py-2"
                required
              />
            </div>
          )}


          {type === 'tradeIn' && (
            <>
              <div className="grid gap-3 sm:grid-cols-2">
                <input
                  name="make"
                  value={formData.make || ''}
                  onChange={handleChange}
                  placeholder="Vehicle make"
                  className="rounded-2xl border border-slate-200 px-4 py-2"
                />
                <input
                  name="model"
                  value={formData.model || ''}
                  onChange={handleChange}
                  placeholder="Vehicle model"
                  className="rounded-2xl border border-slate-200 px-4 py-2"
                />
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <input
                  name="year"
                  value={formData.year || ''}
                  onChange={handleChange}
                  placeholder="Year"
                  className="rounded-2xl border border-slate-200 px-4 py-2"
                />
                <input
                  name="mileage"
                  value={formData.mileage || ''}
                  onChange={handleChange}
                  placeholder="Mileage"
                  className="rounded-2xl border border-slate-200 px-4 py-2"
                />
              </div>
            </>
          )}

          <textarea
            name="message"
            value={formData.message || ''}
            onChange={handleChange}
            placeholder="Message"
            rows={4}
            className="rounded-2xl border border-slate-200 px-4 py-2"
          />

          <button
            type="submit"
            disabled={submitting}
            className="rounded-2xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white"
          >
            {submitting ? 'Submitting...' : 'Submit'}
          </button>

          {submitted && (
            <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-2 text-sm text-emerald-700">
              Thanks! We will be in touch shortly.
            </div>
          )}
          {error && (
            <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-2 text-sm text-red-700">
              {error}
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
