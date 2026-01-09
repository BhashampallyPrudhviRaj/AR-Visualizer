# Luxe Rugs AR Visualizer

A premium, mobile-first web application for visualizing luxury rugs in augmented reality. Built with Next.js 14, TypeScript, Tailwind CSS, and Google's `<model-viewer>`.

## Features

- **Product Catalog**: Curated grid of luxury rugs with filtering (mocked).
- **AR Visualization**: "See in your room" functionality using WebXR/Quick Look.
- **2D Room Preview**: Fallback for non-AR devices allowing users to upload a room photo and place rugs.
- **Admin Dashboard**: Manage inventory and view analytics (mocked for demo).
- **Responsive Design**: Optimized for iOS Safari and Android Chrome.

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS (v4/PostCSS) + Framer Motion
- **AR Integration**: `@google/model-viewer`
- **Database**: Supabase (Client configured)
- **Icons**: Lucide React

## Getting Started

1. **Clone and Install**
   ```bash
   git clone <repo>
   cd ar-visualizer
   npm install
   ```

2. **Environment Setup**
   Create a `.env.local` file with your Supabase credentials (optional for demo mode):
   ```bash
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_key
   ```
   *Note: If keys are missing, the app will fallback to mock data.*

3. **Run Development Server**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000).

4. **Database Setup**
   Run the `schema.sql` script in your Supabase SQL Editor to create tables and seed data.

## Deployment

This app is ready for deployment on **Vercel**:

1. Push code to GitHub.
2. Import project in Vercel.
3. Add Environment Variables (`NEXT_PUBLIC_SUPABASE_URL`, etc).
4. Deploy.

## Verification

- **AR Mode**: Open the app on an ARCore (Android) or ARKit (iOS) compatible device. Go to a product and click "View in Your Room".
- **2D Mode**: On desktop or unsupported devices, use the "2D Preview" button in the AR view or fallback prompt.
