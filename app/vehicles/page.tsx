import { Suspense } from "react";
import VehiclesClient from "@/app/vehicles/VehiclesClient";

export default function VehiclesPage() {
  return (
    <Suspense
      fallback={
        <div className="px-4 py-12 text-center">Loading vehicles...</div>
      }
    >
      <VehiclesClient />
    </Suspense>
  );
}
