"use client";
import React, { ReactNode, use, useEffect, useState } from "react";
import {
  MenuIcon,
  SearchIcon,
  HandCoins,
  X,
  CircleUser,
  ArrowUpFromLine,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "./button";
import Link from "next/link";

import {
  ConnectButton,
  useCurrentAccount,
  useSignAndExecuteTransaction,
} from "@mysten/dapp-kit";
import toast, { Toaster } from "react-hot-toast";
import { coinWithBalance, Transaction } from "@mysten/sui/transactions";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "./dialog";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
} from "./dropdown-menu";
import TronlinkCard from "../blocks/tronlink-card";

import { useCart } from "../contexts/cart-context";
import { useSuiLink } from "../contexts/suilink-context";

const NavBar = () => {
  const { cart, removeFromCart } = useCart();

  const [isLinkWalletOpen, setIsLinkWalletOpen] = useState(false);
  const [navCart, setCart] = useState<typeof cart>([]);
  const router = useRouter();
  const [depositAmount, setDepositAmount] = useState<number>(0);
  const [actualDepositAmount, setActualDepositAmount] = useState<number>(0);
  useEffect(() => {
    const saved = window?.localStorage?.getItem("deposit");
    console.log("saved", saved);
    if (saved) {
      console.log("saved", saved);
      setActualDepositAmount(Number(JSON.parse(saved)));
    }
  }, [actualDepositAmount]);

  const handleDepositChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    setDepositAmount(value);
  };

  const isConnected = false;

  const { mutate: signAndExecuteTransaction } = useSignAndExecuteTransaction();
  const currentAccount = useCurrentAccount();
  const {suiName,fetch} = useSuiLink();
  const deposit_tournament = async (): Promise<void> => {
    const id = toast.loading("Depositing...");

    try {

      const tx = new Transaction();
      const coin = await coinWithBalance({ balance: depositAmount * (10 ** 9)});
      tx.moveCall({
        target:
          "0xf056c2631c508f5a6cf47c9da889da1c5ab7f9978da5fbe6078cfaf64caa3dbc::riptide::deposit_to_treasury",
        typeArguments: ["0x2::sui::SUI"],
        arguments: [
          tx.object(
            "0x03850d31b9c0d2a5302be53574c5f7fd634e4ab2c7a7ac4cf48d0876d569b154"
          ),
          tx.pure.string("@happy"),
          tx.object(coin),
        ],
      });

      if (!currentAccount?.address) {
        throw new Error("No wallet connected");
      }
      tx.setSender(currentAccount.address);
      const serializedTx = await tx.serialize();
      await signAndExecuteTransaction(
        { transaction: serializedTx },
        {
          onSuccess: (result: any) => {
            updateLocalStorageDeposit(depositAmount);
            console.log("Transaction executed:", result);
          },
          onError: (error: any) => {
            console.error("Transaction failed:", error);
            toast.error("Transaction failed", { id });
          },
        }
      );
      
      toast.success(`Deposited ${depositAmount} SUI`, { id });

    } catch (error) {
      console.error("Deposit error:", error);
      toast.error(error instanceof Error ? error.message : "Error depositing", {
        id,
      });
    }
  };

  const updateLocalStorageDeposit = (amount: number): void => {
    const currentDeposit = localStorage.getItem("deposit");
    const newAmount = currentDeposit
      ? (Number(JSON.parse(currentDeposit)) + amount)
      : amount;
    localStorage.setItem("deposit", JSON.stringify(newAmount));
    setActualDepositAmount(newAmount*10**9);
  };

  return (
    <>
      <nav className="border-b">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              
              <Link
                href="/"
                className="text-2xl font-bold text-primary mr-8 logo text-blue-500"
              >
                RipTide
              </Link>
              <div className="hidden md:flex space-x-4">
                <Link
                  href="/games"
                  className="text-muted-foreground hover:text-primary px-3 py-2 rounded-md text-sm font-medium"
                >
                  Games
                </Link>

                <Link
                  href="/nft-mint"
                  className="text-muted-foreground hover:text-primary px-3 py-2 rounded-md text-sm font-medium"
                >
                  Create Private Club
                </Link>

                <Link
                  href="/private-rooms"
                  className="text-muted-foreground hover:text-primary px-3 py-2 rounded-md text-sm font-medium"
                >
                  Active Rooms
                </Link>
                <Link
                  href="/nft-mint"
                  className="text-muted-foreground hover:text-primary px-3 py-2 rounded-md text-sm font-medium"
                >
                  Tournament Room
                </Link>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              
              <Button variant="outline">
                <a href="/withdraw">
                  {" "}
                  <ArrowUpFromLine className="h-6 w-6" />
                </a>
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline">
                    <HandCoins className="h-6 w-6" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-80">
                  <div className="p-4">
                    {navCart.map((item) => (
                      <div
                        key={item.id}
                        className="flex justify-between items-center mb-2"
                      >
                        <div>
                          <p className="font-medium">{item.title}</p>
                        </div>
                        <p>SUI {item.price.toFixed(2)}</p>
                        <X
                          className="h-4 w-4 cursor-pointer"
                          onClick={() => removeFromCart(item.id)}
                        />
                      </div>
                    ))}
                    <div className="border-t mt-4 pt-4">
                      <div className="flex justify-between font-semibold">
                        <p>Deposit Amount:</p>
                        <p className="text-blue-400 font-mono">
                          {actualDepositAmount} SUI
                        </p>
                      </div>
                    </div>
                    <input
                      type="number"
                      value={depositAmount}
                      onChange={handleDepositChange}
                      className="w-full mt-4 p-2 border border-gray-300 rounded-md"
                    />
                    <Button
                      onClick={deposit_tournament}
                      className="w-full mt-4"
                    >
                      Deposit
                    </Button>
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>
              <Dialog
                open={isLinkWalletOpen}
                onOpenChange={setIsLinkWalletOpen}
              >
                <DialogTrigger asChild>
                  <Button
                    variant="default"
                    className={isConnected ? "bg-emerald-800" : ""}
                  >
                    {currentAccount?.address
                      ? `${suiName}`
                      : "Link Wallet"}
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <TronlinkCard />
                </DialogContent>
              </Dialog>
              {currentAccount?.address ? (
                <Button
                  onClick={() => {
                    router.push("/dashboard");
                  }}
                  variant="secondary"
                  className="rounded-full"
                >
                  <CircleUser className="h-5 w-5" />
                  <span className="sr-only">Toggle user menu</span>
                </Button>
              ) : null}

              <div className="md:hidden">
                <Button variant="outline" size="icon">
                  <MenuIcon className="h-6 w-6" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default NavBar;
