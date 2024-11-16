import { PublicKey } from "@rust-nostr/nostr-sdk";
import { clientConnect } from "./client";

export async function getUser(npub: string) {
  const client = await clientConnect();

  const pubKey = PublicKey.parse(npub);
  return await client.fetchMetadata(pubKey);
}
