import Link from "next/link";

export default function Home() {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="flex items-center justify-center text-center text-sm space-x-2 mx-auto">
        <span>Built your shop with </span>

        <Link
          href="https://github.com/TheMhv/Shop4Nostr"
          className="flex items-center justify-center text-purple-500 font-semibold hover:underline hover:text-base transition-all"
        >
          Shop4Nostr
        </Link>
      </div>
    </div>
  );
}
