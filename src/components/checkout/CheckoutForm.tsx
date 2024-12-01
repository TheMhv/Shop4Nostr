"use client";

import { useContext, useEffect, useState } from "react";
import { ContactInformationForm } from "./ContactInformation";
import { ShippingInformationForm } from "./ShippingInformation";
import { InvoiceForm } from "./InvoiceForm";
import { SummaryForm } from "./SummaryForm";
import { NostrContext } from "../NostrProvider";
import { useCart } from "../cart/CartContext";
import {
  createOrderContent,
  OrderContent,
  OrderItem,
  PaymentRequestContent,
} from "@/lib/nostr/checkout";
import { PublicKey } from "@rust-nostr/nostr-sdk";
import QRCode from "qrcode";

export type checkoutPageFormData = {
  nostr: string;
  name: string;
  address: string;
  email: string;
  telephone?: string;
  message?: string;
};

export const CheckoutForm = ({ shopPubKey }: { shopPubKey: string }) => {
  const { client, pubKey } = useContext(NostrContext);
  const [step, setStep] = useState<number>(1);
  const [formData, setFormData] = useState<checkoutPageFormData>({
    nostr: "",
    name: "",
    address: "",
    email: "",
    telephone: "",
    message: "",
  });

  const cartContext = useCart();

  useEffect(() => {
    if (!client || !pubKey) {
      return;
    }

    setFormData((prev) => ({
      ...prev,
      nostr: pubKey.toHex(),
    }));
  }, [client, pubKey]);

  const handleInputChange = (e: React.FormEvent<HTMLInputElement>) => {
    const { name, value } = e.target as HTMLInputElement;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleNextStep = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (step === 1 && formData.nostr.length >= 1) {
      return setStep(2);
    }

    if (
      step === 2 &&
      formData.name.length >= 1 &&
      formData.address.length >= 1
    ) {
      return setStep(3);
    }

    if (step === 3) {
      handleSendOrder().then((orderId) =>
        handleRequestPayment(orderId).then(() => setStep(4))
      );

      return;
    }

    return setStep(step + 1);
  };

  const handlePrevStep = () => {
    setStep(step - 1);
  };

  const handleSendOrder = async () => {
    const shippingId: string = cartContext.items
      .filter((item) => item.shipping)
      .map((item) => item.shipping?.method)
      .join(",");

    const items: OrderItem[] = cartContext.items.map((item) => {
      return {
        product_id: item.id,
        quantity: item.quantity,
      };
    });

    const orderContent: OrderContent = createOrderContent(
      formData.nostr,
      shippingId,
      items,
      formData.name,
      formData.address,
      formData.message,
      formData.telephone,
      formData.email
    );

    await client?.sendPrivateMsg(
      PublicKey.parse(shopPubKey),
      JSON.stringify(orderContent)
    );

    return orderContent.id;
  };

  const handleRequestPayment = async (orderId: string) => {
    const response = await fetch("/api/requestPayment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        orderId: orderId,
        npub: pubKey?.toBech32(),
        amount: Math.ceil(cartContext.totalPrice + cartContext.totalShipping),
      }),
    });

    const data: PaymentRequestContent = await response.json();

    const lightningInvoice = data.payment_options.find(
      (option) => option.type == "ln"
    )?.link;

    if (!lightningInvoice) {
      throw new Error("Unable to create lightning invoice");
    }

    setInvoice(lightningInvoice);
    QRCode.toDataURL(lightningInvoice).then((qrCode) => setInvoiceQR(qrCode));
  };

  const [invoice, setInvoice] = useState<string | undefined>();
  const [invoiceQR, setInvoiceQR] = useState<string | undefined>();

  return !client || !pubKey ? (
    <>
      <h1>Unable to get your profile information.</h1>
      <span>Please log in with your nostr extension.</span>
    </>
  ) : (
    <>
      <div className="mb-6 flex justify-between items-center">
        <div className="flex items-center">
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center ${
              step >= 1 ? "bg-white text-black" : "bg-gray-600 text-gray-300"
            }`}
          >
            1
          </div>

          <div
            className={`h-1 w-16 mx-2 ${
              step >= 2 ? "bg-white" : "bg-gray-600"
            }`}
          />

          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center ${
              step >= 2 ? "bg-white text-black" : "bg-gray-600 text-gray-300"
            }`}
          >
            2
          </div>

          <div
            className={`h-1 w-16 mx-2 ${
              step >= 3 ? "bg-white" : "bg-gray-600"
            }`}
          />

          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center ${
              step >= 3 ? "bg-white text-black" : "bg-gray-600 text-gray-300"
            }`}
          >
            3
          </div>

          <div
            className={`h-1 w-16 mx-2 ${
              step >= 4 ? "bg-white" : "bg-gray-600"
            }`}
          />

          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center ${
              step >= 4 ? "bg-white text-black" : "bg-gray-600 text-gray-300"
            }`}
          >
            4
          </div>
        </div>

        <div className="text-sm text-gray-300">Step {step} of 4</div>
      </div>

      <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
        <form onSubmit={handleNextStep}>
          {step === 4 && invoice && invoiceQR ? (
            <InvoiceForm
              invoice={invoice}
              qrCode={invoiceQR}
              handlePrevStep={handlePrevStep}
            />
          ) : step === 3 ? (
            <SummaryForm cart={cartContext} handlePrevStep={handlePrevStep} />
          ) : step === 2 ? (
            <ShippingInformationForm
              formData={formData}
              handleInputChange={handleInputChange}
              handlePrevStep={handlePrevStep}
            />
          ) : (
            <ContactInformationForm
              formData={formData}
              handleInputChange={handleInputChange}
            />
          )}
        </form>
      </div>
    </>
  );
};
