import "../globals.css";
import Layout from "@/components/Layout";
import { Providers } from "@/redux/providers";
import type { Viewport } from "next";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Providers>
      <main>
        <Layout>{children}</Layout>
      </main>
    </Providers>
  );
}
