'use client';

import { useState, useEffect } from 'react';
import { db } from '@/lib/firebase';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { vehicleSchema } from '@/lib/validations';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const TRANSMISSIONS = ['Manual', 'Automatic', 'CVT'];
const FUEL_TYPES = ['Petrol', 'Diesel', 'Hybrid', 'Electric'];
const BODY_TYPES = ['Sedan', 'SUV', 'Hatchback', 'Coupe', 'Truck', 'Van', 'Ute', 'Wagon'];
const CONDITIONS = ['Excellent', 'Good', 'Fair', 'For Parts'];
const DRIVE_TYPES = ['FWD', 'RWD', 'AWD', '4WD'];
const BADGES = ['New Arrival', 'Featured', 'Great Value', 'Reduced', 'Sold', 'Reserved'];

interface EditPageProps {
  params: Promise<{ id: string }>;
}

export default function VehicleFormPage({ params }: EditPageProps) {
  const router = useRouter();
  const [vehicleId, setVehicleId] = useState<string | null>(null);
  const [isEdit, setIsEdit] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    make: '',
    model: '',
    variant: '',
    year: new Date().getFullYear(),
    price: 0,
    mileage: 0,
    transmission: 'Automatic',
    fuelType: 'Petrol',
    bodyType: 'Sedan',
    condition: 'Good',
    description: '',
    features: [''],
    images: [''],
    stockNumber: '',
    vin: '',
    registration: '',
    regoExpiry: '',
    bodyColour: '',
    interiorColour: '',
    doors: 4,
    seats: 5,
    cylinders: 4,
    engineSize: '',
    driveType: 'FWD',
    gears: 6,
    fuelConsumption: '',
    ancapRating: 5,
    towingBraked: 0,
    location: 'Sydney',
    isDriveAway: true,
    isFeatured: false,
    isSold: false,
    isReserved: false,
    badge: 'New Arrival',
    dealerComments: '',
    includedInPrice: ['Roadworthy certificate included'],
    warrantyOptions: ['Extended warranty available'],
    videoUrl: '',
  });

  useEffect(() => {
    const initializeForm = async () => {
      try {
        const resolvedParams = await params;
        if (resolvedParams.id && resolvedParams.id !== 'new') {
          setIsEdit(true);
          setVehicleId(resolvedParams.id);

          const docRef = doc(db, 'vehicles', resolvedParams.id);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            const data = docSnap.data();
            setFormData((prev) => ({
              ...prev,
              make: data.make,
              model: data.model,
              variant: data.variant || '',
              year: data.year,
              price: data.price,
              mileage: data.mileage,
              transmission: data.transmission,
              fuelType: data.fuelType,
              bodyType: data.bodyType,
              condition: data.condition,
              description: data.description,
              features: data.features || [''],
              images: data.images || [''],
              stockNumber: data.stockNumber || '',
              vin: data.vin || '',
              registration: data.registration || '',
              regoExpiry: data.regoExpiry || '',
              bodyColour: data.bodyColour || '',
              interiorColour: data.interiorColour || '',
              doors: data.doors ?? 4,
              seats: data.seats ?? 5,
              cylinders: data.cylinders ?? 4,
              engineSize: data.engineSize || '',
              driveType: data.driveType || 'FWD',
              gears: data.gears ?? 6,
              fuelConsumption: data.fuelConsumption || '',
              ancapRating: data.ancapRating ?? 5,
              towingBraked: data.towingBraked ?? 0,
              location: data.location || 'Sydney',
              isDriveAway: data.isDriveAway ?? true,
              isFeatured: data.isFeatured ?? false,
              isSold: data.isSold ?? false,
              isReserved: data.isReserved ?? false,
              badge: data.badge || 'New Arrival',
              dealerComments: data.dealerComments || '',
              includedInPrice: data.includedInPrice || ['Roadworthy certificate included'],
              warrantyOptions: data.warrantyOptions || ['Extended warranty available'],
              videoUrl: data.videoUrl || '',
            }));
          }
        }
      } catch (err) {
        console.error('Error loading vehicle:', err);
      } finally {
        setLoading(false);
      }
    };

    initializeForm();
  }, [params]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
    index?: number,
    field?: 'features' | 'images' | 'includedInPrice' | 'warrantyOptions'
  ) => {
    if (index !== undefined && field) {
      const updatedArray = [...formData[field]];
      updatedArray[index] = e.target.value;
      setFormData((prev) => ({ ...prev, [field]: updatedArray }));
    } else {
      const target = e.target as HTMLInputElement;
      const { name, value, type, checked } = target;
      setFormData((prev) => ({
        ...prev,
        [name]:
          type === 'checkbox'
            ? checked
            : ['year', 'price', 'mileage', 'doors', 'seats', 'cylinders', 'gears', 'ancapRating', 'towingBraked'].includes(name)
            ? Number(value)
            : value,
      }));
    }
  };

  const addListItem = (field: 'features' | 'images' | 'includedInPrice' | 'warrantyOptions') => {
    setFormData((prev) => ({
      ...prev,
      [field]: [...prev[field], ''],
    }));
  };

  const removeListItem = (field: 'features' | 'images' | 'includedInPrice' | 'warrantyOptions', index: number) => {
    setFormData((prev) => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);

    try {
      const filteredData = {
        ...formData,
        features: formData.features.filter((f) => f.trim() !== ''),
        images: formData.images.filter((img) => img.trim() !== ''),
        includedInPrice: formData.includedInPrice.filter((item) => item.trim() !== ''),
        warrantyOptions: formData.warrantyOptions.filter((item) => item.trim() !== ''),
      };

      vehicleSchema.parse(filteredData);

      const vehicleData = {
        ...filteredData,
        createdAt: isEdit ? undefined : new Date(),
        updatedAt: new Date(),
      };

      if (isEdit && vehicleId) {
        await updateDoc(doc(db, 'vehicles', vehicleId), vehicleData);
      } else {
        await setDoc(doc(db, 'vehicles', `vehicle_${Date.now()}`), vehicleData);
      }

      router.push('/admin/vehicles');
    } catch (err: any) {
      setError(err.message || 'Error saving vehicle');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <div className="text-center py-12">Loading...</div>;
  }

  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">
          {isEdit ? 'Edit Vehicle' : 'Add New Vehicle'}
        </h1>
        <Link href="/admin/vehicles" className="text-gray-600 hover:text-gray-900">
          ← Back
        </Link>
      </div>

      {error && (
        <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-8 space-y-8">
        <div>
          <h2 className="text-xl font-semibold mb-4">Basic Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input
              type="text"
              name="make"
              value={formData.make}
              onChange={handleChange}
              required
              placeholder="Make"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            />
            <input
              type="text"
              name="model"
              value={formData.model}
              onChange={handleChange}
              required
              placeholder="Model"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            />
            <input
              type="text"
              name="variant"
              value={formData.variant}
              onChange={handleChange}
              placeholder="Variant"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            />
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">Pricing & Status</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input
              type="number"
              name="year"
              value={formData.year}
              onChange={handleChange}
              min={1900}
              max={new Date().getFullYear() + 1}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            />
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              min={0}
              placeholder="Price"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            />
            <input
              type="number"
              name="mileage"
              value={formData.mileage}
              onChange={handleChange}
              min={0}
              placeholder="Mileage"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            />
          </div>
          <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <label className="flex items-center gap-2">
              <input type="checkbox" name="isDriveAway" checked={formData.isDriveAway} onChange={handleChange} />
              Drive-away pricing
            </label>
            <label className="flex items-center gap-2">
              <input type="checkbox" name="isFeatured" checked={formData.isFeatured} onChange={handleChange} />
              Featured
            </label>
            <label className="flex items-center gap-2">
              <input type="checkbox" name="isSold" checked={formData.isSold} onChange={handleChange} />
              Sold
            </label>
            <label className="flex items-center gap-2">
              <input type="checkbox" name="isReserved" checked={formData.isReserved} onChange={handleChange} />
              Reserved
            </label>
          </div>
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            <select name="badge" value={formData.badge} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg">
              {BADGES.map((badge) => (
                <option key={badge} value={badge}>{badge}</option>
              ))}
            </select>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="Location"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            />
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">Vehicle Type</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <select name="transmission" value={formData.transmission} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg">
              {TRANSMISSIONS.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
            <select name="fuelType" value={formData.fuelType} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg">
              {FUEL_TYPES.map((f) => (
                <option key={f} value={f}>{f}</option>
              ))}
            </select>
            <select name="bodyType" value={formData.bodyType} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg">
              {BODY_TYPES.map((b) => (
                <option key={b} value={b}>{b}</option>
              ))}
            </select>
          </div>
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            <select name="condition" value={formData.condition} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg">
              {CONDITIONS.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
            <select name="driveType" value={formData.driveType} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg">
              {DRIVE_TYPES.map((d) => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">Specs & Performance</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input name="doors" type="number" value={formData.doors} onChange={handleChange} placeholder="Doors" className="w-full px-4 py-2 border border-gray-300 rounded-lg" />
            <input name="seats" type="number" value={formData.seats} onChange={handleChange} placeholder="Seats" className="w-full px-4 py-2 border border-gray-300 rounded-lg" />
            <input name="cylinders" type="number" value={formData.cylinders} onChange={handleChange} placeholder="Cylinders" className="w-full px-4 py-2 border border-gray-300 rounded-lg" />
            <input name="engineSize" value={formData.engineSize} onChange={handleChange} placeholder="Engine size" className="w-full px-4 py-2 border border-gray-300 rounded-lg" />
            <input name="gears" type="number" value={formData.gears} onChange={handleChange} placeholder="Gears" className="w-full px-4 py-2 border border-gray-300 rounded-lg" />
            <input name="fuelConsumption" value={formData.fuelConsumption} onChange={handleChange} placeholder="Fuel consumption" className="w-full px-4 py-2 border border-gray-300 rounded-lg" />
            <input name="ancapRating" type="number" value={formData.ancapRating} onChange={handleChange} placeholder="ANCAP rating" className="w-full px-4 py-2 border border-gray-300 rounded-lg" />
            <input name="towingBraked" type="number" value={formData.towingBraked} onChange={handleChange} placeholder="Towing braked" className="w-full px-4 py-2 border border-gray-300 rounded-lg" />
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">Identifiers & Appearance</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input name="stockNumber" value={formData.stockNumber} onChange={handleChange} placeholder="Stock number" className="w-full px-4 py-2 border border-gray-300 rounded-lg" />
            <input name="vin" value={formData.vin} onChange={handleChange} placeholder="VIN" className="w-full px-4 py-2 border border-gray-300 rounded-lg" />
            <input name="registration" value={formData.registration} onChange={handleChange} placeholder="Registration" className="w-full px-4 py-2 border border-gray-300 rounded-lg" />
            <input name="regoExpiry" value={formData.regoExpiry} onChange={handleChange} placeholder="Rego expiry" className="w-full px-4 py-2 border border-gray-300 rounded-lg" />
            <input name="bodyColour" value={formData.bodyColour} onChange={handleChange} placeholder="Body colour" className="w-full px-4 py-2 border border-gray-300 rounded-lg" />
            <input name="interiorColour" value={formData.interiorColour} onChange={handleChange} placeholder="Interior colour" className="w-full px-4 py-2 border border-gray-300 rounded-lg" />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            rows={4}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Dealer comments</label>
          <textarea
            name="dealerComments"
            value={formData.dealerComments}
            onChange={handleChange}
            rows={4}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
          />
        </div>

        <ListField
          label="Features"
          items={formData.features}
          onAdd={() => addListItem('features')}
          onRemove={(index) => removeListItem('features', index)}
          onChange={(e, index) => handleChange(e, index, 'features')}
          placeholder="e.g., Air Conditioning"
        />

        <ListField
          label="Included in price"
          items={formData.includedInPrice}
          onAdd={() => addListItem('includedInPrice')}
          onRemove={(index) => removeListItem('includedInPrice', index)}
          onChange={(e, index) => handleChange(e, index, 'includedInPrice')}
          placeholder="e.g., Roadworthy certificate"
        />

        <ListField
          label="Warranty options"
          items={formData.warrantyOptions}
          onAdd={() => addListItem('warrantyOptions')}
          onRemove={(index) => removeListItem('warrantyOptions', index)}
          onChange={(e, index) => handleChange(e, index, 'warrantyOptions')}
          placeholder="e.g., 1-year warranty"
        />

        <ListField
          label="Images (URLs)"
          items={formData.images}
          onAdd={() => addListItem('images')}
          onRemove={(index) => removeListItem('images', index)}
          onChange={(e, index) => handleChange(e, index, 'images')}
          placeholder="https://example.com/image.jpg"
          inputType="url"
        />

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Video URL</label>
          <input
            name="videoUrl"
            value={formData.videoUrl}
            onChange={handleChange}
            placeholder="https://"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
          />
        </div>

        <div className="flex gap-4 pt-8 border-t">
          <button
            type="submit"
            disabled={submitting}
            className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition disabled:opacity-50"
          >
            {submitting ? 'Saving...' : isEdit ? 'Update Vehicle' : 'Add Vehicle'}
          </button>
          <Link
            href="/admin/vehicles"
            className="flex-1 bg-gray-300 text-gray-800 px-6 py-3 rounded-lg font-semibold hover:bg-gray-400 transition text-center"
          >
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}

interface ListFieldProps {
  label: string;
  items: string[];
  placeholder: string;
  inputType?: string;
  onAdd: () => void;
  onRemove: (index: number) => void;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    index: number
  ) => void;
}

function ListField({ label, items, placeholder, inputType = 'text', onAdd, onRemove, onChange }: ListFieldProps) {
  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">{label}</h2>
        <button type="button" onClick={onAdd} className="text-blue-600 hover:text-blue-800 text-sm">
          + Add
        </button>
      </div>
      <div className="space-y-2">
        {items.map((item, index) => (
          <div key={index} className="flex gap-2">
            <input
              type={inputType}
              value={item}
              onChange={(e) => onChange(e, index)}
              placeholder={placeholder}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg"
            />
            {items.length > 1 && (
              <button type="button" onClick={() => onRemove(index)} className="text-red-600 hover:text-red-800">
                Remove
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
