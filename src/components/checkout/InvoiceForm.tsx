"use Client";

import { useRef, useState } from "react";
import Image from "next/image";
import { ClipboardCheck, ClipboardCopy } from "lucide-react";

interface InvoiceFormProps {
  invoice: string;
  qrCode: string;
  handlePrevStep: () => void;
}

export const InvoiceForm = ({
  invoice,
  qrCode,
  handlePrevStep,
}: InvoiceFormProps) => {
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
