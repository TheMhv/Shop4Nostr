import { CheckoutForm } from "@/components/checkout/CheckoutForm";
import { NostrProvider } from "@/components/NostrProvider";
import { loadConfig, Settings } from "@/lib/config";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";

const config: Settings = loadConfig();

export default function CheckoutPage() {
  return (
    <main className="container mx-auto px-4 py-8">
      <div className="max-w-lg mx-auto">
        <div className="mb-8">
          <Link href="/" className="inline-block">
            <button className="text-white hover:text-gray-200 flex items-center gap-2 text-xl">
              <ChevronLeft className="h-5 w-5" />
              Checkout
            </button>
          </Link>
        </div>

        <NostrProvider relays={config.RELAYS}>
          <CheckoutForm shopPubKey={config.STORE_PUBKEY} />
        </NostrProvider>
      </div>
    </main>
  );
}
