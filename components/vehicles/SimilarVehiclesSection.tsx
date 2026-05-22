import SimilarVehicles from '@/components/vehicles/SimilarVehicles';
import { Vehicle } from '@/lib/types';

interface SimilarVehiclesSectionProps {
  vehicle: Vehicle;
}

export default function SimilarVehiclesSection({ vehicle }: SimilarVehiclesSectionProps) {
  return (
    <SimilarVehicles
      currentVehicleId={vehicle.id}
      bodyType={vehicle.bodyType}
      price={vehicle.price}
    />
  );
}
