'use client';

import { useEffect, useMemo, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Vehicle } from '@/lib/types';
import VehicleCard from '@/components/vehicles/VehicleCard';

interface SimilarVehiclesProps {
  currentVehicleId: string;
  bodyType?: Vehicle['bodyType'];
  price?: number;
}

export default function SimilarVehicles({ currentVehicleId, bodyType, price }: SimilarVehiclesProps) {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const snapshot = await getDocs(collection(db, 'vehicles'));
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
          createdAt: doc.data().createdAt?.toDate?.() || new Date(),
          updatedAt: doc.data().updatedAt?.toDate?.() || new Date(),
        })) as Vehicle[];
        setVehicles(data);
      } catch (error) {
        console.error('Error fetching similar vehicles:', error);
      }
    };

    fetchVehicles();
  }, []);

  const similarVehicles = useMemo(() => {
    const filtered = vehicles.filter((vehicle) => vehicle.id !== currentVehicleId);

    const ranked = filtered
      .map((vehicle) => {
        let score = 0;
        if (bodyType && vehicle.bodyType === bodyType) score += 3;
        if (price && Math.abs(vehicle.price - price) <= 5000) score += 2;
        if (price && Math.abs(vehicle.price - price) <= 10000) score += 1;
        return { vehicle, score };
      })
      .sort((a, b) => b.score - a.score);

    return ranked.slice(0, 6).map((item) => item.vehicle);
  }, [vehicles, currentVehicleId, bodyType, price]);

  if (similarVehicles.length === 0) return null;

  return (
    <section className="mt-10">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-slate-900">Similar vehicles</h2>
      </div>
      <div className="mt-6 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {similarVehicles.map((vehicle) => (
          <VehicleCard key={vehicle.id} vehicle={vehicle} />
        ))}
      </div>
    </section>
  );
}
