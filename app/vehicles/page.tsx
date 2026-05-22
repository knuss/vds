'use client';

import { useEffect, useMemo, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { db } from '@/lib/firebase';
import { collection, getDocs } from 'firebase/firestore';
import { Vehicle } from '@/lib/types';
import Link from 'next/link';
import VehicleCard from '@/components/vehicles/VehicleCard';

const SORT_OPTIONS = [
  { value: 'newest', label: 'Newest' },
  { value: 'price-asc', label: 'Price low to high' },
  { value: 'price-desc', label: 'Price high to low' },
  { value: 'year-desc', label: 'Year newest' },
  { value: 'mileage-asc', label: 'Mileage lowest' },
];

const BODY_TYPES = ['SUV', 'Sedan', 'Hatchback', 'Ute', 'Van', 'Wagon', 'Coupe'];

const FILTER_DEFAULTS = {
  make: '',
  model: '',
  bodyType: '',
  minPrice: '',
  maxPrice: '',
  minYear: '',
  maxYear: '',
  minMileage: '',
  maxMileage: '',
  transmission: '',
  fuelType: '',
  seats: '',
  keyword: '',
  sortBy: 'newest',
};

export default function VehiclesPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState(FILTER_DEFAULTS);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'vehicles'));
        const vehiclesData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
          createdAt: doc.data().createdAt?.toDate?.() || new Date(),
          updatedAt: doc.data().updatedAt?.toDate?.() || new Date(),
        })) as Vehicle[];
        setVehicles(vehiclesData);
      } catch (error) {
        console.error('Error fetching vehicles:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchVehicles();
  }, []);

  useEffect(() => {
    const params = Object.fromEntries(searchParams.entries());
    setFilters((prev) => ({
      ...prev,
      make: params.make || '',
      model: params.model || '',
      bodyType: params.bodyType || '',
      maxPrice: params.maxPrice || '',
      keyword: params.keyword || '',
    }));
  }, [searchParams]);

  const handleFilterChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const applyFiltersToUrl = () => {
    const params = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value && key !== 'sortBy') {
        params.set(key, value);
      }
    });
    router.push(`/vehicles?${params.toString()}`);
    setIsFilterOpen(false);
  };

  const clearFilters = () => {
    setFilters(FILTER_DEFAULTS);
    router.push('/vehicles');
  };

  const makes = useMemo(() => {
    return Array.from(new Set(vehicles.map((vehicle) => vehicle.make))).sort();
  }, [vehicles]);

  const models = useMemo(() => {
    return Array.from(new Set(vehicles.map((vehicle) => vehicle.model))).sort();
  }, [vehicles]);

  const filteredVehicles = useMemo(() => {
    const minPrice = Number(filters.minPrice) || 0;
    const maxPrice = Number(filters.maxPrice) || Number.MAX_SAFE_INTEGER;
    const minYear = Number(filters.minYear) || 0;
    const maxYear = Number(filters.maxYear) || Number.MAX_SAFE_INTEGER;
    const minMileage = Number(filters.minMileage) || 0;
    const maxMileage = Number(filters.maxMileage) || Number.MAX_SAFE_INTEGER;
    const seats = Number(filters.seats) || 0;
    const keyword = filters.keyword.trim().toLowerCase();

    return vehicles.filter((vehicle) => {
      const matchesMake = filters.make ? vehicle.make === filters.make : true;
      const matchesModel = filters.model ? vehicle.model === filters.model : true;
      const matchesBody = filters.bodyType ? vehicle.bodyType === filters.bodyType : true;
      const matchesTransmission = filters.transmission
        ? vehicle.transmission === filters.transmission
        : true;
      const matchesFuel = filters.fuelType ? vehicle.fuelType === filters.fuelType : true;
      const matchesSeats = seats ? vehicle.seats === seats : true;
      const matchesKeyword = keyword
        ? `${vehicle.make} ${vehicle.model} ${vehicle.description}`.toLowerCase().includes(keyword)
        : true;

      return (
        matchesMake &&
        matchesModel &&
        matchesBody &&
        matchesTransmission &&
        matchesFuel &&
        matchesSeats &&
        matchesKeyword &&
        vehicle.price >= minPrice &&
        vehicle.price <= maxPrice &&
        vehicle.year >= minYear &&
        vehicle.year <= maxYear &&
        vehicle.mileage >= minMileage &&
        vehicle.mileage <= maxMileage
      );
    });
  }, [filters, vehicles]);

  const sortedVehicles = useMemo(() => {
    const list = [...filteredVehicles];
    switch (filters.sortBy) {
      case 'price-asc':
        return list.sort((a, b) => a.price - b.price);
      case 'price-desc':
        return list.sort((a, b) => b.price - a.price);
      case 'year-desc':
        return list.sort((a, b) => b.year - a.year);
      case 'mileage-asc':
        return list.sort((a, b) => a.mileage - b.mileage);
      default:
        return list.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
    }
  }, [filteredVehicles, filters.sortBy]);

  const activeChips = Object.entries(filters)
    .filter(([key, value]) => value && key !== 'sortBy')
    .map(([key, value]) => ({ key, label: `${key}: ${value}` }));

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-4xl text-slate-900">Our vehicle inventory</h1>
          <p className="mt-2 text-sm text-slate-600">
            Showing {sortedVehicles.length} vehicles
          </p>
        </div>
        <div className="flex items-center gap-3">
          <select
            name="sortBy"
            value={filters.sortBy}
            onChange={handleFilterChange}
            className="rounded-full border border-slate-200 px-4 py-2 text-sm"
          >
            {SORT_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                Sort: {option.label}
              </option>
            ))}
          </select>
          <button
            type="button"
            className="rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 lg:hidden"
            onClick={() => setIsFilterOpen(true)}
          >
            Filters
          </button>
        </div>
      </div>

      {activeChips.length > 0 && (
        <div className="mt-4 flex flex-wrap items-center gap-2">
          {activeChips.map((chip) => (
            <span key={chip.key} className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs text-slate-600">
              {chip.label}
            </span>
          ))}
          <button
            type="button"
            className="text-xs font-semibold text-slate-700 hover:text-slate-900"
            onClick={clearFilters}
          >
            Clear all
          </button>
        </div>
      )}

      <div className="mt-8 grid gap-8 lg:grid-cols-[280px_1fr]">
        <aside className="hidden lg:block">
          <div className="sticky top-28 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <FilterFields
              filters={filters}
              makes={makes}
              models={models}
              onChange={handleFilterChange}
              onApply={applyFiltersToUrl}
              onClear={clearFilters}
            />
          </div>
        </aside>

        <section>
          {loading ? (
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {Array.from({ length: 6 }).map((_, index) => (
                <div key={index} className="h-80 animate-pulse rounded-2xl bg-white" />
              ))}
            </div>
          ) : sortedVehicles.length === 0 ? (
            <div className="rounded-3xl border border-slate-200 bg-white p-8 text-center">
              <p className="text-lg font-semibold text-slate-800">No vehicles match your filters.</p>
              <p className="mt-2 text-sm text-slate-600">Try adjusting your search or contact us for help.</p>
              <div className="mt-6 flex flex-wrap justify-center gap-3">
                <button
                  type="button"
                  className="rounded-full bg-slate-900 px-5 py-2 text-sm font-semibold text-white"
                  onClick={clearFilters}
                >
                  Clear filters
                </button>
                <Link
                  href="/contact"
                  className="rounded-full border border-slate-300 px-5 py-2 text-sm font-semibold text-slate-700"
                >
                  Contact Us
                </Link>
              </div>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {sortedVehicles.map((vehicle) => (
                <VehicleCard key={vehicle.id} vehicle={vehicle} />
              ))}
            </div>
          )}
        </section>
      </div>

      {isFilterOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 lg:hidden">
          <div className="absolute right-0 top-0 h-full w-[85%] max-w-sm bg-white p-6 shadow-lg">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-slate-900">Filters</h2>
              <button
                type="button"
                className="text-sm font-semibold text-slate-600"
                onClick={() => setIsFilterOpen(false)}
              >
                Close
              </button>
            </div>
            <div className="mt-6">
              <FilterFields
                filters={filters}
                makes={makes}
                models={models}
                onChange={handleFilterChange}
                onApply={applyFiltersToUrl}
                onClear={clearFilters}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

interface FilterFieldsProps {
  filters: typeof FILTER_DEFAULTS;
  makes: string[];
  models: string[];
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  onApply: () => void;
  onClear: () => void;
}

function FilterFields({ filters, makes, models, onChange, onApply, onClear }: FilterFieldsProps) {
  return (
    <div className="space-y-4 text-sm">
      <div>
        <label className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Make</label>
        <select name="make" value={filters.make} onChange={onChange} className="mt-2 w-full rounded-xl border border-slate-200 px-3 py-2">
          <option value="">Any</option>
          {makes.map((make) => (
            <option key={make} value={make}>
              {make}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Model</label>
        <select name="model" value={filters.model} onChange={onChange} className="mt-2 w-full rounded-xl border border-slate-200 px-3 py-2">
          <option value="">Any</option>
          {models.map((model) => (
            <option key={model} value={model}>
              {model}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Body type</label>
        <select name="bodyType" value={filters.bodyType} onChange={onChange} className="mt-2 w-full rounded-xl border border-slate-200 px-3 py-2">
          <option value="">Any</option>
          {BODY_TYPES.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Min price</label>
          <input name="minPrice" value={filters.minPrice} onChange={onChange} className="mt-2 w-full rounded-xl border border-slate-200 px-3 py-2" />
        </div>
        <div>
          <label className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Max price</label>
          <input name="maxPrice" value={filters.maxPrice} onChange={onChange} className="mt-2 w-full rounded-xl border border-slate-200 px-3 py-2" />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Min year</label>
          <input name="minYear" value={filters.minYear} onChange={onChange} className="mt-2 w-full rounded-xl border border-slate-200 px-3 py-2" />
        </div>
        <div>
          <label className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Max year</label>
          <input name="maxYear" value={filters.maxYear} onChange={onChange} className="mt-2 w-full rounded-xl border border-slate-200 px-3 py-2" />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Min mileage</label>
          <input name="minMileage" value={filters.minMileage} onChange={onChange} className="mt-2 w-full rounded-xl border border-slate-200 px-3 py-2" />
        </div>
        <div>
          <label className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Max mileage</label>
          <input name="maxMileage" value={filters.maxMileage} onChange={onChange} className="mt-2 w-full rounded-xl border border-slate-200 px-3 py-2" />
        </div>
      </div>
      <div>
        <label className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Transmission</label>
        <input name="transmission" value={filters.transmission} onChange={onChange} className="mt-2 w-full rounded-xl border border-slate-200 px-3 py-2" />
      </div>
      <div>
        <label className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Fuel type</label>
        <input name="fuelType" value={filters.fuelType} onChange={onChange} className="mt-2 w-full rounded-xl border border-slate-200 px-3 py-2" />
      </div>
      <div>
        <label className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Seats</label>
        <input name="seats" value={filters.seats} onChange={onChange} className="mt-2 w-full rounded-xl border border-slate-200 px-3 py-2" />
      </div>
      <div>
        <label className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Keyword</label>
        <input name="keyword" value={filters.keyword} onChange={onChange} className="mt-2 w-full rounded-xl border border-slate-200 px-3 py-2" />
      </div>
      <div className="flex flex-wrap gap-3 pt-2">
        <button
          type="button"
          className="rounded-full bg-slate-900 px-4 py-2 text-xs font-semibold text-white"
          onClick={onApply}
        >
          Apply filters
        </button>
        <button
          type="button"
          className="rounded-full border border-slate-300 px-4 py-2 text-xs font-semibold text-slate-700"
          onClick={onClear}
        >
          Clear all
        </button>
      </div>
    </div>
  );
}
