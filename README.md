# Luxe Rugs AR Visualizer

A premium, mobile-first web application for a luxury rug retailer. Features a browser-native AR experience and a gesture-based 2D room visualizer fallback.

## 🚀 Deployment (GitHub Pages)

This project is configured for **Next.js Static Export** and deployment via **GitHub Actions**.

### 1. Repository Settings
To ensure styles and images load correctly on GitHub Pages:
- Go to **Settings > Pages** in your GitHub repository.
- Under **Build and deployment > Source**, select **GitHub Actions**.

### 2. Configuration
The site is currently configured for the subpath `/AR-Visualizer/`. If you change your repository name, update `basePath` and `assetPrefix` in `next.config.ts`.

### 3. Database vs Mock Mode
- **Testing Mode**: Currently, `lib/api.ts` has `isMock = true` to allow testing on GitHub Pages without a live Supabase connection.
- **Production Mode**: Set `isMock = false` and provide `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` in your GitHub repository **Secrets** or `.env.local`.

## 🛠 Features
- **AR Visualization**: Native iOS Quick Look and Android Scene Viewer integration.
- **2D Room Preview**: Advanced touch gestures (pinch-to-zoom, rotate, drag).
- **QR Handoff**: Desktop users can scan a QR code to launch the AR view on mobile.
- **Admin Dashboard**: (In simulation mode) To manage products and view analytics.

## 💻 Local Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

## 📦 Tech Stack
- **Next.js 14/15** (App Router)
- **TypeScript**
- **Tailwind CSS** (Luxury Theme)
- **Supabase** (Postgres + Auth)
- **Model Viewer** (Google)
- **Use Gesture** (Advanced Touch Controls)
