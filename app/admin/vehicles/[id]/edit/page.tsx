import VehicleFormPage from '@/app/admin/vehicles/new/page';

export default function EditVehiclePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  return <VehicleFormPage params={params} />;
}
