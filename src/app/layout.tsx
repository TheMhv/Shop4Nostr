import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { CartProvider } from "@/components/cart/CartProvider";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Shop4Nostr",
  description: "Simple NOSTR e-commerce client based on NIP-15",
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
        <div className="fixed top-0 right-0 p-10 z-20">
          <NostrProvider relays={config.RELAYS}>
            <ProfileBadge></ProfileBadge>
          </NostrProvider>
        </div>

        <CartProvider>
          <main className="container max-w-[870px] mx-auto px-4 space-y-8">
            {children}
          </main>
        </CartProvider>
      </body>
    </html>
  );
}
