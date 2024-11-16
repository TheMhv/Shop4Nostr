import { checkoutPageFormData } from "./CheckoutForm";

interface ShippingInformationFormProps {
  formData: checkoutPageFormData;
  handleInputChange: (e: React.FormEvent<HTMLInputElement>) => void;
  handlePrevStep: () => void;
}

export const ShippingInformationForm = ({
  formData,
  handleInputChange,
  handlePrevStep,
}: ShippingInformationFormProps) => {
  return (
    <>
      <div className="mb-6">
        <h2 className="text-2xl text-white">Shipping Information</h2>
      </div>

      <div className="space-y-6">
        <div>
          <label
            htmlFor="name"
            className="block mb-2 text-sm font-medium text-gray-200"
          >
            Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className="w-full bg-gray-700 border border-gray-600 text-white text-sm rounded-lg p-2.5 placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Satoshi Nakamoto"
            required
          />
        </div>

        <div>
          <label
            htmlFor="address"
            className="block mb-2 text-sm font-medium text-gray-200"
          >
            Shipping Address <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            className="w-full bg-gray-700 border border-gray-600 text-white text-sm rounded-lg p-2.5 placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Street, city, state/province, country and postal code"
            required
          />
        </div>

        <div className="flex gap-4 pt-4">
          <button
            type="button"
            onClick={handlePrevStep}
            className="w-full py-3 px-6 bg-gray-700 text-white rounded-full font-semibold hover:bg-gray-600 transition-all"
          >
            Back
          </button>

          <button
            type="submit"
            className="w-full py-3 px-6 bg-white text-black rounded-full font-semibold hover:bg-gray-100 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
};
