import { NextRequest, NextResponse } from "next/server";
import { orderStatus, requestPayment } from "@/lib/nostr/checkout";
import { clientConnect } from "@/lib/nostr/client";
import { PublicKey } from "@rust-nostr/nostr-sdk";
import { createInvoice } from "@/lib/nostr/invoice";

interface RequestBody {
  orderId: string;
  npub: string;
  amount: number;
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const data: RequestBody = await request.json();
    const client = await clientConnect();

    const paymentContent = requestPayment(data.npub, data.orderId);
    const orderStatusContent = orderStatus(data.npub, data.orderId);

    const invoiceOption = paymentContent.payment_options.find(
      (option) => option.type == "ln"
    );

    if (invoiceOption) {
      const invoice = await createInvoice(
        data.npub,
        JSON.stringify({ id: data.orderId }),
        data.amount
      );

      if (invoice?.pr) {
        paymentContent.payment_options = paymentContent.payment_options.map(
          (option) =>
            option.type === "ln" ? { type: "ln", link: invoice.pr } : option
        );
      }
    }

    client.sendPrivateMsg(
      PublicKey.parse(data.npub),
      JSON.stringify(paymentContent)
    );

    client.sendPrivateMsg(
      PublicKey.parse(data.npub),
      JSON.stringify(orderStatusContent)
    );

    return NextResponse.json(paymentContent);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
