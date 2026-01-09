import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import "./globals.css";

const openSans = Open_Sans({
  subsets: ["latin"],
  variable: "--font-open-sans",
});

export const metadata: Metadata = {
  title: "Atlas Rug Gallery AR",
  description: "Experience the finest antique and modern rugs in your home with Augmented Reality. Serving Washington DC since 1986.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${openSans.variable} antialiased font-sans bg-stone-50 text-stone-900`}
      >
        {children}
      </body>
    </html>
  );
}
