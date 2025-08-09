import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { Toaster } from "react-hot-toast";
import "./globals.css";
import ReactQueryProvider from "@/lib/ReactQueryProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "S3 Visualizer — Manage AWS S3 Buckets with Ease",
  description:
    "A powerful visual tool to explore, upload, and manage your AWS S3 files securely. Includes drag & drop uploads, public URLs, signed links, and more.",
  keywords: [
    "AWS S3",
    "S3 Visualizer",
    "S3 Bucket Manager",
    "S3 File Explorer",
    "AWS File Manager",
    "Drag and Drop S3",
  ],
  alternates: {
    canonical: "https://s3visualizer.vercel.app",
  },
  metadataBase: new URL("https://s3visualizer.vercel.app"),
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-image-preview": "standard",
    },
  },
  publisher: "sagar yenkure",
  openGraph: {
    title: "S3 Visualizer — Manage AWS S3 Buckets with Ease",
    description:
      "Explore, upload, and organize your AWS S3 content visually. Full CRUD operations, public links, and a user-friendly interface.",
    url: "https://s3visualizer.vercel.app",
    siteName: "S3 Visualizer",
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "S3 Visualizer Dashboard Screenshot",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "S3 Visualizer — Manage AWS S3 Buckets with Ease",
    description:
      "Visual interface to explore, upload, and manage your AWS S3 storage securely and easily.",
    images: ["/opengraph-image.png"],
    creator: "@yenkure_sagar",
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistSans.variable} antialiased`}
      >
        <ReactQueryProvider>
          <Toaster />
          {children}
        </ReactQueryProvider>
      </body>
    </html>
  );
}
