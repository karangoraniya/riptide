"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

// interface Game {
//   id: number;
//   title: string;
//   image: {
//     src: string;
//   };
//   price: number;
//   genre: string;
//   nftRewards: string[];
//   tags: string[];
// }



export function GameCard({ game }) {

  return (
    <Card key={game.id}>
      <CardHeader>
        <a href={"/games/" + game.id}>
          <CardTitle>{game.title}</CardTitle>
        </a>
      </CardHeader>
      <CardContent>
        <div className="aspect-w-16 aspect-h-9 w-full overflow-hidden rounded-lg bg-muted mb-4">
          <img
            src={game?.image}
            alt={game.title}
            className="h-full w-full object-cover object-center"
          />
        </div>
        <div className="flex justify-between items-center mb-2">
          <p className="text-md font-bold text-primary">play.earn.make.comunitties</p>
        </div>
      </CardContent>
      <CardFooter>
        <a href={`/games/${game.id}`}><Button className="w-full">Play</Button></a>
      </CardFooter>
    </Card>
  );
}
