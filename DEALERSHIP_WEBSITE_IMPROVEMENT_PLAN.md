# Vehicle Dealership Website Improvement Plan

## Goal

Improve the current vehicle dealership website so it feels closer to established Australian used-car dealership websites such as Ralph D'Silva Used Cars and Kassab Motors. The current project already has the main technical foundation: a public website, vehicle listings, vehicle detail pages, inquiry forms, test-drive booking, admin login, vehicle management, inquiries, test-drive management, Firebase, AWS S3, and Vercel deployment support. The issue is not that the site is missing the basic functionality. The issue is that the public experience is too minimal and does not yet feel like a complete dealership business website.

This document is written for GitHub Copilot. Each section explains what to improve, why it matters, and how to implement it in a Next.js + Tailwind + Firebase dealership project.

---

## Reference Website Observations

### 1. Ralph D'Silva Used Cars

Key patterns to copy conceptually:

- Strong dealership-style navigation with many business pages, not only inventory and contact.
- Top utility area showing location, phone number, sales/service identity, and quick actions.
- Homepage stock search placed very high on the page.
- Body-type shortcuts such as Hatchback, Sedan, Wagon, SUV, Ute, and Van.
- Multiple call-to-action paths: Search Stock, Contact Team, Book Service, Sell Your Car, Finance, Test Drive.
- Dealership trust copy explaining years of service, location, sales help, finance support, and service support.
- Footer with full address, phone, trading hours, stock links, specials, service, finance, contact, privacy policy, and terms.
- A more complete dealership ecosystem instead of a small catalogue site.

### 2. Kassab Motors

The homepage was blocked by JavaScript/anti-bot verification during browsing, but search-indexed vehicle pages and snippets reveal useful UX patterns:

- Vehicle detail pages emphasize "Drive Away" pricing.
- Dealer messaging highlights no hidden costs, roadworthy certificate, registration, stamp duty, and transfer fees.
- Vehicle pages include clear stock number, odometer, transmission, fuel type, body style, VIN, registration, cylinders, doors, seats, gears, drive type, and towing/braked weight where available.
- Dealer copy focuses on affordability, reliability, transparency, peace of mind, trade-ins, warranty options, and being open 7 days.
- Vehicle pages include inventory enquiry, print brochure, share option, full specs/features, dealer insights, similar cars, and find-us information.

---

## Current Project Baseline

The current project already includes:

- Homepage with featured vehicles carousel, hero section, and call-to-action buttons.
- Vehicle listing page with grid and filters for make, price range, year range, transmission, and fuel type.
- Vehicle details page with image gallery, specifications, features, inquiry form, and test-drive booking.
- Contact page with business hours, location, and contact form.
- Header, footer, mobile menu, and visible admin login.
- Protected admin panel with dashboard, vehicle CRUD, inquiries management, and test-drive booking management.
- Next.js, React, Tailwind CSS, Firebase Firestore, Firebase Auth, AWS S3, Zod, React Hook Form, and Vercel.

This means the improvement work should focus on:

1. Better dealership branding and visual design.
2. More complete public pages.
3. Richer vehicle data and trust signals.
4. Stronger homepage sections.
5. Better lead generation.
6. Better admin fields to support the improved public website.
7. Better mobile-first dealership UX.

---

# Phase 1: Redesign the Global Layout

## 1.1 Add a Dealership Utility Bar

### Problem

The current header likely feels like a normal simple website header. Real dealership websites usually show business contact details immediately.

### Improvement

Add a thin top utility bar above the main navigation.

### Content

- Phone number.
- Address or suburb.
- Opening status, for example: "Open today 9:00 AM - 5:30 PM".
- Quick links: Call Us, Find Us, Sell Your Car, Finance.

### Suggested component

Create:

```txt
components/layout/UtilityBar.tsx
```

### UI behavior

Desktop:

- Dark background.
- Left side: address and phone.
- Right side: quick links.

Mobile:

- Show two large tap targets: Call and Directions.
- Hide long address text if space is limited.

### Copilot task

```txt
Create a responsive UtilityBar component for a car dealership website. It should show phone, address, opening status, and quick links on desktop. On mobile, show compact Call and Directions buttons. Use Tailwind CSS and make it visually polished.
```

---

## 1.2 Upgrade the Main Header

### Problem

The current navigation only supports the minimum pages. Reference dealership websites have larger navigation structures.

### Improvement

Update the header navigation to include:

- Home
- Our Stock
- Sell Your Car
- Finance
- Warranty
- About Us
- Contact Us

Optional future items:

- Specials
- Recently Sold
- Reviews
- FAQs

### Important note

Do not make the admin login obvious in the public navigation. A public "Admin Login" button can make the site feel unfinished or less customer-focused.

### Recommended change

Move admin login to:

```txt
/admin/login
```

Keep it accessible by URL, but remove it from the main public header or place it in the footer as a very small internal link.

### Copilot task

```txt
Update the public header so it feels like a professional used-car dealership website. Add navigation links for Home, Our Stock, Sell Your Car, Finance, Warranty, About Us, and Contact Us. Hide the admin login from the primary navigation. Keep the header sticky on scroll and responsive on mobile.
```

---

## 1.3 Improve the Footer

### Problem

The footer should not only contain basic company info. It should support trust, SEO, navigation, and conversion.

### Improvement

Create a multi-column dealership footer.

### Footer columns

Column 1: Dealership

- Logo
- Short dealership description
- Phone
- Email
- Address

Column 2: Inventory

- All Stock
- SUVs
- Sedans
- Hatchbacks
- Utes
- Vans

Column 3: Customer Tools

- Finance
- Sell Your Car
- Warranty
- Book Test Drive
- Contact Us

Column 4: Opening Hours

- Monday-Friday
- Saturday
- Sunday
- Public holidays note

Bottom row:

- Privacy Policy
- Terms of Use
- Copyright
- Website credit if needed

### Copilot task

```txt
Create a professional multi-column dealership footer with inventory links, customer tools, contact details, opening hours, privacy policy, terms of use, and copyright. Use Tailwind CSS and ensure it looks good on mobile.
```

---

# Phase 2: Homepage Redesign

## 2.1 Add a Strong Hero Section

### Problem

A minimal hero section does not create enough trust or dealership identity.

### Improvement

Create a hero section that feels like a real car dealership landing page.

### Hero content

Headline examples:

```txt
Quality Used Cars in [City/Suburb]
```

```txt
Find Your Next Reliable Used Car Today
```

Subheading:

```txt
Browse inspected used vehicles with drive-away pricing, flexible finance options, trade-ins welcome, and friendly local service.
```

Primary CTA:

```txt
Search Our Stock
```

Secondary CTA:

```txt
Sell Your Car
```

Trust badges under CTA:

- Drive-away pricing
- Roadworthy included
- Trade-ins welcome
- Warranty options available

### Visual direction

Use either:

- Full-width dealership/car image background with dark overlay, or
- Split layout with text on left and featured car image on right.

### Copilot task

```txt
Redesign the homepage hero section for a used-car dealership. Include a strong headline, subheading, Search Our Stock button, Sell Your Car button, and four trust badges. Use a polished dark overlay or split hero layout with Tailwind CSS.
```

---

## 2.2 Add Homepage Stock Search

### Problem

Reference dealership websites put stock search near the top. This is important because most visitors arrive with the intent to browse cars immediately.

### Improvement

Add a compact search panel directly under the hero or overlapping the bottom of the hero.

### Fields

- Make
- Model
- Body type
- Price range
- Keyword search

### Button

```txt
Search Vehicles
```

### Behavior

When the visitor submits the form, redirect to:

```txt
/vehicles?make=Toyota&bodyType=SUV&maxPrice=20000
```

### Copilot task

```txt
Create a homepage vehicle search panel that allows users to filter by make, model, body type, price range, and keyword. On submit, redirect to /vehicles with query parameters. Style it like a dealership stock search module.
```

---

## 2.3 Add Body-Type Shortcut Cards

### Problem

The current filters are useful, but the homepage should offer fast visual browsing.

### Improvement

Add body-type shortcuts similar to reference sites.

### Cards

- SUV
- Sedan
- Hatchback
- Ute
- Van
- Wagon
- Coupe

### Behavior

Each card links to:

```txt
/vehicles?bodyType=SUV
```

### UI direction

Use simple icons or vehicle silhouettes. If icons are not available, use clean text cards with subtle line icons from lucide-react.

### Copilot task

```txt
Create a responsive BodyTypeShortcuts component for the homepage with cards for SUV, Sedan, Hatchback, Ute, Van, Wagon, and Coupe. Each card links to /vehicles with the bodyType query parameter.
```

---

## 2.4 Improve Featured Vehicles Section

### Problem

A basic carousel can feel generic. Dealership sites usually show strong vehicle cards with price, mileage, key specs, and CTA buttons.

### Improvement

Replace or improve the featured vehicle carousel with a dealership-style inventory preview.

### Vehicle card should show

- Main image
- Year, make, model
- Price with "Drive Away" label if enabled
- Mileage
- Transmission
- Fuel type
- Body type
- Short badge: "New Arrival", "Featured", "Great Value", or "Just Listed"
- CTA: View Details
- Secondary CTA: Enquire Now

### Optional

Add quick compare/favorite buttons later.

### Copilot task

```txt
Improve the featured vehicles section so cards show image, year, make, model, drive-away price, mileage, transmission, fuel type, body type, badge, View Details button, and Enquire Now button. Use a responsive grid on desktop and horizontal scroll on mobile.
```

---

## 2.5 Add Dealership Value Proposition Section

### Problem

Visitors need reasons to trust the dealer.

### Improvement

Add a section titled:

```txt
Why Buy From Us?
```

### Cards

1. Carefully selected vehicles
2. Mechanically inspected
3. Drive-away pricing
4. Trade-ins welcome
5. Finance options
6. Warranty options

### Copilot task

```txt
Create a WhyBuyFromUs section with six trust cards for a used-car dealership: carefully selected vehicles, mechanically inspected, drive-away pricing, trade-ins welcome, finance options, and warranty options. Use icons, short copy, and clean dealership styling.
```

---

## 2.6 Add Finance CTA Section

### Problem

Finance is one of the biggest missing business pages. Reference dealership websites treat finance as a major customer path.

### Improvement

Add a homepage finance CTA section.

### Content

Headline:

```txt
Need Finance? We Can Help
```

Copy:

```txt
Explore flexible finance options designed to help you drive away sooner.
```

CTA:

```txt
Apply for Finance
```

### Copilot task

```txt
Create a homepage finance call-to-action section for a used-car dealership with headline, short supporting copy, trust points, and Apply for Finance button linking to /finance.
```

---

## 2.7 Add Sell Your Car CTA Section

### Problem

Reference sites commonly include "Sell Your Car". This helps the dealer acquire inventory and gives visitors another reason to contact the business.

### Improvement

Add a section:

```txt
Sell or Trade Your Car
```

Fields for quick lead form:

- Name
- Phone
- Email
- Vehicle make
- Vehicle model
- Year
- Mileage
- Message

CTA:

```txt
Request a Valuation
```

### Copilot task

```txt
Create a SellYourCar homepage section with a short explanation and quick valuation form. Form fields should include name, phone, email, vehicle make, model, year, mileage, and message. Submit data to a new Firestore collection called sellYourCarLeads.
```

---

## 2.8 Add Testimonials / Reviews Section

### Problem

The site needs social proof.

### Improvement

Add a customer reviews section.

### Content

Use placeholder reviews initially. Later connect to Google Reviews manually or through a third-party service.

### UI

- 3 review cards on desktop.
- Star rating.
- Customer name.
- Short quote.

### Copilot task

```txt
Create a Testimonials section with three review cards, star ratings, customer names, and short quotes. Make it responsive and visually consistent with a dealership website.
```

---

## 2.9 Add Location / Find Us Section

### Problem

Dealership visitors often want to know where the yard is, opening hours, and whether they can visit today.

### Improvement

Add a homepage location section.

### Content

- Embedded Google Map or map placeholder.
- Address.
- Phone.
- Opening hours.
- Directions button.
- Contact button.

### Copilot task

```txt
Create a FindUs section for the homepage with address, phone, opening hours, Google Maps embed placeholder, Get Directions button, and Contact Us button.
```

---

# Phase 3: Vehicle Listing Page Improvements

## 3.1 Improve Filter UX

### Problem

The current listing page has filters, but it should feel closer to a real dealership stock page.

### Improvements

Add filters for:

- Make
- Model
- Body type
- Price range
- Year range
- Mileage range
- Transmission
- Fuel type
- Seats
- Sort by
  - Newest
  - Price low to high
  - Price high to low
  - Year newest
  - Mileage lowest

### UX details

- Desktop: sticky filter sidebar.
- Mobile: filter drawer opened by button.
- Show active filter chips.
- Add result count: "Showing 24 vehicles".
- Add clear all filters.

### Copilot task

```txt
Upgrade the vehicles listing page filters. Add body type, mileage range, seats, and sort options. Use a sticky filter sidebar on desktop and a slide-out filter drawer on mobile. Show active filter chips, result count, and clear all filters button.
```

---

## 3.2 Upgrade Vehicle Cards

### Problem

Vehicle cards need more selling information.

### Improved card fields

- Image
- Badge: Featured / New Arrival / Sold / Reserved
- Year make model
- Variant or trim
- Price
- Drive Away label
- Mileage
- Transmission
- Fuel type
- Body type
- Location/suburb
- Stock number
- Buttons:
  - View Details
  - Enquire
  - Call

### Optional visual cues

- Use icon row for mileage, fuel, transmission.
- Use strong price typography.
- Add hover effect on desktop.

### Copilot task

```txt
Redesign the VehicleCard component for a used-car dealership. Include badge, image, year/make/model, variant, drive-away price, mileage, transmission, fuel type, body type, suburb, stock number, View Details, Enquire, and Call buttons. Make it responsive and polished.
```

---

## 3.3 Add Empty State and Loading Skeletons

### Problem

Minimal websites often feel broken when loading or when no vehicles match filters.

### Improvement

Add:

- Loading skeleton cards.
- Empty state with helpful message.
- Button to clear filters.
- CTA to contact dealership if no matching vehicle is found.

### Copilot task

```txt
Add loading skeleton cards and an empty state to the vehicle listing page. The empty state should say no vehicles match the filters, offer a Clear Filters button, and include a Contact Us CTA.
```

---

# Phase 4: Vehicle Detail Page Improvements

## 4.1 Make the Vehicle Detail Page Feel Like a Sales Page

### Problem

The current detail page has specs, gallery, inquiry form, and test-drive booking. That is functional, but it should feel more like a professional listing page.

### Recommended layout

Top section:

- Breadcrumbs.
- Vehicle title.
- Price.
- Drive Away label.
- Stock number.
- Share button.
- Print brochure button.

Main section:

- Large image gallery on left.
- Sticky enquiry panel on right.

Sticky enquiry panel:

- Price.
- Phone number.
- Enquire Now button.
- Book Test Drive button.
- Apply for Finance button.
- Trade-in button.

Below:

- Key specs grid.
- Full specs accordion.
- Dealer comments.
- Features.
- Warranty/inspection/drive-away inclusions.
- Similar vehicles.
- Location map.

### Copilot task

```txt
Redesign the vehicle detail page into a dealership-style sales page. Add breadcrumbs, title, price, drive-away label, stock number, share button, print brochure button, large gallery, sticky enquiry panel, key specs grid, full specs accordion, dealer comments, features, warranty/inspection inclusions, similar vehicles, and location map.
```

---

## 4.2 Add More Vehicle Data Fields

### Problem

The current schema is too limited for a serious dealership listing.

### Add to vehicles schema

```ts
variant?: string
stockNumber?: string
vin?: string
registration?: string
regoExpiry?: string
bodyColour?: string
interiorColour?: string
doors?: number
seats?: number
cylinders?: number
engineSize?: string
driveType?: "FWD" | "RWD" | "AWD" | "4WD"
gears?: number
fuelConsumption?: string
ancapRating?: number
towingBraked?: number
location?: string
isDriveAway?: boolean
isFeatured?: boolean
isSold?: boolean
isReserved?: boolean
badge?: "New Arrival" | "Featured" | "Great Value" | "Reduced" | "Sold" | "Reserved"
dealerComments?: string
includedInPrice?: string[]
warrantyOptions?: string[]
videoUrl?: string
```

### Admin form updates

Add these fields to the add/edit vehicle form. Use optional fields so existing vehicles do not break.

### Copilot task

```txt
Extend the Vehicle TypeScript interface, Zod validation schema, Firestore vehicle form, and vehicle detail page to support additional dealership fields including variant, stockNumber, VIN, registration, rego expiry, colour, doors, seats, cylinders, engine size, drive type, gears, fuel consumption, ANCAP rating, towing braked, location, drive-away flag, featured flag, sold/reserved flags, badge, dealer comments, included in price, warranty options, and video URL.
```

---

## 4.3 Add Dealer Comments Section

### Problem

Many dealership vehicle pages rely on sales copy to reassure the buyer.

### Suggested dealer comments template

```txt
Located in [Suburb], this [Year Make Model] is ready for immediate inspection and test drive. We focus on quality, transparency, and peace of mind. Trade-ins are welcome, finance options are available, and warranty options can be discussed with our team.
```

### Inclusions list

- Roadworthy certificate included
- Registration included where applicable
- Stamp duty and transfer fees included where applicable
- Mechanically inspected
- Trade-ins welcome
- Warranty options available

### Copilot task

```txt
Add a DealerComments section to the vehicle detail page. It should display dealerComments and a checklist of includedInPrice items such as roadworthy certificate, registration, stamp duty, transfer fees, mechanical inspection, trade-ins, and warranty options.
```

---

## 4.4 Add Similar Vehicles

### Problem

Reference sites keep visitors browsing with similar cars.

### Logic

Show vehicles with:

1. Same body type first.
2. Similar price range second.
3. Same make third.
4. Exclude current vehicle.
5. Limit to 4 or 6 vehicles.

### Copilot task

```txt
Create a SimilarVehicles component for the vehicle detail page. Query Firestore for vehicles with the same body type or similar price range, exclude the current vehicle, limit results to 4 or 6, and display them using VehicleCard.
```

---

## 4.5 Add Enquiry Modal and Lead Capture

### Problem

The current page has an inquiry form, but dealership pages often use strong CTA buttons that open focused forms.

### Improvement

Add modal CTAs:

- Enquire Now
- Book Test Drive
- Apply for Finance
- Value My Trade-In

### Data storage

Existing:

- inquiries
- testDrives

New:

- financeLeads
- tradeInLeads

### Copilot task

```txt
Create reusable lead capture modals for Enquire Now, Book Test Drive, Apply for Finance, and Value My Trade-In. Store submissions in Firestore collections inquiries, testDrives, financeLeads, and tradeInLeads. Each modal should include vehicleId and vehicle title where applicable.
```

---

# Phase 5: Add Missing Public Pages

## 5.1 Sell Your Car Page

### Route

```txt
/sell-your-car
```

### Purpose

Capture trade-in and car valuation leads.

### Sections

1. Hero: "Sell or Trade Your Car"
2. Benefits:
   - Fast valuation
   - Trade-ins welcome
   - Simple process
   - Local dealership support
3. Valuation form:
   - Name
   - Phone
   - Email
   - Vehicle make
   - Vehicle model
   - Year
   - Mileage
   - Registration
   - Condition
   - Upload photos optional
   - Message
4. What happens next:
   - Submit details
   - Team reviews vehicle
   - Receive valuation
   - Visit dealership or complete sale

### Firestore collection

```txt
tradeInLeads
```

### Copilot task

```txt
Create a Sell Your Car page at /sell-your-car with a professional hero, benefits section, valuation form, and process steps. Save form submissions to Firestore collection tradeInLeads.
```

---

## 5.2 Finance Page

### Route

```txt
/finance
```

### Purpose

Capture finance leads and make the website feel like a complete dealership.

### Sections

1. Hero: "Vehicle Finance Made Simple"
2. Benefits:
   - Flexible options
   - Fast response
   - Support for different budgets
   - Helps customers drive away sooner
3. Finance enquiry form:
   - Name
   - Phone
   - Email
   - Employment status
   - Approximate budget
   - Vehicle of interest
   - Message
4. Disclaimer:
   - Finance subject to approval.
   - Terms, conditions, fees, and lending criteria may apply.

### Firestore collection

```txt
financeLeads
```

### Copilot task

```txt
Create a Finance page at /finance with a dealership-style hero, finance benefits, enquiry form, and finance disclaimer. Save submissions to Firestore collection financeLeads.
```

---

## 5.3 Warranty Page

### Route

```txt
/warranty
```

### Purpose

Explain warranty options and build trust.

### Sections

1. Hero: "Warranty Options for Peace of Mind"
2. Warranty benefits.
3. What warranty may cover.
4. How to ask about warranty.
5. CTA: Contact Us / Enquire About Warranty.

### Copilot task

```txt
Create a Warranty page at /warranty explaining warranty options for used vehicles. Include benefit cards, general coverage examples, a disclaimer that warranty availability depends on vehicle and provider, and a CTA to contact the dealership.
```

---

## 5.4 About Us Page

### Route

```txt
/about
```

### Purpose

Add dealership identity and trust.

### Sections

1. Dealer story.
2. Local area served.
3. Values:
   - Transparency
   - Reliability
   - Friendly service
   - Quality stock
4. Team placeholder.
5. Contact CTA.

### Copilot task

```txt
Create an About Us page for a local used-car dealership. Include dealership story, service area, values, team placeholder, and contact CTA. Keep the copy professional and trustworthy.
```

---

## 5.5 Reviews Page

### Route

```txt
/reviews
```

### Purpose

Build social proof.

### Sections

- Review summary.
- Review cards.
- CTA to contact or browse stock.

### Copilot task

```txt
Create a Reviews page with review cards, star ratings, customer names, and CTAs to browse stock and contact the dealership. Use placeholder reviews that can be replaced later.
```

---

## 5.6 FAQs Page

### Route

```txt
/faqs
```

### FAQ topics

- Do you accept trade-ins?
- Is finance available?
- Are prices drive-away?
- Can I book a test drive?
- Are vehicles inspected?
- Do you offer warranty options?
- What documents do I need?

### Copilot task

```txt
Create an FAQ page for a used-car dealership with accordion-style questions about trade-ins, finance, drive-away pricing, test drives, inspections, warranty options, and required documents.
```

---

# Phase 6: Admin Panel Improvements

## 6.1 Admin Dashboard Upgrade

### Problem

The dashboard currently shows basic stats. It should support dealership operations.

### Add stats

- Total vehicles
- Published vehicles
- Featured vehicles
- Sold vehicles
- Reserved vehicles
- New inquiries
- Pending test drives
- Finance leads
- Trade-in leads

### Add quick actions

- Add vehicle
- View inquiries
- View test drives
- View finance leads
- View trade-in leads

### Copilot task

```txt
Upgrade the admin dashboard with dealership-specific stats: total vehicles, published, featured, sold, reserved, new inquiries, pending test drives, finance leads, and trade-in leads. Add quick action buttons for add vehicle, inquiries, test drives, finance leads, and trade-in leads.
```

---

## 6.2 Add Finance Leads Management

### Route

```txt
/admin/finance-leads
```

### Fields to show

- Name
- Phone
- Email
- Vehicle of interest
- Budget
- Employment status
- Message
- Status
- Created date

### Statuses

- new
- contacted
- in_progress
- approved
- declined
- closed

### Copilot task

```txt
Create an admin finance leads page at /admin/finance-leads. List finance lead submissions from Firestore, show detail view, allow status updates, and allow delete. Use statuses new, contacted, in_progress, approved, declined, and closed.
```

---

## 6.3 Add Trade-In Leads Management

### Route

```txt
/admin/trade-ins
```

### Fields to show

- Customer name
- Phone
- Email
- Vehicle make/model/year
- Mileage
- Registration
- Condition
- Message
- Status
- Created date

### Statuses

- new
- contacted
- valuation_sent
- appointment_booked
- purchased
- closed

### Copilot task

```txt
Create an admin trade-in leads page at /admin/trade-ins. List trade-in submissions from Firestore, show detail view, allow status updates, and allow delete. Use statuses new, contacted, valuation_sent, appointment_booked, purchased, and closed.
```

---

## 6.4 Improve Vehicle Admin Form

### Problem

The current form supports core vehicle details, but dealership-style public pages need richer data.

### Add sections to form

1. Basic details
   - Make
   - Model
   - Variant
   - Year
   - Body type
   - Condition

2. Pricing and status
   - Price
   - Drive-away flag
   - Featured flag
   - Sold flag
   - Reserved flag
   - Badge

3. Specs
   - Mileage
   - Transmission
   - Fuel type
   - Engine size
   - Cylinders
   - Drive type
   - Doors
   - Seats
   - Gears
   - Fuel consumption
   - Towing braked

4. Identification
   - Stock number
   - VIN
   - Registration
   - Rego expiry

5. Appearance
   - Body colour
   - Interior colour

6. Sales copy
   - Short description
   - Dealer comments
   - Features list
   - Included in price list
   - Warranty options list

7. Media
   - Image upload
   - Video URL

### Copilot task

```txt
Refactor the add/edit vehicle admin form into grouped sections: Basic Details, Pricing and Status, Specs, Identification, Appearance, Sales Copy, and Media. Add all new vehicle schema fields and keep validation user-friendly.
```

---

## 6.5 Add Image Upload Improvements

### Problem

The summary says image handling currently uses URL input but can be upgraded to direct upload. A professional dealership admin should upload images directly.

### Improvements

- Drag-and-drop image upload.
- Multiple image upload.
- Reorder images.
- Delete images.
- Mark primary image.
- Compress/resize before upload if possible.
- Show upload progress.

### Copilot task

```txt
Upgrade the vehicle image admin UI from URL input to direct multi-image upload using the existing S3 presigned URL endpoint. Add drag-and-drop, upload progress, image preview, delete image, reorder images, and mark primary image.
```

---

# Phase 7: Data Model Updates

## 7.1 Updated Vehicle Interface

Replace or extend the current vehicle interface with something like this:

```ts
export interface Vehicle {
  id?: string;

  // Basic details
  make: string;
  model: string;
  variant?: string;
  year: number;
  bodyType: "Sedan" | "SUV" | "Hatchback" | "Coupe" | "Truck" | "Van" | "Ute" | "Wagon";
  condition: "Excellent" | "Good" | "Fair" | "For Parts";

  // Pricing and status
  price: number;
  isDriveAway?: boolean;
  isFeatured?: boolean;
  isSold?: boolean;
  isReserved?: boolean;
  badge?: "New Arrival" | "Featured" | "Great Value" | "Reduced" | "Sold" | "Reserved";

  // Specs
  mileage: number;
  transmission: "Manual" | "Automatic" | "CVT" | "Sports Automatic";
  fuelType: "Petrol" | "Diesel" | "Hybrid" | "Electric" | "Petrol - Premium ULP";
  engineSize?: string;
  cylinders?: number;
  driveType?: "FWD" | "RWD" | "AWD" | "4WD";
  doors?: number;
  seats?: number;
  gears?: number;
  fuelConsumption?: string;
  ancapRating?: number;
  towingBraked?: number;

  // Identification
  stockNumber?: string;
  vin?: string;
  registration?: string;
  regoExpiry?: string;

  // Appearance
  bodyColour?: string;
  interiorColour?: string;

  // Content
  description: string;
  dealerComments?: string;
  features: string[];
  includedInPrice?: string[];
  warrantyOptions?: string[];

  // Media
  images: string[];
  videoUrl?: string;

  // Location
  location?: string;

  createdAt: Timestamp;
  updatedAt: Timestamp;
}
```

---

## 7.2 New Firestore Collections

### tradeInLeads

```ts
export interface TradeInLead {
  id?: string;
  name: string;
  phone: string;
  email: string;
  vehicleMake: string;
  vehicleModel: string;
  vehicleYear?: number;
  mileage?: number;
  registration?: string;
  condition?: string;
  message?: string;
  status: "new" | "contacted" | "valuation_sent" | "appointment_booked" | "purchased" | "closed";
  createdAt: Timestamp;
  updatedAt?: Timestamp;
}
```

### financeLeads

```ts
export interface FinanceLead {
  id?: string;
  name: string;
  phone: string;
  email: string;
  vehicleId?: string;
  vehicleTitle?: string;
  employmentStatus?: string;
  budget?: number;
  deposit?: number;
  message?: string;
  status: "new" | "contacted" | "in_progress" | "approved" | "declined" | "closed";
  createdAt: Timestamp;
  updatedAt?: Timestamp;
}
```

### reviews

```ts
export interface Review {
  id?: string;
  name: string;
  rating: number;
  comment: string;
  source?: "manual" | "google" | "facebook";
  isPublished: boolean;
  createdAt: Timestamp;
}
```

### siteSettings

```ts
export interface SiteSettings {
  dealershipName: string;
  phone: string;
  email: string;
  address: string;
  suburb: string;
  state: string;
  postcode: string;
  openingHours: Record<string, string>;
  googleMapsUrl?: string;
  facebookUrl?: string;
  instagramUrl?: string;
  financeDisclaimer?: string;
}
```

---

# Phase 8: Visual Design System

## 8.1 Brand Direction

Use a stronger dealership style:

- Dark header and footer.
- White/grey content backgrounds.
- Strong accent color for CTAs.
- Large vehicle photography.
- Bold price typography.
- Clean cards with subtle shadows.
- Rounded corners, but not too playful.

### Suggested palette

```txt
Primary dark: #0B1220
Secondary dark: #111827
Accent: #E11D48 or #DC2626
Light background: #F8FAFC
Card background: #FFFFFF
Muted text: #64748B
Border: #E5E7EB
```

### Typography

- Headings: bold, modern, large.
- Body: clean and readable.
- Price: extra bold.
- Specs: compact with icons.

### Copilot task

```txt
Update the Tailwind theme and global styles to create a polished used-car dealership design system with dark header/footer, strong accent CTAs, light grey page backgrounds, white cards, bold vehicle prices, and consistent spacing.
```

---

## 8.2 Reusable Components to Create

Create these components:

```txt
components/layout/UtilityBar.tsx
components/layout/PublicHeader.tsx
components/layout/PublicFooter.tsx
components/home/HeroSection.tsx
components/home/StockSearchPanel.tsx
components/home/BodyTypeShortcuts.tsx
components/home/FeaturedVehicles.tsx
components/home/WhyBuyFromUs.tsx
components/home/FinanceCTA.tsx
components/home/SellYourCarCTA.tsx
components/home/Testimonials.tsx
components/home/FindUs.tsx
components/vehicles/VehicleCard.tsx
components/vehicles/VehicleFilters.tsx
components/vehicles/MobileFilterDrawer.tsx
components/vehicles/VehicleGallery.tsx
components/vehicles/VehicleSpecsGrid.tsx
components/vehicles/VehicleEnquiryPanel.tsx
components/vehicles/SimilarVehicles.tsx
components/forms/EnquiryModal.tsx
components/forms/TestDriveModal.tsx
components/forms/FinanceLeadForm.tsx
components/forms/TradeInLeadForm.tsx
components/ui/Badge.tsx
components/ui/SectionHeader.tsx
components/ui/LoadingSkeleton.tsx
components/ui/EmptyState.tsx
```

---

# Phase 9: SEO and Trust Improvements

## 9.1 Add Metadata to Pages

### Pages needing metadata

- Home
- Vehicles
- Vehicle detail
- Sell Your Car
- Finance
- Warranty
- About Us
- Contact

### Vehicle detail metadata

Generate title:

```txt
[Year] [Make] [Model] [Variant] for Sale | [Dealership Name]
```

Generate description:

```txt
View this [Year] [Make] [Model] with [mileage] km, [transmission], [fuelType]. Enquire today or book a test drive.
```

### Copilot task

```txt
Add Next.js metadata for all public pages. Generate dynamic metadata for vehicle detail pages using year, make, model, variant, mileage, transmission, fuel type, and dealership name.
```

---

## 9.2 Add Structured Data

### Add JSON-LD for dealership

Use AutoDealer or LocalBusiness schema.

### Add JSON-LD for vehicle detail pages

Include:

- Name
- Brand
- Model
- Year
- Mileage
- Fuel type
- Transmission
- Price
- Availability
- Image

### Copilot task

```txt
Add JSON-LD structured data for the dealership as a LocalBusiness/AutoDealer on the homepage and for each vehicle detail page using vehicle information, price, images, and availability.
```

---

## 9.3 Add Trust and Legal Pages

Create:

```txt
/privacy-policy
/terms-of-use
```

### Copilot task

```txt
Create simple Privacy Policy and Terms of Use pages for the dealership website. Add links to them in the footer. Keep content general and include placeholders for business name, address, and contact email.
```

---

# Phase 10: Mobile UX Improvements

## 10.1 Add Sticky Mobile CTA Bar

### Problem

Mobile users should always have quick actions available.

### Improvement

On vehicle detail pages, add a sticky bottom CTA bar with:

- Call
- Enquire
- Test Drive

### Copilot task

```txt
Add a sticky mobile CTA bar to vehicle detail pages with Call, Enquire, and Test Drive buttons. Hide it on desktop and ensure it does not overlap page content.
```

---

## 10.2 Improve Mobile Navigation

### Improvement

Mobile menu should show:

- Call button
- Directions button
- Main nav links
- Opening hours
- Social links

### Copilot task

```txt
Improve the mobile navigation drawer so it includes Call, Directions, nav links, opening hours, and social links. Make it feel like a dealership mobile menu.
```

---

# Phase 11: Recommended Implementation Order

## Sprint 1: Public Design Foundation

1. Utility bar.
2. Header navigation.
3. Footer.
4. Tailwind theme/design polish.
5. Remove admin login from primary public navigation.

## Sprint 2: Homepage Upgrade

1. Hero section.
2. Stock search panel.
3. Body type shortcuts.
4. Featured vehicle cards.
5. Why Buy From Us.
6. Finance CTA.
7. Sell Your Car CTA.
8. Testimonials.
9. Find Us.

## Sprint 3: Vehicle Listing Upgrade

1. Vehicle card redesign.
2. Better filters.
3. Mobile filter drawer.
4. Sorting.
5. Loading and empty states.

## Sprint 4: Vehicle Detail Upgrade

1. Rich detail layout.
2. Sticky enquiry panel.
3. Key specs grid.
4. Full specs accordion.
5. Dealer comments.
6. Similar vehicles.
7. Mobile sticky CTA bar.

## Sprint 5: New Public Pages

1. Sell Your Car.
2. Finance.
3. Warranty.
4. About Us.
5. Reviews.
6. FAQs.
7. Privacy Policy.
8. Terms of Use.

## Sprint 6: Admin and Data Improvements

1. Extend vehicle schema.
2. Update Zod validations.
3. Refactor vehicle form into sections.
4. Add image upload improvements.
5. Add finance lead admin page.
6. Add trade-in lead admin page.
7. Upgrade dashboard stats.

## Sprint 7: SEO and Production Polish

1. Metadata.
2. JSON-LD structured data.
3. Sitemap.
4. Robots.txt.
5. Open Graph images.
6. Performance check.
7. Accessibility check.
8. Final responsive QA.

---

# Phase 12: Page-by-Page Acceptance Criteria

## Homepage acceptance criteria

- Looks like a complete dealership homepage, not a simple starter template.
- Has a strong hero section.
- Has stock search above the fold.
- Has body-type shortcuts.
- Shows featured vehicles with rich cards.
- Explains why customers should trust the dealer.
- Includes finance, sell-your-car, reviews, and location sections.
- Works well on mobile.

## Vehicles page acceptance criteria

- Filters feel professional and easy to use.
- Mobile filters are not cramped.
- Vehicle cards show enough information to help customers decide.
- Sorting works.
- Empty and loading states are polished.

## Vehicle detail page acceptance criteria

- Vehicle page looks like a proper sales listing.
- Gallery is prominent.
- Price and CTA buttons are easy to find.
- Specs are detailed.
- Dealer comments build trust.
- Similar vehicles keep users browsing.
- Mobile sticky CTA bar works.

## Admin acceptance criteria

- Admin can manage all fields shown on public pages.
- Admin can manage finance leads and trade-in leads.
- Admin dashboard reflects dealership activity.
- Image management is easy and does not require manually pasting URLs.

---

# Phase 13: Example Copilot Master Prompt

Use this prompt in Copilot Chat when starting the improvement work:

```txt
I have a Next.js 16 vehicle dealership website using React, Tailwind CSS, Firebase Firestore, Firebase Auth, AWS S3, Zod, React Hook Form, and Vercel. The site already has public homepage, vehicles listing, vehicle detail, contact page, admin login, admin dashboard, vehicle CRUD, inquiries, and test-drive management.

I want to upgrade it to feel like a professional Australian used-car dealership website similar to Ralph D'Silva Used Cars and Kassab Motors. Please implement the work in phases.

Start with Phase 1 only:
1. Add a responsive top UtilityBar with phone, address, opening status, Call, Directions, Sell Your Car, and Finance links.
2. Upgrade the public header navigation to Home, Our Stock, Sell Your Car, Finance, Warranty, About Us, and Contact Us.
3. Remove the visible Admin Login from the main public navigation but keep /admin/login accessible.
4. Create a professional multi-column footer with dealership info, inventory links, customer tools, opening hours, legal links, and copyright.
5. Improve global Tailwind styling so the site has a polished used-car dealership look with dark header/footer, strong accent CTAs, light grey backgrounds, and clean white cards.

Make the implementation responsive, accessible, and consistent with the existing app structure. Do not break existing routes or Firebase functionality.
```

---

# Phase 14: Copywriting Starter Pack

## Hero copy

```txt
Quality Used Cars You Can Rely On
Browse inspected used vehicles with clear pricing, friendly service, trade-ins welcome, and finance options available.
```

## Why buy from us copy

```txt
We make buying your next car simple, transparent, and stress-free. Our vehicles are carefully selected, prepared for sale, and supported by a team ready to help you choose with confidence.
```

## Finance copy

```txt
Need help getting behind the wheel? Ask our team about flexible finance options designed around your budget.
```

## Sell your car copy

```txt
Looking to sell or trade your current vehicle? Send us your details and our team will review your car and contact you with the next steps.
```

## Warranty copy

```txt
Warranty options may be available on selected vehicles for extra peace of mind. Ask our team what options are available for the vehicle you are interested in.
```

## Dealer comments template

```txt
This vehicle has been selected with value, reliability, and everyday usability in mind. Trade-ins are welcome, finance options are available, and warranty options may be discussed with our team. Contact us today to arrange an inspection or book a test drive.
```

---

# Phase 15: Final Notes

The current website has a good technical foundation, but it needs to become a dealership business platform rather than only a vehicle catalogue. The biggest improvements are not only visual. The site needs more trust-building sections, stronger calls to action, richer vehicle details, better lead capture, and admin tools that support the public-facing experience.

Focus first on the public customer journey:

```txt
Arrive -> Search stock -> Trust dealer -> View vehicle -> Enquire/Test drive/Finance/Trade-in -> Admin follows up
```

Every new section should support that journey.
