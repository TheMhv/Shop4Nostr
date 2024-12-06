"use client";

import { useContext, useEffect, useState } from "react";
import { Check, BadgeDollarSign } from "lucide-react";
import { CurrencyContext } from "@/components/CurrencyProvider";
import { Currencies } from "@/types/currency";

const CURRENCIES: Currencies[] = ["SATS", "BTC", "BRL", "EUR", "USD"];

export default function SettingsBadge({}) {
  const { currency, changeCurrency } = useContext(CurrencyContext);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest("[data-settings-dropdown]")) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleCurrencyChange = (newCurrency: Currencies) => {
    changeCurrency(newCurrency);
    setIsOpen(false);
  };

  return (
    <div className="relative" data-settings-dropdown>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 w-full p-2 rounded-full font-semibold hover:scale-105 transition-all text-white"
      >
        <div className="w-10 h-10 flex-shrink-0 bg-neutral-800 rounded-full flex items-center justify-center">
          <BadgeDollarSign className="text-white" />
        </div>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 rounded-lg bg-white shadow-lg z-50 border border-neutral-200">
          <div className="p-4">
            <h3 className="text-sm font-semibold text-neutral-700 mb-2">
              Select Currency
            </h3>

            <div className="space-y-1">
              {CURRENCIES.map((curr) => (
                <span
                  key={curr}
                  onClick={() => handleCurrencyChange(curr)}
                  className={`
                  flex justify-between items-center w-full p-2 rounded-md text-left
                  ${
                    currency === curr
                      ? "bg-neutral-800 text-white"
                      : "hover:bg-neutral-100 text-neutral-500"
                  }
                  transition-colors duration-200
                `}
                >
                  <span className="font-medium">{curr}</span>
                  {currency === curr && <Check className="w-5 h-5" />}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
