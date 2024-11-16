import React from "react";
import { ImageOff, Search } from "lucide-react";
import Image from "next/image";

interface HeaderProps {
  name?: string;
  description?: string;
  icon?: string;
}

const Header = ({ name = "", description = "", icon = "" }: HeaderProps) => {
  return (
    <header className="mt-24 px-4 md:px-8">
      <div className="text-center mx-auto space-y-4">
        <div className="flex items-center justify-center relative aspect-[3/4] rounded-full w-24 h-24 mx-auto bg-gray-800">
          {icon ? (
            <Image
              src={icon}
              fill
              alt="Store icon"
              className="object-cover rounded-full w-1/3 h-1/3"
            />
          ) : (
            <ImageOff
              className="object-cover rounded-full w-1/3 h-1/3"
              aria-hidden="true"
            />
          )}
        </div>

        <div className="space-y-2">
          <span className="text-2xl font-bold">{name}</span>
          <p className="text-white/80 text-sm">{description}</p>
        </div>
      </div>

      <div className="mx-auto mt-12 px-2 md:px-0 space-y-6">
        <form role="search" className="relative">
          <div className="absolute inset-y-0 start-0 flex items-center pl-3 pointer-events-none">
            <Search className="w-4 h-4 text-white/60" aria-hidden="true" />
          </div>

          <input
            type="text"
            className="bg-white/15 text-white text-sm rounded-lg outline-none border-2 border-transparent focus:border-white/15 block w-full pl-10 px-3 py-1.5"
            placeholder="Search..."
          />
        </form>

        <nav className="flex items-center gap-2">
          <button className="rounded-full border-2 py-2 px-4 cursor-pointer transition hover:bg-white/15 hover:border-white/30 text-white text-sm font-medium whitespace-nowrap border-transparent bg-white/30">
            All
          </button>

          <button className="rounded-full border-2 py-2 px-4 cursor-pointer transition hover:bg-white/15 text-white text-sm font-medium whitespace-nowrap border-white/25 bg-transparent">
            Tags
          </button>
        </nav>
      </div>
    </header>
  );
};

export { Header };
