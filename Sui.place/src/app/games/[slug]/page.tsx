"use client";
import { notFound } from "next/navigation";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import NavBar from "@/components/ui/navbar";
import Footer from "@/components/ui/footer";
import { useGameProducts } from "@/components/contexts/developer-game-products-context";
import Roulette from "@/components/Roulette";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
export default function GameDetailsPage({
  params,
}: {
  params: { slug: string };
}) {
  const { products, loading } = useGameProducts();
  const [heads, setHeads] = useState(0);
  const [tails, setTails] = useState(0);
  const router = useRouter();
  const [isFlipping, setIsFlipping] = useState(false);
  const [animation, setAnimation] = useState("");
  const [yesAmount, setYesAmount] = useState(0);
  const [noAmount, setNoAmount] = useState(0);
  const [actualDepositAmount, setActualDepositAmount] = useState(0);
  const totalAmount = yesAmount + noAmount;
  const yesPercentage = totalAmount > 0 ? (yesAmount / totalAmount) * 100 : 0;
  const noPercentage = totalAmount > 0 ? (noAmount / totalAmount) * 100 : 0;
  const [bets, setBets] = useState([]);

  useEffect(() => {
    // Load bets from local storage on component mount
    const storedBets = JSON.parse(localStorage.getItem("bets")) || [];
    setBets(storedBets);
  }, []);

 
  const delay = async (ms: number) => new Promise((res) => setTimeout(res, ms));
  const handleFlip = () => {
    if (isFlipping) return;

    const isHeads = Math.random() < 0.5;
    setIsFlipping(true);
    setAnimation(isHeads ? "spin-heads" : "spin-tails");

    setTimeout(() => {
      setAnimation("");
      if (isHeads) {
        setHeads((prev) => prev + 1);
      } else {
        setTails((prev) => prev + 1);
      }
      setIsFlipping(false);
    }, 3000);
  };
  useEffect(() => {
    const saved = window?.localStorage?.getItem("deposit");
    console.log(saved);
    if (saved) {
      setActualDepositAmount(Number(JSON.parse(saved)) ? Number(JSON.parse(saved)) : 0);
    }
  }, []);
  const handleSuiDepositAmount = async (amt: number) => {
    let id = toast.loading("Depositing SUI...");
    if (actualDepositAmount > amt) {
      let updateAmount = actualDepositAmount - amt;
      localStorage.setItem("deposit", JSON.stringify(updateAmount));
      setActualDepositAmount(updateAmount);
      await delay(2000);

      const selectedOption = document.querySelector(
        'input[name="radio"]:checked'
      )?.id;
      if (!selectedOption) {
        alert("Please select Head or Tail!");
        return;
      }

      const newBet = {
        user: "karan.riptide.sui", // Replace with dynamic user data if needed
        amount: `${amt} Sui`,
        result:
          selectedOption.charAt(0).toUpperCase() + selectedOption.slice(1), // Capitalize
      };

      // Update local storage
      const updatedBets = [...bets, newBet];
      localStorage.setItem("bets", JSON.stringify(updatedBets));
      setBets(updatedBets); // Update state to re-render table

      handleFlip();
      toast.success("Bet Placed successfully", { id });
      let flipId = toast.loading("Flipping the coin...");

      await delay(3000);
      const isHeads = Math.random() < 0.6;
      if (
        (isHeads && selectedOption === "heads") ||
        (!isHeads && selectedOption === "tails")
      ) {
        toast.success("Bet won", { id: flipId });
      } else {
        toast.error("Bet lost", { id: flipId });
      }
      router.push("/games/1");
    } else {
      toast.error("Insufficient SUI balance",{id});
    }
  };

  const games: { [key: string]: Game } = products
    .map((game) => ({
      [game.id]: game,
    }))
    .reduce((acc, game) => ({ ...acc, ...game }), {});
  const game = games[params.slug];
  if (loading) {
    return <div>Loading...</div>;
  }
  if (!game) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-background">
      <NavBar />

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8 justify-center">
          {params.slug === "3" && <Roulette />}
          {params.slug === "2" && (
            <>
              <div className="my-10 w-1/3">
                <div className="mt-2 flex flex-col items-start rounded-md border border-gray-100 bg-white px-4 pt-3 pb-6 shadow-lg">
                  <strong className="block text-lg font-medium">
                    Pool Analytics
                  </strong>

                  <p className="mt-4">
                    <span className="text-gray-400">Yes Invested:</span>{" "}
                    <span className="text-gray-800 font-bold">
                      Sui {yesAmount}
                    </span>
                  </p>

                  <p className="mt-4">
                    <span className="text-gray-400">Down Invested:</span>{" "}
                    <span className="text-gray-800 font-bold">
                      Sui {noAmount}
                    </span>
                  </p>

                  <p className="mt-4">
                    <span className="text-gray-400">Bet Amount:</span>{" "}
                    <span className="text-gray-800 font-bold"></span>
                  </p>

                  <div className="mt-4 flex w-full items-center text-xs text-gray-400">
                    UP
                    <div className="ml-4 h-4 overflow-hidden rounded-md bg-gray-100 w-full">
                      <div
                        style={{ width: `${yesPercentage}%` }}
                        className="h-full bg-green-400"
                      ></div>
                    </div>
                  </div>

                  <div className="mt-4 flex w-full items-center text-xs text-gray-400">
                    NO
                    <div className="ml-4 h-4  overflow-hidden rounded-md bg-gray-100 w-full">
                      <div
                        style={{ width: `${noPercentage}%` }}
                        className="h-full bg-red-400"
                      ></div>
                    </div>
                  </div>
                </div>

                <div className="mt-8 flex flex-col items-center justify-center rounded-md border border-gray-100 bg-white px-4 pt-3 pb-6 shadow-lg">
                  <div
                    onClick={() => {
                      let depositAmount = JSON.parse(
                        localStorage.getItem("deposit")
                      );
                      if (depositAmount) {
                        depositAmount = depositAmount - 1000000;
                        setYesAmount(yesAmount + 1000000);
                        localStorage.setItem(
                          "deposit",
                          JSON.stringify(depositAmount)
                        );
                        toast.success("Bet placed successfully");
                      } else {
                        toast.error("Insufficient balance");
                      }
                    }}
                    className="px-2 py-2 w-20 h-20 text-xl rounded-full bg-green-400 shadow-lg uppercase cursor-pointer flex justify-center items-center font-bold"
                  >
                    Up{" "}
                  </div>

                  <div className="px-2 py-2 mt-4 rounded-md w-full h-[40%] border shadow-lg">
                    <div className="max-w-md rounded-lg px-6 pt-6 pb-10 ">
                      <div className="inline-block rounded-full  bg-emerald-200 p-2 text-emerald-500">
                        <img src="https://assets.coingecko.com/coins/images/26375/standard/sui-ocean-square.png?1727791290" />
                      </div>

                      <p className="text-sm font-bold text-gray-500">Price</p>
                      <p className="text-4xl text-gray-800 font-bold">
                        3.30000$
                      </p>
                      <span className="float-right rounded-full bg-rose-100 px-1 text-sm font-medium text-rose-600">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="inline h-4 w-4 pb-0.5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          stroke-width="2"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M17 13l-5 5m0 0l-5-5m5 5V6"
                          />
                        </svg>
                        3%
                      </span>
                    </div>
                  </div>

                  <div
                    onClick={() => {
                      let depositAmount = JSON.parse(
                        localStorage.getItem("deposit")
                      );
                      if (depositAmount) {
                        depositAmount = depositAmount - 1000000;
                        setNoAmount(noAmount + 1000000);
                        localStorage.setItem(
                          "deposit",
                          JSON.stringify(depositAmount)
                        );
                        toast.success("Bet placed successfully");
                      } else {
                        toast.error("Insufficient balance");
                      }
                    }}
                    className="px-2  py-2 w-20 h-20 text-xl  rounded-full bg-red-400 items-center shadow-lg mt-4 cursor-pointer flex justify-center font-bold"
                  >
                    Down{" "}
                  </div>
                </div>
              </div>
            </>
          )}
          {params.slug === "1" && (
            <div className="flex w-[90%] gap-8">
              <div className="w-2/3">
                <h1 className="text-3xl font-bold text-primary mb-2">
                  Coin Flip
                </h1>
                <div className="container-coin">
                  <div className={`coin ${animation}`} id="coin">
                    <div className="heads">
                      <img
                        src="https://live.staticflickr.com/227/1491049183_4fe2ede120_w.jpg"
                        alt="Heads"
                      />
                    </div>
                    <div className="tails">
                      <img
                        src="https://media.istockphoto.com/id/486748452/vector/united-states-currency-nickel-coin.jpg?s=612x612&w=0&k=20&c=9ey7MC3ayRWgpO9vqhF5cfYRcXelYvhkNisNyIfTUJE="
                        alt="Tails"
                      />
                    </div>
                  </div>
                  <p className="font-medium mb-1 text-gray-500">
                    Choose Option?
                  </p>
                  <div className="flex gap-x-4 mt-8 mb-4">
                    <div className="relative">
                      <input
                        type="radio"
                        name="radio"
                        id="head"
                        className="peer hidden"
                      />
                      <label
                        className="peer-checked:border-blue-400 peer-checked:bg-blue-200 relative cursor-pointer rounded-xl border px-4 py-3"
                        htmlFor="head"
                      >
                        Head
                      </label>
                    </div>
                    <div className="relative">
                      <input
                        type="radio"
                        name="radio"
                        id="tail"
                        className="peer hidden"
                      />
                      <label
                        className="peer-checked:border-blue-400 peer-checked:bg-blue-200 relative cursor-pointer rounded-xl border px-4 py-3"
                        htmlFor="tail"
                      >
                        Tail
                      </label>
                    </div>
                  </div>

                  <div className="grid grid-cols-4 mt-3">
                    {[2, 1, 0.5, 3].map((amount) => (
                      <Button
                        key={amount}
                        onClick={() => handleSuiDepositAmount(amount)}
                      >
                        {amount} Sui
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
              <div className="w-2/3">
                <div className="container mx-auto px-4 sm:px-8">
                  <div className="py-4 overflow-x-auto">
                    <div className="inline-block min-w-full shadow-md rounded-lg overflow-hidden">
                      <table className="min-w-full leading-normal">
                        <thead>
                          <tr>
                            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                              User
                            </th>
                            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                              Amount
                            </th>
                            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                              Result
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {bets.map((bet, index) => (
                            <tr key={index}>
                              <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                <p className="font-extrabold whitespace-no-wrap text-blue-500">
                                  {bet.user}
                                </p>
                              </td>
                              <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                <p className="text-green-600 whitespace-no-wrap">
                                  {bet.amount}
                                </p>
                              </td>
                              <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                <span className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
                                  <span className="relative">{bet.result}</span>
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
