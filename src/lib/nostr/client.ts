import {
  Client,
  Keys,
  loadWasmAsync,
  NostrSigner,
  SecretKey,
} from "@rust-nostr/nostr-sdk";
import { loadConfig, Settings } from "@/lib/config";

const config: Settings = loadConfig();

class NostrClientManager {
  private static instance: NostrClientManager;
  private client: Client | null = null;
  private initializationPromise: Promise<Client> | null = null;

  private constructor() {}

  public static getInstance(): NostrClientManager {
    if (!NostrClientManager.instance) {
      NostrClientManager.instance = new NostrClientManager();
    }
    return NostrClientManager.instance;
  }

  public async getClient(): Promise<Client> {
    if (this.client) {
      return this.client;
    }

    if (!this.initializationPromise) {
      this.initializationPromise = this.initializeClient();
    }

    return this.initializationPromise;
  }

  private async initializeClient(): Promise<Client> {
    await loadWasmAsync();

    const signer: NostrSigner | undefined = config.STORE_PRIVKEY
      ? NostrSigner.keys(new Keys(SecretKey.parse(config.STORE_PRIVKEY)))
      : undefined;

    const client = new Client(signer || undefined);

    const relays = config.RELAYS;

    relays.map(async (relay) => {
      await client.addRelay(relay);
    });

    await client.connect();

    this.client = client;
    return client;
  }
}

export async function clientConnect(): Promise<Client> {
  const manager = NostrClientManager.getInstance();
  return manager.getClient();
}
