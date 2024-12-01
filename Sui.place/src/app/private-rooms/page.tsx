"use client";

import NavBar from "@/components/ui/navbar";
import React, { useState, useEffect } from "react";
import {
  ConnectButton,
  useAccounts,
  useCurrentWallet,
  useSignPersonalMessage,
  useCurrentAccount,
} from "@mysten/dapp-kit";
import { useRouter } from "next/navigation";
const page = () => {
  const [activeRooms, setActiveRooms] = useState([]);
  const router = useRouter();
  useEffect(() => {
    const rooms = JSON.parse(localStorage.getItem("rooms") || "[]");

    console.log(rooms);
    setActiveRooms(rooms);
  }, []);

  const { mutate: signPersonalMessage } = useSignPersonalMessage();
  const [message, setMessage] = useState("Join Room");

  return (
    <>
      <NavBar />
      <div>
        <section className="py-12 bg-background">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-extrabold text-primary mb-6">
              Active Rooms
            </h2>
            <div className="grid grid-cols-3">
              {activeRooms.map((room: any, id: any) => {
                return (
                  <>
                    <div className="mx-auto shadow-2xl my-10 flex max-w-xs flex-col items-center rounded-xl border px-4 py-4 text-center md:max-w-lg md:flex-row md:items-start md:text-left">
                      <div className="">
                        <div className="flex justify-between">
                          <p className="text-md font-bold text-gray-700">
                            {room.nftName}
                          </p>
                          <span className="ml-2 mr-3 uppercase font-bold whitespace-nowrap text-xs rounded-full bg-purple-100 px-2 py-1 text-purple-800">
                            {room.selectedCommunity}
                          </span>
                        </div>
                        <div className="flex justify-between mt-8">
                          <span className="uppercase font-bold whitespace-nowrap text-xs rounded-full bg-yellow-100 px-2 py-1 text-black">
                            {room.poolAmount} Sui
                          </span>
                          <span className="ml-2 mr-3 uppercase font-bold whitespace-nowrap text-xs rounded-full bg-red-100 px-2 py-1 text-red-500">
                            {room.selectedGame}
                          </span>
                          <span className="ml-2 mr-3 uppercase font-bold whitespace-nowrap text-xs rounded-full bg-blue-100 px-2 py-1 text-blue-500">
                            {room.winnerSelection}
                          </span>
                        </div>

                        <div className="flex space-x-2 mt-8">
                          <div className="flex flex-col items-center rounded-xl bg-gray-100 px-4 py-2">
                            <p className="text-sm font-medium text-gray-500">
                              Members
                            </p>
                            <p className="text-3xl font-medium text-gray-600">
                              13
                            </p>
                          </div>
                          <div className="flex flex-col items-center rounded-xl bg-gray-100 px-4 py-2">
                            <p className="text-sm font-medium text-gray-500">
                              Papers
                            </p>
                            <p className="text-3xl font-medium text-gray-600">
                              7
                            </p>
                          </div>
                          <div className="flex flex-col items-center rounded-xl bg-gray-100 px-4 py-2">
                            <p className="text-sm font-medium text-gray-500">
                              Pool
                            </p>
                            <p className="text-3xl font-medium text-gray-600">
                              124
                            </p>
                          </div>
                          <div className=""></div>
                        </div>

                        <p className="mb-4 text-sm font-medium text-gray-500 mt-4 px-1">
                          {room.nftDescription}
                        </p>
                        <div className="mb-3"></div>
                        <div className="flex flex-col space-y-2">
                          {/* <input
                            type="text"
                            className="w-full rounded-lg border-2 border-transparent bg-gray-100 px-4 py-2 font-medium text-gray-500"
                            placeholder="Enter Room ID"
                          /> */}
                          <button
                            onClick={() => {
                              signPersonalMessage({
                                message: new TextEncoder().encode(message),
                              });
                              if (room.selectedGame === "coin_flip") {
                                router.push("/games/1");
                              } else if (room.selectedGame === "roulette") {
                                router.push("/games/3");
                              }else if(room.selectedGame === "prediction"){
                                router.push("/games/2");
                              }else if(room.selectedGame === "snake_game"){
                                router.push("/games/4");
                              }
                            }}
                            className="w-full rounded-lg border-2 border-transparent bg-blue-600 px-4 py-2 font-medium text-white"
                          >
                            Join Room
                          </button>
                        </div>
                      </div>
                    </div>
                  </>
                );
              })}
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default page;
