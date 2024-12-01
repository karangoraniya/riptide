"use client";

import { useEffect, useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";


interface StoreDashboardSheetProps {
  menu_view: "developer" | "player" | "store";
  children: React.ReactNode;
}

export default function StoreDashboardSheet({
  children,
  menu_view,
}: StoreDashboardSheetProps) {
  const [view, setView] = useState<"developer" | "player" | "store">(
    "developer"
  );
  useEffect(() => {
    setView(menu_view);
  }, [menu_view]);

  const nfts = [
    {
      name: "Rootlets",
      img: "https://tradeport.mypinata.cloud/ipfs/QmWFurw6xktFkSvKRLWwoNHtPcUBGJDpimECYiz3PJXqMn?pinataGatewayToken=sd9Ceh-eJIQ43PRB3JW6QGkHAr8-cxGhhjDF0Agxwd_X7N4_reLPQXZSP_vUethU&img-width=500&img-height=500&img-fit=cover&img-quality=80&img-onerror=redirect&img-fit=pad&img-format=webp",
      description:
        "Companion collection to @suilendprotocol. The most premium art on Sui, but the art is good tho. Get ready, let’s r🐽t!",
    },
    {
      name: "Prime Machin",
      img: "https://img.sm.xyz/0xc94a37b7a848963fc6ae28bf8ad6bb18e07ed932cfbf6d9cd9c16e0b9108b378/",
      description:
        "Prime Machin is the first PFP collection on Sui to store hand-drawn raster art onchain at 4K resolution. By leveraging Sui's object-centric architecture and data storage capabilities, Prime Machin images are immortalized onchain for 100x cheaper than Solana, and 1,000x cheaper than Bitcoin (Ordinals).",
    },
    {
      name: "SuiFrens: Capys",
      img: "https://tradeport.mypinata.cloud/ipfs/QmSk9wP9m1wRohnZZcz6GfuwnBrvvF1QWXDwr1Erb6QzG3?pinataGatewayToken=sd9Ceh-eJIQ43PRB3JW6QGkHAr8-cxGhhjDF0Agxwd_X7N4_reLPQXZSP_vUethU&img-width=500&img-height=500&img-fit=cover&img-quality=80&img-onerror=redirect&img-fit=pad&img-format=webp",
      description:
        "SuiFrens are beloved imaginative, inventive creatures traversing the internet, seeking fellow pioneers to build new connections and friendships.",
    },
    {
      name: "Suilend Capsule",
      img: "https://tradeport.mypinata.cloud/ipfs/QmWb54EvLTDUSRtopD8Mk3WWjhW7TkpTEboeHg6XRexoLb?pinataGatewayToken=sd9Ceh-eJIQ43PRB3JW6QGkHAr8-cxGhhjDF0Agxwd_X7N4_reLPQXZSP_vUethU&img-width=500&img-height=500&img-fit=cover&img-quality=80&img-onerror=redirect&img-fit=pad&img-format=webp",
      description:
        "Suilend Capsules are one such way. These are NFTs awarded for exceptional contributions to the Suilend community. There are three types of capsule NFTs: Common, Uncommon, and Rare.",
    },
  ];
  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent side={"left"}>
        <SheetHeader>
          <SheetTitle>NFT Communities</SheetTitle>
          <SheetDescription>
            We have this communities on our platform
          </SheetDescription>
        </SheetHeader>
        {/* <div className="grid gap-4 py-4">
          <a href="/">
            <Button
              variant={view === "store" ? "default" : "outline"}
              className="w-full"
              onClick={() => setView("store")}
            >
              <ShoppingBag className="mr-2 h-4 w-4" />
              Main Store
            </Button>
          </a>
          <a href="/developer">
            <Button
              variant={view === "developer" ? "default" : "outline"}
              className="w-full"
              onClick={() => setView("developer")}
            >
              <LayoutDashboard className="mr-2 h-4 w-4" />
              Developer Dashboard
            </Button>
          </a>
          <a href="/player-dashboard">
            <Button
              variant={view === "player" ? "default" : "outline"}
              className="w-full line-through"
              onClick={() => setView("player")}
            >
              <LayoutDashboard className="mr-2 h-4 w-4" />
              Player Dashboard
            </Button>
          </a>
        </div> */}

        <div className="mx-auto my-10 max-w-screen-xl overflow-y-auto h-[80vh]">
          <div className="grid gap-y-8 sm:grid-cols-1 lg:grid-cols-1">
            {nfts.map((nft, index) => {
              return (
                <div
                  key={index}
                  className="group cursor mx-4 overflow-hidden rounded-2xl bg-white shadow-xl duration-200 hover:-translate-y-4"
                >
                  <div className="flex h-60 flex-col justify-between overflow-hidden">
                    <img
                      src={nft.img}
                      className="group-hover:scale-110 h-full w-full object-cover duration-200"
                    />
                  </div>
                  <div className="flex-1 overflow-hidden bg-white px-6 py-8">
                    <h5 className="group-hover:text-indigo-600 mb-4 text-xl font-bold">
                      {nft.name}
                    </h5>
                    <p className="mb-8 text-gray-600">{nft.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
