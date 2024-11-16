import {
  Duration,
  EventBuilder,
  EventId,
  Filter,
  Kind,
  PublicKey,
  Timestamp,
} from "@rust-nostr/nostr-sdk";
import { clientConnect } from "./client";

export type ShopMetadata = {
  name?: string;
  about?: string;
  ui: {
    picture?: string;
    banner?: string;
    theme?: string;
    darkMode?: boolean;
  };
  merchants?: string[];
};

export function createShop(
  merchant: PublicKey,
  name?: string,
  description?: string,
  logo?: string,
  banner?: string
) {
  const content = JSON.stringify({
    name: name || "",
    about: description || "",
    ui: {
      picture: logo || "",
      banner: banner || "",
      theme: "",
      darkMode: false,
    },
    merchants: [merchant.toHex()] || [],
  });

  return new EventBuilder(new Kind(30019), content, []);
}

export async function getShopMetadata(
  npub: string
): Promise<ShopMetadata | null> {
  const client = await clientConnect();

  const filter = new Filter()
    .author(PublicKey.parse(npub))
    .kind(new Kind(30019))
    .until(Timestamp.now())
    .limit(1);

  const events = await client.fetchEvents([filter], Duration.fromSecs(10));

  const shopMetadataEvent = events.first();

  if (!shopMetadataEvent) {
    return null;
  }

  return JSON.parse(shopMetadataEvent.content);
}

export async function getProductsFromShop(npub: string) {
  const client = await clientConnect();

  const filter = new Filter()
    .author(PublicKey.parse(npub))
    .kind(new Kind(30402))
    .until(Timestamp.now());

  const events = await client.fetchEvents([filter], Duration.fromSecs(10));

  return events;
}

export async function getProductByEventId(eventId: string) {
  const client = await clientConnect();

  const filter = new Filter()
    .id(EventId.parse(eventId))
    .kind(new Kind(30402))
    .until(Timestamp.now());

  const events = await client.fetchEvents([filter], Duration.fromSecs(10));
  return events.first();
}
