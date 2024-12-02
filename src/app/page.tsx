import { loadConfig, Settings } from "@/lib/config";
import StorePage from "./shop/[npub]/page";

const config: Settings = loadConfig();

export default function Home() {
  return (
    <StorePage
      params={Promise.resolve({
        npub: config.STORE_PUBKEY,
      })}
    />
  );
}
