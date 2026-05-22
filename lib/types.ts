export interface Vehicle {
  id: string;
  make: string;
  model: string;
  year: number;
  price: number;
  mileage: number;
  transmission: 'Manual' | 'Automatic' | 'CVT';
  fuelType: 'Petrol' | 'Diesel' | 'Hybrid' | 'Electric';
  bodyType: 'Sedan' | 'SUV' | 'Hatchback' | 'Coupe' | 'Truck' | 'Van' | 'Ute' | 'Wagon';
  features: string[];
  images: string[];
  condition: 'Excellent' | 'Good' | 'Fair' | 'For Parts';
  description: string;
  variant?: string;
  stockNumber?: string;
  vin?: string;
  registration?: string;
  regoExpiry?: string;
  bodyColour?: string;
  interiorColour?: string;
  doors?: number;
  seats?: number;
  cylinders?: number;
  engineSize?: string;
  driveType?: 'FWD' | 'RWD' | 'AWD' | '4WD';
  gears?: number;
  fuelConsumption?: string;
  ancapRating?: number;
  towingBraked?: number;
  location?: string;
  isDriveAway?: boolean;
  isFeatured?: boolean;
  isSold?: boolean;
  isReserved?: boolean;
  badge?: 'New Arrival' | 'Featured' | 'Great Value' | 'Reduced' | 'Sold' | 'Reserved';
  dealerComments?: string;
  includedInPrice?: string[];
  warrantyOptions?: string[];
  videoUrl?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Inquiry {
  id: string;
  vehicleId: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  createdAt: Date;
  status: 'new' | 'read' | 'responded';
}

export interface TestDrive {
  id: string;
  vehicleId: string;
  name: string;
  email: string;
  phone: string;
  preferredDate: string;
  preferredTime: string;
  createdAt: Date;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
}

export interface Admin {
  uid: string;
  email: string;
  role: 'admin' | 'superadmin';
  createdAt: Date;
}
