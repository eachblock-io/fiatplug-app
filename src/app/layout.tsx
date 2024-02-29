import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import Head from "next/head";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  manifest: "/manifest.json",
  title: "Fiatplug",
  description: "Instant cash for gift cards & crypto exchange",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
        />

        <meta name="application-name" content="Fiatplug" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Fiatplug" />
        <meta
          name="description"
          content="Instant cash for gift cards & crypto exchange"
        />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="msapplication-config" content="/icons/browserconfig.xml" />
        <meta name="msapplication-TileColor" content="#2B5797" />
        <meta name="msapplication-tap-highlight" content="no" />
        <meta name="theme-color" content="#000000" />

        <link rel="apple-touch-icon" href="/icons/touch-icon-iphone.png" />
        <link
          rel="apple-touch-icon"
          sizes="152x152"
          href="/icons/touch-icon-ipad.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/icons/touch-icon-iphone-retina.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="167x167"
          href="/icons/touch-icon-ipad-retina.png"
        />

        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/icons/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/icons/favicon-16x16.png"
        />
        <link rel="manifest" href="./manifest.json" />
        <link
          rel="mask-icon"
          href="/icons/safari-pinned-tab.svg"
          color="#5bbad5"
        />
        <link rel="shortcut icon" href="/favicon.ico" />

        <meta name="twitter:card" content="summary" />
        <meta name="twitter:url" content="https://app.fiatplug.com" />
        <meta name="twitter:title" content="Fiatplug" />
        <meta
          name="twitter:description"
          content="Instant cash for gift cards & crypto exchange"
        />
        <meta
          name="twitter:image"
          content="https://app.fiatplug.com/icons/android-chrome-192x192.png"
        />
        <meta name="twitter:creator" content="@fiatplug" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Fiatplug" />
        <meta
          property="og:description"
          content="Instant cash for gift cards & crypto exchange"
        />
        <meta property="og:site_name" content="Fiatplug" />
        <meta property="og:url" content="https://app.fiatplug.com" />
        <meta
          property="og:image"
          content="Instant cash for gift cards & crypto exchange"
        />
      </Head>
      <body className={inter.className}>
        <main>
          {children} <Toaster position="top-center" reverseOrder={false} />
        </main>
      </body>
    </html>
  );
}
