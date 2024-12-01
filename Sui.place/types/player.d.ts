/// <reference types="react" />

declare namespace Player {
  interface NFT {
    id: number;
    name: string;
    description: string;
    image: string;
    game: string;
  }

  interface Achievement {
    id: number;
    name: string;
    description: string;
    date_achieved: string;
  }

  interface PlayerData {
    id: number;
    name: string;
    bio: string;
    nfts: NFT[];
    games: string[];
    achievements: Achievement[];
  }
}


declare type Game = {
  id: string;
  title: string;
  price: number;
  genre: string;
  description?: string;
  nftRewards?: { name: string; description: string }[];
  images?: string[];
  tags: string[];
  rating?: number;
  reviews?: {
    id: number;
    user: string;
    avatar: string;
    rating: number;
    comment: string;
  }[];
  systemRequirements?: {
    os: string;
    processor: string;
    memory: string;
    graphics: string;
    storage: string;
  };
  developerData: {
    name: string;
    wallet_address: string;
  },
  createdAt: string;
  updatedAt?: string;
  game_id?: string;
};