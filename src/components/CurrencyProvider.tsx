"use client";

import { Currencies, CurrencyContextType } from "@/types/currency";
import { createContext, useState, useCallback, useEffect } from "react";

export const CurrencyContext = createContext<CurrencyContextType>({
  currency: "SATS",
  changeCurrency: () => {},
});

export const CurrencyProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [currency, setCurrency] = useState<Currencies>("SATS");

  useEffect(() => {
    const savedCurrency = localStorage.getItem("currency");

    if (savedCurrency) {
      setCurrency(savedCurrency as Currencies);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("currency", currency);
  }, [currency]);

  const changeCurrency = useCallback(
    (newCurrency: Currencies) => setCurrency(newCurrency),
    []
  );

  const value = {
    currency,
    changeCurrency,
  };

  return (
    <CurrencyContext.Provider value={value}>
      {children}
    </CurrencyContext.Provider>
  );
};
