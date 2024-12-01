"use client";

import { createContext, useState, useEffect } from "react";
import {
  Client,
  loadWasmSync,
  Nip07Signer,
  NostrSigner,
  PublicKey,
} from "@rust-nostr/nostr-sdk";

interface NostrProviderProps {
  relays: string[];
  children: React.ReactNode;
}

interface NostrContextProps {
  client: Client | null;
  signer: Nip07Signer | null;
  pubKey: PublicKey | null;
}

const NostrContext = createContext({
  client: null,
  signer: null,
  pubKey: null,
} as NostrContextProps);

const NostrProvider: React.FC<NostrProviderProps> = ({ relays, children }) => {
  const [client, setClient] = useState<Client | null>(null);
  const [signer, setSigner] = useState<Nip07Signer | null>(null);
  const [pubKey, setPubKey] = useState<PublicKey | null>(null);

  loadWasmSync();

  useEffect(() => {
    const nip07Signer = new Nip07Signer();
    setSigner(nip07Signer);

    nip07Signer.getPublicKey().then((signerPubKey) => {
      setPubKey(signerPubKey);
    });

    const newSigner = NostrSigner.nip07(nip07Signer);
    const newClient = new Client(newSigner);

    relays.map(async (relay) => {
      await newClient.addRelay(relay);
    });

    newClient.connect().then(() => {
      setClient(newClient);
    });
  }, []);

  return (
    <NostrContext.Provider
      value={{ client, signer, pubKey } as NostrContextProps}
    >
      {children}
    </NostrContext.Provider>
  );
};

export { NostrProvider, NostrContext };
