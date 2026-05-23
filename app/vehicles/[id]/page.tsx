"use client";

import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import { Vehicle } from "@/lib/types";
import Link from "next/link";
import { useParams } from "next/navigation";
import LeadActionBar from "@/components/vehicles/LeadActionBar";
import SimilarVehiclesSection from "@/components/vehicles/SimilarVehiclesSection";

export default function VehicleDetailsPage() {
  const params = useParams();
  const vehicleId = params.id as string;
  const [vehicle, setVehicle] = useState<Vehicle | null>(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const fetchVehicle = async () => {
      try {
        const docRef = doc(db, "vehicles", vehicleId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setVehicle({
            id: docSnap.id,
            ...docSnap.data(),
            createdAt: docSnap.data().createdAt?.toDate?.() || new Date(),
            updatedAt: docSnap.data().updatedAt?.toDate?.() || new Date(),
          } as Vehicle);
        }
      } catch (error) {
        console.error("Error fetching vehicle:", error);
      } finally {
        setLoading(false);
      }
    };

    if (vehicleId) fetchVehicle();
  }, [vehicleId]);

  if (loading) {
    return <div className="text-center py-12">Loading...</div>;
  }

  if (!vehicle) {
    return (
      <div className="text-center py-12">
        <p className="mb-4">Vehicle not found</p>
        <Link href="/vehicles" className="text-blue-600 hover:underline">
          ← Back to Vehicles
        </Link>
      </div>
    );
  }

  const handlePrint = () => {
    if (typeof window !== "undefined") {
      window.print();
    }
  };

  const handleShare = async () => {
    if (typeof window === "undefined") return;
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error("Error copying link:", error);
    }
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
        <Link href="/" className="hover:text-slate-700">
          Home
        </Link>
        <span>/</span>
        <Link href="/vehicles" className="hover:text-slate-700">
          Our Stock
        </Link>
        <span>/</span>
        <span>
          {vehicle.make} {vehicle.model}
        </span>
      </div>

      <div className="mt-6 flex flex-wrap items-start justify-between gap-6">
        <div>
          <h1 className="font-display text-4xl text-slate-900">
            {vehicle.year} {vehicle.make} {vehicle.model}
            {vehicle.variant ? ` ${vehicle.variant}` : ""}
          </h1>
          <p className="mt-2 text-sm text-slate-600">
            {vehicle.bodyType} • {vehicle.fuelType} • {vehicle.transmission}
          </p>
          {vehicle.stockNumber && (
            <p className="mt-1 text-xs text-slate-500">
              Stock: {vehicle.stockNumber}
            </p>
          )}
        </div>
        <div className="text-right">
          <p className="text-xs text-slate-500">
            {vehicle.isDriveAway ? "Drive Away" : "Price"}
          </p>
          <p className="text-4xl font-semibold text-slate-900">
            ${vehicle.price.toLocaleString()}
          </p>
          <p className="mt-1 text-xs text-slate-500">
            {vehicle.condition} condition
          </p>
        </div>
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <div className="grid gap-4">
            {vehicle.images?.[0] ? (
              <img
                src={vehicle.images[0]}
                alt={`${vehicle.make} ${vehicle.model}`}
                className="h-105 w-full rounded-3xl object-cover"
              />
            ) : (
              <div className="flex h-105 items-center justify-center rounded-3xl bg-slate-200 text-slate-500">
                No image available
              </div>
            )}
            {vehicle.images && vehicle.images.length > 1 && (
              <div className="grid grid-cols-3 gap-3">
                {vehicle.images.slice(1, 4).map((img, index) => (
                  <img
                    key={index}
                    src={img}
                    alt={`${vehicle.make} ${vehicle.model} ${index + 2}`}
                    className="h-28 w-full rounded-2xl object-cover"
                  />
                ))}
              </div>
            )}
          </div>

          <div className="mt-8 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-slate-900">
              Key specifications
            </h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <Spec
                label="Mileage"
                value={`${vehicle.mileage.toLocaleString()} km`}
              />
              <Spec label="Year" value={`${vehicle.year}`} />
              <Spec label="Transmission" value={vehicle.transmission} />
              <Spec label="Fuel Type" value={vehicle.fuelType} />
              <Spec label="Body Type" value={vehicle.bodyType} />
              <Spec label="Location" value={vehicle.location || "Sydney"} />
            </div>
          </div>

          <div className="mt-8 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-slate-900">Full specs</h2>
            <div className="mt-4 grid gap-4 text-sm text-slate-600 sm:grid-cols-2">
              {vehicle.variant && (
                <Spec label="Variant" value={vehicle.variant} />
              )}
              {vehicle.stockNumber && (
                <Spec label="Stock Number" value={vehicle.stockNumber} />
              )}
              {vehicle.vin && <Spec label="VIN" value={vehicle.vin} />}
              {vehicle.registration && (
                <Spec label="Registration" value={vehicle.registration} />
              )}
              {vehicle.regoExpiry && (
                <Spec label="Rego Expiry" value={vehicle.regoExpiry} />
              )}
              {vehicle.bodyColour && (
                <Spec label="Body Colour" value={vehicle.bodyColour} />
              )}
              {vehicle.interiorColour && (
                <Spec label="Interior Colour" value={vehicle.interiorColour} />
              )}
              {vehicle.doors && (
                <Spec label="Doors" value={`${vehicle.doors}`} />
              )}
              {vehicle.seats && (
                <Spec label="Seats" value={`${vehicle.seats}`} />
              )}
              {vehicle.cylinders && (
                <Spec label="Cylinders" value={`${vehicle.cylinders}`} />
              )}
              {vehicle.engineSize && (
                <Spec label="Engine Size" value={vehicle.engineSize} />
              )}
              {vehicle.driveType && (
                <Spec label="Drive Type" value={vehicle.driveType} />
              )}
              {vehicle.gears && (
                <Spec label="Gears" value={`${vehicle.gears}`} />
              )}
              {vehicle.fuelConsumption && (
                <Spec
                  label="Fuel Consumption"
                  value={vehicle.fuelConsumption}
                />
              )}
              {vehicle.ancapRating && (
                <Spec label="ANCAP Rating" value={`${vehicle.ancapRating}`} />
              )}
              {vehicle.towingBraked && (
                <Spec
                  label="Towing Braked"
                  value={`${vehicle.towingBraked} kg`}
                />
              )}
            </div>
          </div>

          <div className="mt-8 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-slate-900">
              Dealer comments
            </h2>
            <p className="mt-3 text-sm text-slate-600">
              {vehicle.dealerComments || vehicle.description}
            </p>
            <div className="mt-4 grid gap-2 text-sm text-slate-600 sm:grid-cols-2">
              {(vehicle.includedInPrice && vehicle.includedInPrice.length > 0
                ? vehicle.includedInPrice
                : [
                    "Roadworthy certificate included",
                    "Registration included where applicable",
                    "Stamp duty and transfer fees included where applicable",
                    "Mechanically inspected",
                    "Trade-ins welcome",
                    "Warranty options available",
                  ]
              ).map((item) => (
                <div key={item} className="flex items-center gap-2">
                  <span className="text-emerald-500">✓</span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {vehicle.features && vehicle.features.length > 0 && (
            <div className="mt-8 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-xl font-semibold text-slate-900">Features</h2>
              <div className="mt-4 grid gap-3 text-sm text-slate-600 sm:grid-cols-2">
                {vehicle.features.map((feature, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <span className="text-emerald-500">✓</span>
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_1fr]">
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-xl font-semibold text-slate-900">Find us</h2>
              <p className="mt-3 text-sm text-slate-600">
                721-725 High St, Preston VIC 3072, Australia
              </p>
              <p className="text-sm text-slate-600">
                Open today 9:00 AM - 5:30 PM
              </p>
            </div>
            <div className="overflow-hidden rounded-3xl border border-slate-200 bg-slate-100 shadow-sm">
              <iframe
                title="Dealership location"
                src="https://www.google.com/maps?q=721-725+High+St,+Preston+VIC+3072,+Australia&output=embed"
                className="h-56 w-full"
                loading="lazy"
              />
            </div>
          </div>
        </div>

        <aside className="space-y-4 lg:sticky lg:top-28 lg:self-start">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-xs text-slate-500">Drive Away</p>
            <p className="text-3xl font-semibold text-slate-900">
              ${vehicle.price.toLocaleString()}
            </p>
            <p className="mt-2 text-sm text-slate-600">
              Call us on +61 431 000 280
            </p>
            <div className="mt-6">
              <LeadActionBar
                vehicleId={vehicle.id}
                vehicleTitle={`${vehicle.year} ${vehicle.make} ${vehicle.model}`}
              />
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-6 text-sm text-slate-600 shadow-sm">
            <p className="font-semibold text-slate-900">Share or print</p>
            <div className="mt-4 flex gap-3">
              <button
                type="button"
                onClick={handlePrint}
                className="rounded-full border border-slate-300 px-4 py-2 text-xs font-semibold text-slate-700"
              >
                Print Brochure
              </button>
              <button
                type="button"
                onClick={handleShare}
                className="rounded-full border border-slate-300 px-4 py-2 text-xs font-semibold text-slate-700"
              >
                {copied ? "Link Copied" : "Share"}
              </button>
            </div>
          </div>
        </aside>
      </div>

      <SimilarVehiclesSection vehicle={vehicle} />
    </div>
  );
}

function Spec({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
        {label}
      </p>
      <p className="mt-1 text-sm font-semibold text-slate-900">{value}</p>
    </div>
  );
}
