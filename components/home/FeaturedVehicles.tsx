'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { collection, getDocs, limit, query } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Vehicle } from '@/lib/types';
import VehicleCard from '@/components/vehicles/VehicleCard';

export default function FeaturedVehicles() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const q = query(collection(db, 'vehicles'), limit(6));
        const snapshot = await getDocs(q);
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
          createdAt: doc.data().createdAt?.toDate?.() || new Date(),
          updatedAt: doc.data().updatedAt?.toDate?.() || new Date(),
        })) as Vehicle[];
        setVehicles(data);
      } catch (error) {
        console.error('Error fetching featured vehicles:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchVehicles();
  }, []);

  return (
    <section className="bg-slate-50 py-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">Featured stock</p>
            <h2 className="font-display text-3xl text-slate-900">Ready to drive away</h2>
          </div>
          <Link href="/vehicles" className="text-sm font-semibold text-slate-600 hover:text-slate-900">
            Browse all vehicles
          </Link>
        </div>
        <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {loading
            ? Array.from({ length: 6 }).map((_, index) => (
                <div key={index} className="h-80 animate-pulse rounded-2xl bg-white" />
              ))
            : vehicles.map((vehicle) => (
                <VehicleCard key={vehicle.id} vehicle={vehicle} variant="featured" />
              ))}
        </div>
      </div>
    </section>
  );
}
