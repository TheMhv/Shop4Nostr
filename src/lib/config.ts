import * as dotenv from "dotenv";
dotenv.config();

interface Settings {
  STORE_ID?: string;
  STORE_PRIVKEY: string;
  STORE_PUBKEY: string;
  RELAYS: string[];
  PAYMENT_OPTIONS: {
    url?: string;
    btc?: string;
    ln?: string;
    lnurl?: string;
  };
}

const loadConfig = (): Settings => {
  return {
    STORE_ID: process.env.STORE_ID,
    STORE_PRIVKEY: process.env.STORE_PRIVKEY || "",
    STORE_PUBKEY: process.env.STORE_PUBKEY || "",
    RELAYS: process.env.RELAYS?.split(",") || ["wss://relay.damus.io"],
    PAYMENT_OPTIONS: {
      url: process.env.PAYMENT_URL,
      btc: process.env.PAYMENT_BTC,
      ln: process.env.PAYMENT_LN,
      lnurl: process.env.PAYMENT_LNURL,
    },
  };
};

export { loadConfig };
export type { Settings };
