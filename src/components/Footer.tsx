import Link from "next/link";
import React from "react";
import { CartBar } from "./cart/CartBar";

export const Footer = () => {
  return (
    <footer className="w-full py-16 border-t border-white/35">
      <div className="flex items-center justify-center text-center text-sm space-x-2 mx-auto">
        <span>Built with</span>

        <Link
          href="https://github.com/TheMhv/Shop4Nostr"
          className="flex items-center justify-center text-purple-500 font-semibold hover:underline hover:text-base transition-all"
        >
          Shop4Nostr
        </Link>
      </div>

      <CartBar />
    </footer>
  );
};
