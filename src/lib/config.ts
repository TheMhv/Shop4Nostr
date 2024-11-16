import * as dotenv from "dotenv";
dotenv.config();

interface Settings {
  STORE_ID?: string;
  RELAYS: string[];
}

const loadConfig = (): Settings => {
  return {
    STORE_ID: process.env.STORE_ID,
    RELAYS: process.env.RELAYS?.split(",") || ["wss://relay.damus.io"],
  };
};

export { loadConfig };
export type { Settings };
