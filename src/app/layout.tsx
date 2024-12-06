import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { CartProvider } from "@/components/cart/CartProvider";
import { loadConfig, Settings } from "@/lib/config";
import { getUser } from "@/lib/nostr/users";
import { getShopMetadata } from "@/lib/nostr/market";
import { CurrencyProvider } from "@/components/CurrencyProvider";
import { NostrProvider } from "@/components/NostrProvider";
import ProfileBadge from "@/components/cornerMenu/ProfileBadge";
import SettingsBadge from "@/components/cornerMenu/SettingsBadge";

const config: Settings = loadConfig();

const shopProfile = await getUser(config.STORE_PUBKEY);
const shopMetadata = await getShopMetadata(config.STORE_PUBKEY);

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
  title: shopMetadata?.name || shopProfile.getName() || "Shop4Nostr",
  icons: {
    icon:
      shopMetadata?.ui.picture || shopProfile.getPicture() || "/favicon.ico",
  },
  description:
    shopMetadata?.about ||
    shopProfile.getAbout() ||
    "Simple NOSTR e-commerce client based on NIP-15",
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
        <CurrencyProvider>
          <div className="fixed top-0 right-0 p-10 z-20">
            <div className="flex">
              <SettingsBadge />

              <NostrProvider relays={config.RELAYS}>
                <ProfileBadge></ProfileBadge>
              </NostrProvider>
            </div>
          </div>

          <CartProvider>
            <main className="container max-w-[870px] mx-auto px-4 space-y-8">
              {children}
            </main>
          </CartProvider>
        </CurrencyProvider>
      </body>
    </html>
  );
}
