import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import Head from "next/head";
import type { Viewport } from "next";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  manifest: "/manifest.json",
  title: "Fiatplug",
  description: "Instant cash for gift cards & crypto exchange",
  openGraph: {
    title: "Fiatplug",
    description: "Instant cash for gift cards & crypto exchange",
    url: "https://app.fiatplug.com",
    type: "website",
    images: "https://app.fiatplug.com/image.jpg",
    siteName: "Fiatplug",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className} suppressHydrationWarning={true}>
        <main>
          {children} <Toaster position="top-center" reverseOrder={false} />
        </main>
      </body>
    </html>
  );
}
