import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";

export const metadata: Metadata = {
  title: "AA | Frontend Developer",
  description:
    "Frontend developer with backend experience, specializing in React, Next.js, TypeScript, Tailwind CSS and full-stack applications. Creator of Raivocoo - a portfolio builder for video editors.",
  keywords: [
    "frontend developer",
    "web developer",
    "React developer",
    "Next.js",
    "TypeScript",
    "Tailwind CSS",
    "full-stack",
    "portfolio",
    "web applications",
  ],
  authors: [{ name: "AA" }],
  creator: "AA",
  publisher: "AA",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  // openGraph: {
  //   type: "website",
  //   locale: "en_US",
  //   url: "https://yourdomain.com",
  //   siteName: "AA | Frontend Developer Portfolio",
  //   title: "AA | Frontend Developer",
  //   description:
  //     "Frontend developer with backend experience, specializing in React, Next.js, TypeScript, Tailwind CSS and full-stack applications",
  //   images: [
  //     {
  //       url: "/og-image.jpg",
  //       width: 1200,
  //       height: 630,
  //       alt: "AA | Frontend Developer Portfolio",
  //     },
  //   ],
  // },
  // twitter: {
  //   card: "summary_large_image",
  //   title: "AA | Frontend Developer",
  //   description:
  //     "Frontend developer with backend experience, specializing in React, Next.js, TypeScript, Tailwind CSS and full-stack applications",
  //   images: ["/og-image.jpg"],
  //   creator: "@yourtwitter",
  // },
};
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Navbar /> <main>{children}</main> <Footer />
      </body>
    </html>
  );
}
