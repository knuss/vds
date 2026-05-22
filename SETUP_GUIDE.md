# Vehicle Dealership Website - Setup Guide

## Project Overview

This is a full-stack vehicle dealership website with Next.js, Firebase, and AWS S3 integration. It includes public vehicle browsing, filtering, inquiries, test drive bookings, and an admin panel for vehicle management.

## Features Implemented

### Public Features
- ✅ Homepage with featured vehicles
- ✅ Vehicle listing with advanced filters (make, year, price, transmission, fuel type)
- ✅ Vehicle detail pages with image gallery
- ✅ Inquiry forms for specific vehicles
- ✅ Test drive booking system
- ✅ General contact page
- ✅ Responsive design

### Admin Features
- ✅ Admin login/authentication (Firebase)
- ✅ Dashboard with statistics
- ✅ Vehicle CRUD operations (Create, Read, Update, Delete)
- ✅ Inquiry management
- ✅ Test drive booking management
- ✅ Vehicle filtering in admin

## Setup Instructions

### 1. Firebase Setup

1. Go to https://console.firebase.google.com/
2. Create a new project
3. Enable Firestore Database (test mode)
4. Create these collections in Firestore:
   - `vehicles` - Store vehicle listings
   - `inquiries` - Store vehicle inquiries
   - `testDrives` - Store test drive bookings
   - `admins` - Store admin users (optional, for access control)

5. Enable Authentication (Email/Password)
6. Get your Firebase config and add to `.env.local`:
   ```
   NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_bucket.appspot.com
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
   ```

7. Create admin users in Firebase Authentication

### 2. AWS S3 Setup

1. Go to https://console.aws.amazon.com/
2. Create an S3 bucket for vehicle images
3. Generate AWS credentials (Access Key ID, Secret Access Key)
4. Add to `.env.local`:
   ```
   AWS_ACCESS_KEY_ID=your_key
   AWS_SECRET_ACCESS_KEY=your_secret
   NEXT_PUBLIC_AWS_REGION=us-east-1
   NEXT_PUBLIC_AWS_S3_BUCKET=your_bucket_name
   ```

### 3. Environment Variables

Copy the provided `.env.local` file and fill in all values:

```bash
cp .env.local.example .env.local
```

### 4. Install Dependencies

```bash
npm install
```

### 5. Run Development Server

```bash
npm run dev
```

Visit http://localhost:3000

## Usage

### Adding Vehicles (Admin)

1. Go to http://localhost:3000/admin/login
2. Login with Firebase credentials
3. Navigate to "Vehicles" → "Add New Vehicle"
4. Fill in vehicle details (make, model, year, price, etc.)
5. Add features and image URLs
6. Save

### Managing Inquiries

1. Go to Admin Dashboard
2. Click on "Inquiries"
3. View and manage customer inquiries about vehicles

### Test Drive Bookings

1. Go to Admin Dashboard → "Test Drives"
2. View bookings and update status (pending, confirmed, completed, cancelled)

### Public Features

- Browse vehicles at `/vehicles`
- View vehicle details at `/vehicles/[id]`
- Make inquiries on vehicle detail pages
- Book test drives on vehicle detail pages
- Contact via `/contact` page

## Folder Structure

```
app/
├── (public)/               # Public routes
│   ├── page.tsx           # Homepage
│   ├── vehicles/
│   │   ├── page.tsx       # Vehicles listing with filters
│   │   └── [id]/page.tsx  # Vehicle detail page
│   └── contact/page.tsx   # Contact page
├── admin/                  # Admin routes (protected)
│   ├── login/page.tsx     # Admin login
│   ├── dashboard/page.tsx # Dashboard
│   ├── vehicles/
│   │   ├── page.tsx       # Vehicles management
│   │   └── form/page.tsx  # Add/edit vehicle
│   ├── inquiries/page.tsx # Inquiry management
│   └── test-drives/page.tsx
├── api/
│   └── upload-url/route.ts # S3 presigned URL generation
├── layout.tsx             # Root layout
└── globals.css

components/               # Reusable components (to be created)
lib/
├── firebase.ts           # Firebase config
├── aws.ts               # AWS S3 client
├── types.ts             # TypeScript interfaces
└── validations.ts       # Zod schemas

── migrations/ (if needed for backend)
```

## API Routes

- `POST /api/upload-url` - Generate presigned S3 URL for image uploads

## Database Schema

### vehicles collection
```javascript
{
  make: string,
  model: string,
  year: number,
  price: number,
  mileage: number,
  transmission: "Manual"|"Automatic"|"CVT",
  fuelType: "Petrol"|"Diesel"|"Hybrid"|"Electric",
  bodyType: "Sedan"|"SUV"|"Hatchback"|"Coupe"|"Truck"|"Van",
  condition: "Excellent"|"Good"|"Fair"|"For Parts",
  description: string,
  features: string[],
  images: string[], // URLs
  createdAt: timestamp,
  updatedAt: timestamp
}
```

### inquiries collection
```javascript
{
  vehicleId: string,
  name: string,
  email: string,
  phone: string,
  message: string,
  status: "new"|"read"|"responded",
  createdAt: timestamp
}
```

### testDrives collection
```javascript
{
  vehicleId: string,
  name: string,
  email: string,
  phone: string,
  preferredDate: string,
  preferredTime: string,
  status: "pending"|"confirmed"|"completed"|"cancelled",
  createdAt: timestamp
}
```

## Deployment to Vercel

1. Push your code to GitHub
2. Go to https://vercel.com/
3. Connect your GitHub repository
4. Add environment variables in Vercel dashboard:
   - All NEXT_PUBLIC_ variables
   - AWS credentials
5. Deploy

```bash
# Or deploy from CLI
npm install -g vercel
vercel --prod
```

## Customization

### Colors & Branding

Update Tailwind classes throughout the app. The primary color is blue-600.

### Business Hours & Contact Info

Update `/app/(public)/contact/page.tsx` with your business details

### Company Name

Replace "Kassab Motors" with your dealership name throughout the app

## Troubleshooting

### Firebase Not Connecting
- Verify `.env.local` has correct Firebase config
- Check Firestore is created and collections exist
- Admin SDK needs to be set up for backend operations

### Images Not Uploading
- Verify AWS S3 bucket name and credentials
- Check S3 bucket CORS configuration
- Ensure bucket policy allows PutObject

### Admin Login Not Working
- Verify admin user exists in Firebase Authentication
- Check email/password credentials
- Ensure Firebase project ID is correct

## Next Steps

1. Add email notifications for inquiries and test drive bookings
2. Implement image upload directly from admin panel (currently uses URLs)
3. Add email confirmations
4. Implement admin dashboard statistics
5. Add analytics
6. Implement payment integration for purchases
7. Add vehicle comparison feature
8. Add saved vehicles feature

## Tech Stack

- **Frontend**: Next.js 16, React, Tailwind CSS
- **Database**: Firebase Firestore
- **Authentication**: Firebase Auth
- **File Storage**: AWS S3
- **Validation**: Zod
- **Forms**: React Hook Form
- **Deployment**: Vercel

## Support

For issues or questions, check the following:
- Next.js docs: https://nextjs.org/docs
- Firebase docs: https://firebase.google.com/docs
- AWS S3 docs: https://docs.aws.amazon.com/s3/

---

Built with ❤️ using Next.js and Firebase
