import Link from 'next/link';
import { Vehicle } from '@/lib/types';

const FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80';

interface VehicleCardProps {
  vehicle: Vehicle;
  variant?: 'featured' | 'listing';
}

export default function VehicleCard({ vehicle, variant = 'listing' }: VehicleCardProps) {
  const badge = vehicle.badge || (vehicle.isFeatured ? 'Featured' : 'Just Listed');
  const driveAwayLabel = vehicle.isDriveAway ? 'Drive Away' : 'Price';
  const priceLabel = Number.isFinite(vehicle.price) ? `$${vehicle.price.toLocaleString()}` : 'Contact for price';
  const mileageLabel = Number.isFinite(vehicle.mileage)
    ? `${vehicle.mileage.toLocaleString()} km`
    : 'Mileage available on request';

  return (
    <div className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
      <div className="relative">
        <img
          src={vehicle.images?.[0] || FALLBACK_IMAGE}
          alt={`${vehicle.make} ${vehicle.model}`}
          className="h-52 w-full object-cover"
        />
        <span className="absolute left-4 top-4 rounded-full bg-slate-900 px-3 py-1 text-xs font-semibold text-white">
          {badge}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-lg font-semibold text-slate-900">
          {vehicle.year} {vehicle.make} {vehicle.model}
          {vehicle.variant ? ` ${vehicle.variant}` : ''}
        </h3>
        <p className="mt-1 text-xs text-slate-500">{vehicle.bodyType || 'Used vehicle'}</p>
        <div className="mt-4 flex items-baseline justify-between">
          <div>
            <p className="text-xs text-slate-500">{driveAwayLabel}</p>
            <p className="text-2xl font-semibold text-slate-900">
              {priceLabel}
            </p>
          </div>
          <div className="text-right text-xs text-slate-500">
            <p>{mileageLabel}</p>
            <p>{vehicle.transmission}</p>
          </div>
        </div>
        <div className="mt-4 flex flex-wrap gap-2 text-xs text-slate-600">
          <span className="rounded-full border border-slate-200 px-2 py-1">{vehicle.fuelType}</span>
          <span className="rounded-full border border-slate-200 px-2 py-1">{vehicle.bodyType}</span>
          {vehicle.location && (
            <span className="rounded-full border border-slate-200 px-2 py-1">{vehicle.location}</span>
          )}
        </div>
        <div className="mt-5 grid gap-2 sm:grid-cols-2">
          <Link
            href={`/vehicles/${vehicle.id}`}
            className="rounded-full bg-slate-900 px-4 py-2 text-center text-xs font-semibold text-white"
          >
            View Details
          </Link>
          <Link
            href={`/contact?vehicle=${vehicle.id}`}
            className="rounded-full border border-slate-300 px-4 py-2 text-center text-xs font-semibold text-slate-700"
          >
            Enquire Now
          </Link>
          <Link
            href="tel:+61431000280"
            className="rounded-full border border-slate-300 px-4 py-2 text-center text-xs font-semibold text-slate-700 sm:col-span-2"
          >
            Call Sales
          </Link>
        </div>
        {variant === 'featured' && (
          <div className="mt-4 flex items-center justify-between text-xs text-slate-500">
            <span>Stock: {vehicle.stockNumber || vehicle.id}</span>
            <span>{vehicle.location || 'Sydney'}</span>
          </div>
        )}
      </div>
    </div>
  );
}
