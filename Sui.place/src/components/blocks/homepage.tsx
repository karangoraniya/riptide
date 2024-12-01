"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
} from "@/components/ui/card";

import {
  StarIcon,
  TrophyIcon,
  SwordIcon,
  WandIcon,
  Gamepad2Icon,
} from "lucide-react";

import { CartProvider, useCart } from "../contexts/cart-context";
import NavBar from "../ui/navbar";
import { GameCard } from "./game-card";
import { CartSummary } from "../ui/cart-summary";

import { USERS } from "../assets/placeholder-database";
import { useGameProducts } from "../contexts/developer-game-products-context";
import { Skeleton } from "../ui/skeleton";
import StoreDashboardSheet from "../buttons/store-dashboard-sheet";

function HomepageContent() {
  const [games, setGames] = useState<Game[]>([]);

  const { products, loading } = useGameProducts();

  useEffect(() => {
    const _games: Game[] =
      products.length >= 6 ? products.slice(0, 6) : products;
    setGames(_games);
  }, [loading]);

  interface GameCategory {
    id: number;
    name: string;
    icon: JSX.Element;
  }

  const gameCategories: GameCategory[] = [
    { id: 1, name: "RPG", icon: <SwordIcon className="w-8 h-8" /> },
    { id: 2, name: "Strategy", icon: <WandIcon className="w-8 h-8" /> },
    { id: 3, name: "Racing", icon: <Gamepad2Icon className="w-8 h-8" /> },
    { id: 4, name: "Simulation", icon: <Gamepad2Icon className="w-8 h-8" /> },
    { id: 5, name: "Roguelike", icon: <SwordIcon className="w-8 h-8" /> },
    { id: 6, name: "MMORPG", icon: <WandIcon className="w-8 h-8" /> },
  ];

  interface FeaturedPlayer {
    id: number;
    name: string;
    game: string;
    achievement: string;
  }

  interface PlayerReview {
    id: number;
    name: string;
    rating: number;
    comment: string;
  }

  const playerReviews: PlayerReview[] = [
    {
      id: 1,
      name: "Gamer123",
      rating: 5,
      comment:
        "Love how I can earn unique NFTs by playing! The Legendary Sword is amazing!",
    },
    {
      id: 2,
      name: "NFTEnthusiast",
      rating: 4,
      comment:
        "Great concept! Enjoying the games and the NFT rewards add extra excitement.",
    },
    {
      id: 3,
      name: "CryptoGamer",
      rating: 5,
      comment:
        "The NFTs I've earned have real value in the game. Awesome experience!",
    },
  ];
  return (
    <div className="min-h-screen bg-background">
      <NavBar />
      
      {/* Hero Section */}
      <section className="bg-muted py-12 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-extrabold text-primary sm:text-5xl md:text-6xl">
              Playground For <span className="text-purple-500">Communities</span>
            </h1>
            <p className="mt-3 max-w-md mx-auto text-base text-muted-foreground sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
              Discover games that reward your skills with unique, valuable NFTs.
              Buy, play, and earn!
            </p>
            <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
              <div className="rounded-md shadow">
                <a href="/games">
                  <Button className="w-full flex items-center justify-center px-8 py-3 text-base font-medium rounded-md text-white bg-primary hover:bg-primary/90 md:py-4 md:text-lg md:px-10">
                    Explore Games
                  </Button>
                </a>
              </div>
              <div className="mt-3 rounded-md shadow sm:mt-0 sm:ml-3">
              <StoreDashboardSheet menu_view="store">
                  <Button  variant="outline"  className="w-full flex items-center justify-center px-8 py-3 text-base font-medium rounded-md md:py-4 md:text-lg md:px-10">
                    View Eligible NFT's
                  </Button>
                </StoreDashboardSheet>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Game Categories */}
      <section className="py-12 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-primary mb-6">
            Game Categories
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {gameCategories.map((category) => (
              <Card
                key={category.id}
                className="text-center hover:shadow-lg transition-shadow"
              >
                <CardContent className="pt-6">
                  <div className="mb-2 flex justify-center">
                    {category.icon}
                  </div>
                  <h3 className="font-semibold">{category.name}</h3>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Games */}
      <section className="py-12 bg-muted">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-primary mb-6">
            Featured Games with NFT Rewards
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {true ? (
              games.map((game) => <GameCard key={game.id} game={game} />)
            ) : (
              <>
                <div className="flex flex-col space-y-3">
                  <Skeleton className="h-[125px] w-[250px] rounded-xl" />
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-[250px]" />
                    <Skeleton className="h-4 w-[200px]" />
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Featured Players */}
      <section className="py-12 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-primary mb-6">
            Featured Players
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {USERS.map((player) => (
              <Card key={player.id}>
                <CardContent className="pt-6">
                  <div className="w-20 h-20 mx-auto mb-4 bg-muted rounded-full flex items-center justify-center">
                    <span className="text-2xl font-bold">
                      {player.name.substring(0, 2)}
                    </span>
                  </div>
                  {/* <a href={"/users/" + player.id}> */}
                  <h3 className="text-xl font-semibold text-center mb-2">
                    {player.name}
                  </h3>
                  {/* </a> */}
                  <p className="text-center text-muted-foreground mb-2">
                    {player.games[0]}
                  </p>
                  <div className="flex justify-center items-center">
                    <TrophyIcon className="w-5 h-5 text-yellow-400 mr-2" />
                    <p className="text-sm font-medium">
                      {player.achievements[0].name}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Player Reviews */}
      <section className="py-12 bg-muted">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-primary mb-6">
            What Players Say
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {playerReviews.map((review) => (
              <Card key={review.id}>
                <CardContent className="pt-6">
                  <div className="flex items-center mb-4">
                    <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center mr-4">
                      <span className="font-bold">
                        {review.name.substring(0, 2)}
                      </span>
                    </div>
                    <div>
                      <h3 className="font-semibold">{review.name}</h3>
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <StarIcon
                            key={i}
                            className={`h-4 w-4 ${
                              i < review.rating
                                ? "text-yellow-400"
                                : "text-muted"
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                  <p className="text-m text-muted-foreground">
                    {review.comment}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-12 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-primary mb-6 text-center">
            How It Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card>
              <CardContent className="pt-6 text-center">
                <Gamepad2Icon className="w-12 h-12 mx-auto mb-4 text-primary" />
                <h3 className="text-xl font-semibold mb-2">1. Buy and Play</h3>
                <p className="text-muted-foreground">
                  Purchase a game from our marketplace and start playing.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6 text-center">
                <TrophyIcon className="w-12 h-12 mx-auto mb-4 text-primary" />
                <h3 className="text-xl font-semibold mb-2">2. Achieve Goals</h3>
                <p className="text-muted-foreground">
                  Complete in-game objectives and challenges to earn NFT
                  rewards.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6 text-center">
                <SwordIcon className="w-12 h-12 mx-auto mb-4 text-primary" />
                <h3 className="text-xl font-semibold mb-2">3. Collect NFTs</h3>
                <p className="text-muted-foreground">
                  Receive unique NFTs as rewards for your achievements.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-12 bg-muted">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-extrabold text-primary mb-4">
              Stay Updated
            </h2>
            <p className="text-muted-foreground mb-6">
              Subscribe to our newsletter for the latest game releases and NFT
              reward updates.
            </p>
            <form className="flex flex-col sm:flex-row gap-4">
              <Input
                type="email"
                placeholder="Enter your email"
                className="flex-grow"
              />
              <Button type="submit">Subscribe</Button>
            </form>
          </div>
        </div>
      </section>

      <CartSummary />
    </div>
  );
}

export function Homepage() {
  return (
    <CartProvider>
      <HomepageContent />
    </CartProvider>
  );
}
