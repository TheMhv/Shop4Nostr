import { PublicKey } from "@rust-nostr/nostr-sdk";
import { loadConfig, Settings } from "../config";

const config: Settings = loadConfig();

export type OrderItem = {
  product_id: string;
  quantity: number;
};

export type OrderContent = {
  id: string;
  type: 0;
  name?: string;
  address?: string;
  message?: string;
  contact: {
    nostr: string; // <32-bytes hex of a pubkey>
    phone?: string;
    email?: string;
  };
  items: OrderItem[];
  shipping_id: string;
};

export type PaymentOptionType = "url" | "btc" | "ln" | "lnurl";

export type PaymentOption = {
  type: PaymentOptionType;
  link: string;
};

export type PaymentRequestContent = {
  id: string;
  type: 1;
  message: string;
  payment_options: PaymentOption[];
};

export type OrderStatusContent = {
  id: string;
  type: 2;
  message: string;
  paid: boolean;
  shipped: boolean;
};

// Client side
export function createOrderContent(
  nostr: string,
  shipping_id: string,
  items: OrderItem[],
  name: string = "",
  address: string = "",
  message: string = "",
  phone: string = "",
  email: string = ""
): OrderContent {
  const orderId =
    PublicKey.parse(nostr).toHex() + new Date().getTime().toString(16);

  const content: OrderContent = {
    id: orderId,
    type: 0,
    name: name,
    address: address,
    message: message,
    contact: {
      nostr: nostr,
      phone: phone,
      email: email,
    },
    items: items,
    shipping_id: shipping_id,
  };

  return content;
}

// Customer side
export function requestPayment(
  orderId: string,
  message: string = ""
): PaymentRequestContent {
  const paymentOptions: PaymentOption[] = Object.entries(config.PAYMENT_OPTIONS)
    .filter(([type, link]) => type && link)
    .map(([type, link]) => ({
      type: type as PaymentOptionType,
      link: link as string,
    }));

  const content: PaymentRequestContent = {
    id: orderId,
    type: 1,
    message: message,
    payment_options: paymentOptions,
  };

  return content;
}

export function orderStatus(
  npub: string,
  orderId: string,
  message: string = "",
  isPaid: boolean = false,
  isShipped: boolean = false
): OrderStatusContent {
  const content: OrderStatusContent = {
    id: orderId,
    type: 2,
    message: message,
    paid: isPaid,
    shipped: isShipped,
  };

  // TODO: Check payment

  return content;
}
