"use client";

import { useState } from "react";
import { ContactInformationForm } from "./ContactInformation";
import { ShippingInformationForm } from "./ShippingInformation";
import { InvoiceForm } from "./InvoiceForm";
import { SummaryForm } from "./SummaryForm";

export type checkoutPageFormData = {
  email: string;
  telephone?: string;
  name: string;
  address: string;
};

export const CheckoutForm = () => {
  const [step, setStep] = useState<number>(1);

  const [formData, setFormData] = useState({
    email: "",
    telephone: "",
    name: "",
    address: "",
  } as checkoutPageFormData);

  const handleInputChange = (e: React.FormEvent<HTMLInputElement>) => {
    const { name, value } = e.target as HTMLInputElement;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleNextStep = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (step === 1 && formData.email) {
      setStep(2);
      return;
    }

    if (step === 2 && formData.name && formData.address) {
      setStep(3);
      return;
    }

    setStep(step + 1);
  };

  const handlePrevStep = () => {
    setStep(step - 1);
  };

  return (
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
          {step === 4 ? (
            <InvoiceForm handlePrevStep={handlePrevStep} />
          ) : step === 3 ? (
            <SummaryForm handlePrevStep={handlePrevStep} />
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
