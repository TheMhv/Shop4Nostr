"use client";

import { useContext, useEffect, useState } from "react";
import { NostrContext } from "../NostrProvider";
import { User } from "lucide-react";
import { Metadata } from "@rust-nostr/nostr-sdk";
import Image from "next/image";

export default function ProfileBadge() {
  const { client, pubKey } = useContext(NostrContext);
  const [user, setUser] = useState<Metadata | undefined>();
  const [picture, setPicture] = useState<string | undefined>();

  useEffect(() => {
    if (!client || !pubKey) {
      return;
    }

    client.fetchMetadata(pubKey).then((profile) => {
      setUser(profile);
      setPicture(profile.getPicture());
    });
  }, [client, pubKey]);

  return !client ? (
    <></>
  ) : (
    <>
      <button className="flex items-center gap-2 w-full p-2 rounded-full font-semibold hover:scale-105 transition-all bg-neutral-800 text-white">
        <div className="relative w-10 h-10 flex-shrink-0">
          {picture ? (
            <Image
              src={picture}
              fill
              alt={`${user?.getDisplayName() || "User"}'s avatar`}
              className="absolute top-0 left-0 object-cover rounded-full"
              priority
            />
          ) : (
            <div className="h-full w-full bg-gray-600 rounded-full flex items-center justify-center">
              <User className="h-6 w-6 text-gray-300" />
            </div>
          )}
        </div>

        <span className="truncate max-w-[150px] mr-2 font-medium">
          {user?.getDisplayName() || "Anonymous User"}
        </span>
      </button>
    </>
  );
}
