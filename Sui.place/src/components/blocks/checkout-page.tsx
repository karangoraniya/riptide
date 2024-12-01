"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Transaction } from "@mysten/sui/transactions";
import toast, { Toaster } from "react-hot-toast";
import { Label } from "@/components/ui/label";
import { SuiClient } from "@mysten/sui/client";
import React from "react";
import {
  useCurrentAccount,
  useSignAndExecuteTransaction,
} from "@mysten/dapp-kit";
import { Ed25519Keypair } from "@mysten/sui/keypairs/ed25519";

export default function EnhancedCheckoutPage() {
  const router = useRouter();
  const [depositAmount, setDepositAmount] = useState(0);
  const [withdrawAmount, setWithdrawAmount] = useState(0);
  const currentAccount = useCurrentAccount();
  useEffect(() => {
    const saved = window?.localStorage?.getItem("deposit");
    if (saved) {
      setDepositAmount(Number(JSON.parse(saved)));
    }
  }, []);

  const withdraw_Amount = async (amt: any) => {
    let id = toast.loading("Withdrawing...");

    const keyPair = Ed25519Keypair.fromSecretKey(
      process.env.NEXT_PUBLIC_PRIVATE_KEY
    );
    const client = new SuiClient({ url: " https://rpc-testnet.suiscan.xyz" });
    if (depositAmount >= amt) {
      const tx = new Transaction();
      tx.moveCall({
        target:
          "0xf056c2631c508f5a6cf47c9da889da1c5ab7f9978da5fbe6078cfaf64caa3dbc::riptide::withdraw_treasury",
        typeArguments: ["0x2::sui::SUI"],
        arguments: [
          tx.object(
            "0x03850d31b9c0d2a5302be53574c5f7fd634e4ab2c7a7ac4cf48d0876d569b154"
          ),
          tx.object(
            "0xa772e67394c18f01dbd9f49432e724435fe20142c0e3aa8f02d6768790d1c8fe"
          ),
          tx.pure.u64(amt * 10 ** 9),
          tx.pure.address(
            "0xea79685a73bf25b058a0347e26678053368d3a11e245cdd5334eb8d9f31efcf4"
          ),
        ],
      });

      const response = client.signAndExecuteTransaction({
        signer: keyPair,
        transaction: tx,
        options: {
          showEffects: true,
        },
      });

      console.log({ response });
      console.log((await response).digest);
      console.log((await response).effects);
      console.log((await response).effects?.status.error);

      const newDeposit = depositAmount - amt;
      window?.localStorage?.setItem("deposit", JSON.stringify(newDeposit));
      setDepositAmount(newDeposit);
      toast.success("Withdraw Successful");
      setWithdrawAmount(0);
    } else {
      toast.error("Insufficient funds");
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Button
        onClick={() => {
          router.push("/");
        }}
        variant="outline"
        className="mb-4"
      >
        Return to Previous Page
      </Button>
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Withdraw</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-xl items-center py-2 font-bold">
                <span>Amount You have</span>
                <span>{depositAmount} Sui</span>
              </div>
            </div>
            <div>
              <Label htmlFor="wallet-address">Your Sui Wallet Address</Label>
              <Input
                value={currentAccount?.address}
                id="wallet-address"
                disabled
                readOnly
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="amount">Enter Amount You Have To Withdraw</Label>
              <Input
                onChange={(e) => setWithdrawAmount(+e.target.value)}
                name="amount"
                id="amount"
                className="mt-1"
              />
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col items-stretch">
          <Button
            onClick={() => {
              withdraw_Amount(withdrawAmount);
            }}
            className="w-full mb-4 uppercase whitespace-normal"
          >
            Withdraw
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
