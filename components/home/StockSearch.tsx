'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

const BODY_TYPES = ['SUV', 'Sedan', 'Hatchback', 'Ute', 'Van', 'Wagon', 'Coupe'];
const PRICE_OPTIONS = [
  { label: 'Any price', value: '' },
  { label: 'Under $20k', value: '20000' },
  { label: 'Under $30k', value: '30000' },
  { label: 'Under $40k', value: '40000' },
  { label: 'Under $50k', value: '50000' },
];

export default function StockSearch() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    make: '',
    model: '',
    bodyType: '',
    maxPrice: '',
    keyword: '',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    Object.entries(formData).forEach(([key, value]) => {
      if (value.trim()) {
        params.set(key, value.trim());
      }
    });
    const query = params.toString();
    router.push(query ? `/vehicles?${query}` : '/vehicles');
  };

  return (
    <section className="relative -mt-10 pb-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <form
          onSubmit={handleSubmit}
          className="grid gap-4 rounded-3xl border border-slate-200 bg-white p-6 shadow-xl md:grid-cols-[1.2fr_1.2fr_1fr_1fr_auto]"
        >
          <input
            type="text"
            name="make"
            value={formData.make}
            onChange={handleChange}
            placeholder="Make"
            className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm"
          />
          <input
            type="text"
            name="model"
            value={formData.model}
            onChange={handleChange}
            placeholder="Model"
            className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm"
          />
          <select
            name="bodyType"
            value={formData.bodyType}
            onChange={handleChange}
            className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm"
          >
            <option value="">Body Type</option>
            {BODY_TYPES.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
          <select
            name="maxPrice"
            value={formData.maxPrice}
            onChange={handleChange}
            className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm"
          >
            {PRICE_OPTIONS.map((option) => (
              <option key={option.label} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <input
            type="text"
            name="keyword"
            value={formData.keyword}
            onChange={handleChange}
            placeholder="Keyword"
            className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm"
          />
          <button
            type="submit"
            className="rounded-2xl bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
          >
            Search Vehicles
          </button>
        </form>
      </div>
    </section>
  );
}
