import { checkoutPageFormData } from "./CheckoutForm";

interface ContactInformationFormProps {
  formData: checkoutPageFormData;
  handleInputChange: (e: React.FormEvent<HTMLInputElement>) => void;
}

export const ContactInformationForm = ({
  formData,
  handleInputChange,
}: ContactInformationFormProps) => {
  return (
    <>
      <div className="mb-6">
        <h2 className="text-2xl text-white">Contact Information</h2>
      </div>

      <div className="space-y-6">
        <div>
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-200"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className="w-full bg-gray-700 border border-gray-600 text-white text-sm rounded-lg p-2.5 placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500"
            placeholder="satoshi@bitcoin.org"
          />
        </div>

        <div>
          <label
            htmlFor="telephone"
            className="block mb-2 text-sm font-medium text-gray-200"
          >
            Telephone
          </label>
          <input
            type="tel"
            id="telephone"
            name="telephone"
            value={formData.telephone}
            onChange={handleInputChange}
            className="w-full bg-gray-700 border border-gray-600 text-white text-sm rounded-lg p-2.5 placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500"
            placeholder="+9 99999 99999"
          />
        </div>

        <div>
          <label
            htmlFor="nostr"
            className="block mb-2 text-sm font-medium text-gray-200"
          >
            NOSTR <span className="text-red-500">*</span>
          </label>

          <input
            type="text"
            id="nostr"
            name="nostr"
            value={formData.nostr}
            className="w-full bg-gray-700 border border-gray-600 text-gray-400 text-sm rounded-lg p-2.5"
            required
            readOnly
          />
        </div>

        <div className="pt-4">
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
