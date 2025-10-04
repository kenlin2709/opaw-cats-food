import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";
import { CartProvider } from "@/contexts/CartContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Opaw Cat Food - Premium Cat Food Store",
  description: "Premium quality cat food for your beloved feline friends. Natural ingredients, great taste, and optimal nutrition.",
  keywords: "cat food, premium cat food, natural cat food, healthy cat food, Opaw Cat Food",
  authors: [{ name: "Opaw Cat Food" }],
  icons: {
    icon: '/favicon.png',
    shortcut: '/favicon.png',
    apple: '/favicon.png',
  },
  openGraph: {
    title: "Opaw Cat Food - Premium Cat Food Store",
    description: "Premium quality cat food for your beloved feline friends. Natural ingredients, great taste, and optimal nutrition.",
    type: "website",
    images: ['/logo.png'],
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
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <CartProvider>
          <Navigation />
          {children}
        </CartProvider>
      </body>
    </html>
  );
}
