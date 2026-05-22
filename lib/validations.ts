import { z } from 'zod';

export const vehicleSchema = z.object({
  make: z.string().min(1, 'Make is required'),
  model: z.string().min(1, 'Model is required'),
  year: z.number().min(1900).max(new Date().getFullYear() + 1),
  price: z.number().min(0, 'Price must be positive'),
  mileage: z.number().min(0, 'Mileage must be positive'),
  transmission: z.enum(['Manual', 'Automatic', 'CVT']),
  fuelType: z.enum(['Petrol', 'Diesel', 'Hybrid', 'Electric']),
  bodyType: z.enum(['Sedan', 'SUV', 'Hatchback', 'Coupe', 'Truck', 'Van', 'Ute', 'Wagon']),
  condition: z.enum(['Excellent', 'Good', 'Fair', 'For Parts']),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  features: z.array(z.string()),
  images: z.array(z.string()).optional(),
  variant: z.string().optional(),
  stockNumber: z.string().optional(),
  vin: z.string().optional(),
  registration: z.string().optional(),
  regoExpiry: z.string().optional(),
  bodyColour: z.string().optional(),
  interiorColour: z.string().optional(),
  doors: z.number().optional(),
  seats: z.number().optional(),
  cylinders: z.number().optional(),
  engineSize: z.string().optional(),
  driveType: z.enum(['FWD', 'RWD', 'AWD', '4WD']).optional(),
  gears: z.number().optional(),
  fuelConsumption: z.string().optional(),
  ancapRating: z.number().optional(),
  towingBraked: z.number().optional(),
  location: z.string().optional(),
  isDriveAway: z.boolean().optional(),
  isFeatured: z.boolean().optional(),
  isSold: z.boolean().optional(),
  isReserved: z.boolean().optional(),
  badge: z.enum(['New Arrival', 'Featured', 'Great Value', 'Reduced', 'Sold', 'Reserved']).optional(),
  dealerComments: z.string().optional(),
  includedInPrice: z.array(z.string()).optional(),
  warrantyOptions: z.array(z.string()).optional(),
  videoUrl: z.string().optional(),
});

export const inquirySchema = z.object({
  vehicleId: z.string().min(1, 'Vehicle ID is required'),
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(10, 'Invalid phone number'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

export const testDriveSchema = z.object({
  vehicleId: z.string().min(1, 'Vehicle ID is required'),
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(10, 'Invalid phone number'),
  preferredDate: z.string().min(1, 'Date is required'),
  preferredTime: z.string().min(1, 'Time is required'),
});

export type VehicleInput = z.infer<typeof vehicleSchema>;
export type InquiryInput = z.infer<typeof inquirySchema>;
export type TestDriveInput = z.infer<typeof testDriveSchema>;
