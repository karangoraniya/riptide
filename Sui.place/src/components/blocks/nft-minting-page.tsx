"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { useRouter } from 'next/navigation'
import {
  ConnectButton,
  useCurrentAccount,
  useSignAndExecuteTransaction,
} from "@mysten/dapp-kit";
import toast, { Toaster } from "react-hot-toast";
import { coinWithBalance, Transaction } from "@mysten/sui/transactions";
export function PrivateRoomPage() {
  const [nftName, setNftName] = useState("");
  const [nftDescription, setNftDescription] = useState("");
  const [poolAmount, setPoolAmount] = useState("");
  const [selectedGame, setSelectedGame] = useState("");
  const [selectedCommunity, setSelectedCommunity] = useState("");
  const [winnerSelection, setWinnerSelection] = useState("");
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };
  const { mutate: signAndExecuteTransaction } = useSignAndExecuteTransaction();
  const currentAccount = useCurrentAccount();


  const createRoom = async (nftName:string,roomName:string,gameName:string,amount:number) => {
    const id = toast.loading("Depositing...");

    try {
      const tx = new Transaction();
      // const coin = await coinWithBalance({ balance: depositAmount * 10 ** 9 });
      tx.moveCall({
        target:
          "0xf056c2631c508f5a6cf47c9da889da1c5ab7f9978da5fbe6078cfaf64caa3dbc::riptide::create_private_room",
  
        typeArguments: ["0x2::sui::SUI"],
  
        arguments: [
          tx.pure.string(nftName), //  NFT name
          tx.pure.string(roomName), // Room Name 
          tx.pure.string(gameName), // Game NAme
          tx.pure.u64(amount*(10**9)), //  amount Deposit in mist 
          tx.pure.option("u64", null), 
          tx.object("0x06"),
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
            console.log("Transaction executed:", result);
          },
          onError: (error: any) => {
            console.error("Transaction failed:", error);
            toast.error("Transaction failed", { id });
          },
        }
      );

    } catch (error) {
      console.error("Deposit error:", error);
      toast.error(error instanceof Error ? error.message : "Error depositing", {
        id,
      });
    }
  };

  const delay = async (ms: number) => new Promise((res) => setTimeout(res, ms));

  const handlePublishRoom = async () => {

    let toastId = toast.loading("Publishing room...");

    let roomId = Math.floor(Math.random() * 1000000);
    // Validate fields
    if (
      !nftName ||
      !nftDescription ||
      !poolAmount ||
      !selectedGame ||
      !selectedCommunity ||
      !winnerSelection
    ) {
      setError("All fields are required.");
      return;
    }

    setError(null);

    // Create a room object
    const roomData = {
      roomId,
      nftName,
      nftDescription,
      poolAmount,
      selectedGame,
      selectedCommunity,
      winnerSelection,
    };
    createRoom(selectedCommunity,nftName,selectedGame,Number(poolAmount));
    await delay(2000);

    // Get existing rooms from local storage or initialize an empty array
    const existingRooms = JSON.parse(localStorage.getItem("rooms") || "[]");

    // Add the new room to the array
    const updatedRooms = [...existingRooms, roomData];

    // Save the updated array back to local storage
    localStorage.setItem("rooms", JSON.stringify(updatedRooms));

    // Clear form fields
    setNftName("");
    setNftDescription("");
    setPoolAmount("");
    setSelectedGame("");
    setSelectedCommunity("");
    setWinnerSelection("");
    console.log(localStorage.getItem("rooms"));
    toast.success(`Room is Published Here is Your Room ID ${roomId}`, { id: toastId });
    router.push(`/private-rooms`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 flex flex-col items-center justify-center p-4 relative">
      <Link href="/" className="absolute top-4 left-4 md:top-8 md:left-8">
        <Button
          variant="outline"
          className="flex items-center space-x-2 bg-white hover:bg-green-50 text-green-600 border-green-200"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Back to Homepage</span>
        </Button>
      </Link>
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeIn}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <Card className="w-full bg-white shadow-xl border border-green-200">
          <CardHeader className="border-b border-green-100">
            <CardTitle className="text-2xl font-bold text-primary">
              Create Your Private Room
            </CardTitle>
            <CardDescription className="text-green-500 text-xs">
              Hope you have a nice day! If you are a holder of any community NFT,
              just play the game!
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6 space-y-4">
            <div>
              <Label htmlFor="name" className="text-green-700">
                Select Game
              </Label>
              <Select onValueChange={(value) => setSelectedGame(value)}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select Game" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="coin_flip">Coin Flip</SelectItem>
                  <SelectItem value="roulette">Roulette</SelectItem>
                  <SelectItem value="snake_game">Snake Game</SelectItem>
                  <SelectItem value="prediction">Prediction</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="name" className="text-green-700">
                Select Your NFT Community
              </Label>
              <Select onValueChange={(value) => setSelectedCommunity(value)}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select Community" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="doubleup">Doubleup</SelectItem>
                  <SelectItem value="prime_machine">Prime Machine</SelectItem>
                  <SelectItem value="rooters">Rooters</SelectItem>
                  <SelectItem value="sui_frens">Sui Frens</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="name" className="text-green-700">
                Winner Selection Method
              </Label>
              <Select onValueChange={(value) => setWinnerSelection(value)}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Winner Selection" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="top_1">Top 1</SelectItem>
                  <SelectItem value="top_5">Top 5</SelectItem>
                  <SelectItem value="top_10">Top 10</SelectItem>
                  <SelectItem value="whole_community">
                    Whole Community
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="amount" className="text-green-700">
                Amount of Pool
              </Label>
              <Input
                id="amount"
                placeholder="Amount of Pool"
                value={poolAmount}
                onChange={(e) => setPoolAmount(e.target.value)}
                className="mt-1 border-green-200 focus:border-green-400 focus:ring-green-400"
              />
            </div>

            <div>
              <Label htmlFor="name" className="text-green-700">
                Room Name
              </Label>
              <Input
                id="name"
                placeholder="Name of your Room"
                value={nftName}
                onChange={(e) => setNftName(e.target.value)}
                className="mt-1 border-green-200 focus:border-green-400 focus:ring-green-400"
              />
            </div>

            <div>
              <Label htmlFor="description" className="text-green-700">
                Description
              </Label>
              <Input
                id="description"
                placeholder="Describe your room"
                value={nftDescription}
                onChange={(e) => setNftDescription(e.target.value)}
                className="mt-1 border-green-200 focus:border-green-400 focus:ring-green-400"
              />
            </div>

            <Button
              variant="secondary"
              className="w-full bg-green-500 hover:bg-green-600 text-white"
              onClick={handlePublishRoom}
            >
              Publish Your Room
            </Button>

            {error && (
              <Alert
                variant="destructive"
                className="mt-4 bg-red-50 border-red-200 text-red-700"
              >
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
          </CardContent>
          <CardFooter className="flex justify-center border-t border-green-100 pt-6"></CardFooter>
        </Card>
      </motion.div>
    </div>
  );
}
