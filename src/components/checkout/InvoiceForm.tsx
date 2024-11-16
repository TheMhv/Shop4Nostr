"use Client";

import { useRef, useState } from "react";
import Image from "next/image";
import { ClipboardCheck, ClipboardCopy } from "lucide-react";

interface InvoiceFormProps {
  handlePrevStep: () => void;
}

export const InvoiceForm = ({ handlePrevStep }: InvoiceFormProps) => {
  const invoice = "Sample Invoice";

  const qrCode =
    "data:image/png;base64,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";

  const invoiceInputRef = useRef<HTMLInputElement>(null);
  const [copySuccess, setCopySuccess] = useState<boolean>(false);

  const handleQRCodeClick = () => {
    if (invoice) {
      window.open(`lightning:${invoice}`, "_blank");
    }
  };

  const handleCopyInvoice = () => {
    if (invoiceInputRef.current) {
      invoiceInputRef.current.select();
      document.execCommand("copy");
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    }
  };

  return (
    <>
      <div className="space-y-4">
        <div onClick={handleQRCodeClick} className="cursor-pointer">
          <Image
            src={qrCode}
            alt="QR Code"
            width={800}
            height={800}
            className="mx-auto"
          />
        </div>

        <div className="text-center">
          <a
            href={`lightning:${invoice}`}
            className="text-primary hover:text-secondary underline"
          >
            Pay With Lightning
          </a>
        </div>

        <div>
          <label
            htmlFor="invoice"
            className="block mb-2 text-sm font-medium text-gray-200"
          >
            Invoice
          </label>

          <div className="flex">
            <input
              type="text"
              id="invoice"
              value={invoice}
              ref={invoiceInputRef}
              className="w-full bg-gray-700 border border-gray-600 text-white text-sm rounded-lg p-2.5 placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500"
              readOnly
            />

            <button
              type="button"
              onClick={handleCopyInvoice}
              className="inline-flex items-center justify-center py-2 px-4 ml-2 bg-white text-black whitespace-nowrap rounded-md text-sm font-medium hover:bg-gray-100 hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {copySuccess ? (
                <>
                  Copied!
                  <ClipboardCheck className="ml-2" />
                </>
              ) : (
                <>
                  Copy
                  <ClipboardCopy className="ml-2" />
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <div className="flex gap-4 pt-4">
          <button
            type="button"
            onClick={handlePrevStep}
            className="w-full py-3 px-6 bg-gray-700 text-white rounded-full font-semibold hover:bg-gray-600 transition-all"
          >
            Back
          </button>
        </div>
      </div>
    </>
  );
};
