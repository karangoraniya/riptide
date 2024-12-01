"use client";
import { useEffect, useState } from "react";
import {
  ConnectButton,
  useCurrentAccount,
} from "@mysten/dapp-kit";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { useGameProducts } from "../contexts/developer-game-products-context";
import { toast } from "react-hot-toast";
import { useSuiLink } from "../contexts/suilink-context";
import { SuiClient } from "@mysten/sui/client";
export default function TronLinkCard() {


  const client = new SuiClient({ url: " https://rpc-testnet.suiscan.xyz" });
  const currentAccount = useCurrentAccount();
  const [name, setName] = useState("Karan.sui");
  const { registerUser } = useGameProducts();
  const {suiName,fetch} = useSuiLink();

  useEffect(() => {
    fetch(currentAccount?.address);
  }, []);

  return (
    <Card className="w-full border-0 shadow-none">
      <CardFooter className="flex flex-col">
        <ConnectButton />
        <p className="mt-8"> <span className="font-extrabold">{suiName}</span></p>
        {currentAccount && !suiName && (
          <>
            <div className="">
              <div className="flex w-auto flex-col space-y-5 mt-10 mx-auto">
                <div>
                  <div className="relative mt-2 w-full">
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="border-1 peer block w-full appearance-none rounded-lg border border-gray-300 bg-transparent px-2.5 pb-2.5 pt-4 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0"
                      placeholder=" "
                    />
                    <label
                      htmlFor="name"
                      className="absolute top-2 left-1 z-10 origin-[0] -translate-y-4 scale-75 transform cursor-text select-none bg-white px-2 text-sm text-gray-500 duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-2 peer-focus:text-blue-600"
                    >
                      {" "}
                      Enter Your Name{" "}
                    </label>
                  </div>
                </div>

                <button
                  onClick={async () => {
                    if (!currentAccount?.address) {
                      toast.error("Please connect your wallet first");
                      return;
                    }
                    const resp = await client.getOwnedObjects({
                      owner: currentAccount?.address,
                      filter: {            
                        StructType:
                          "0x22fa05f21b1ad71442491220bb9338f7b7095fe35000ef88d5400d28523bdd93::subdomain_registration::SubDomainRegistration",
                      },
                      options: {
                        showType: true,
                        showContent: true,
                        // showDisplay: true,
                      },
                    });
                    if(resp?.data?.length==0){
                      toast.error("You don't have any subdomain registered");
                      

                    }
                    await registerUser(
                      name,
                      currentAccount?.address
                    );
                  }}
                  className="rounded-lg bg-blue-600 py-3 font-bold text-white"
                >
                  Register
                </button>
              </div>
            </div>
          </>
        )}
      </CardFooter>
    </Card>
  );
}
