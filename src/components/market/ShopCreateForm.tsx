"use client";

import { useContext, useState } from "react";
import { NostrContext } from "../NostrProvider";
import { createShop } from "@/lib/nostr/market";

export const ShopCreateForm = () => {
  const { signer, client, pubKey } = useContext(NostrContext);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });

  const handleTextAreaChange = (e: React.FormEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target as HTMLTextAreaElement;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleInputChange = (e: React.FormEvent<HTMLInputElement>) => {
    const { name, value } = e.target as HTMLInputElement;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!signer || !pubKey || !client) {
      return;
    }

    client
      .sendEventBuilder(createShop(pubKey, formData.name, formData.description))
      .then((sendEvent) => {
        console.log("Failed:", sendEvent.output.failed);
        console.log("Success:", sendEvent.output.success);
      });
  };

  return (
    <>
      <form onSubmit={handleSubmitForm}>
        <div className="space-y-6">
          <div>
            <label
              htmlFor="name"
              className="block mb-2 text-sm font-medium text-gray-200"
            >
              Name
            </label>

            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full bg-gray-700 border border-gray-600 text-white text-sm rounded-lg p-2.5 placeholder-gray-400"
              placeholder="Shop name"
              required
            />
          </div>

          <div>
            <label
              htmlFor="description"
              className="block mb-2 text-sm font-medium text-gray-200"
            >
              Description
            </label>

            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleTextAreaChange}
              className="block p-2.5 w-full h-28 text-sm text-white bg-gray-700 rounded-lg border border-gray-600 placeholder-gray-400"
              placeholder="Shop description"
            >
              {formData.description}
            </textarea>
          </div>
        </div>

        <div className="mt-6">
          <button
            type="submit"
            className="w-full py-3 px-6 rounded-full font-semibold hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed bg-white text-black"
          >
            Create
          </button>
        </div>
      </form>
    </>
  );
};
