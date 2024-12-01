"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SearchIcon, FilterIcon } from "lucide-react";
import NavBar from "@/components/ui/navbar";
import { GameCard } from "@/components/blocks/game-card";
// import { PLACEHOLDER_GAMES } from "@/components/assets/placeholder-database";
import Footer from "@/components/ui/footer";
import { useGameProducts } from "@/components/contexts/developer-game-products-context";

// This would typically come from an API or database

export default function GamesListingPage() {
  const { products, loading } = useGameProducts();
  const [games, setGames] = useState<Game[]>([]);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("all");
  const [sortBy, setSortBy] = useState("popularity");
  useEffect(() => {
    setGames(products);
  }, [loading]);

  useEffect(() => {
    let filteredGames = [...products];

    // Apply search filter
    if (searchTerm) {
      filteredGames = filteredGames.filter(
        (game) =>
          game.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          game.tags.some((tag) =>
            tag.toLowerCase().includes(searchTerm.toLowerCase())
          )
      );
    }

    // Apply genre filter
    if (selectedGenre !== "all") {
      filteredGames = filteredGames.filter(
        (game) => game.genre.toLowerCase() === selectedGenre.toLowerCase()
      );
    }

    // Apply sorting
    switch (sortBy) {
      case "price-low":
        filteredGames.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        filteredGames.sort((a, b) => b.price - a.price);
        break;
      case "name":
        filteredGames.sort((a, b) => a.title.localeCompare(b.title));
        break;
      // For "popularity", we'll keep the original order as a proxy for popularity
      default:
        break;
    }

    setGames(filteredGames);
  }, [searchTerm, selectedGenre, sortBy]);

  return (
    <div className="min-h-screen bg-background">
      <NavBar />

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-primary mb-6">Browse Games</h1>

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 space-y-4 md:space-y-0">
          <div className="flex items-center w-full md:w-auto">
            <Input
              type="search"
              placeholder="Search games..."
              className="mr-2"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Button variant="outline" size="icon">
              <SearchIcon className="h-4 w-4" />
            </Button>
          </div>
          <div className="flex items-center space-x-2 w-full md:w-auto">
            <Select value={selectedGenre} onValueChange={setSelectedGenre}>
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Genre" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Genres</SelectItem>
                <SelectItem value="rpg">RPG</SelectItem>
                <SelectItem value="mmorpg">MMORPG</SelectItem>
                <SelectItem value="strategy">Strategy</SelectItem>
                <SelectItem value="racing">Racing</SelectItem>
                <SelectItem value="simulation">Simulation</SelectItem>
                <SelectItem value="roguelike">Roguelike</SelectItem>
                <SelectItem value="action">Action</SelectItem>
              </SelectContent>
            </Select>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Sort By" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="popularity">Popularity</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="name">Name</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="icon">
              <FilterIcon className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {games.map((game) => (
            <GameCard key={game.id} game={game} />
          ))}
        </div>

        {games.length === 0 && (
          <div className="text-center mt-8">
            <p className="text-lg text-muted-foreground">No games found.</p>
          </div>
        )}

        <div className="mt-8 flex justify-center">
          <Button variant="outline" className="mr-2">
            Previous
          </Button>
          <Button variant="outline">Next</Button>
        </div>
      </main>

      <Footer />
    </div>
  );
}
