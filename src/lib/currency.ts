import { Currencies, PricesType } from "@/types/currency";

const API_URL = "https://api.yadio.io/exrates/btc";
const SATS_PER_BTC = 100_000_000;

export async function convert(
  amount: number,
  fromCurrency: Currencies,
  toCurrency: Currencies
): Promise<number | null> {
  if (amount < 0) {
    return null;
  }

  const prices = await updatePrices();

  if (!prices[fromCurrency] || !prices[toCurrency]) {
    return null;
  }

  return amount * (prices[toCurrency] / prices[fromCurrency]);
}

async function updatePrices(): Promise<PricesType> {
  const pricesInSats: Record<string, number> = {
    SATS: 1,
    BTC: SATS_PER_BTC,
  };

  const response = await fetch(API_URL);
  const data = await response.json();

  const btcPrices: PricesType = data.BTC;

  Object.entries(btcPrices).forEach((price) => {
    pricesInSats[price[0]] = price[1];
  });

  return pricesInSats as PricesType;
}
