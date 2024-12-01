

export const USERS: Player.PlayerData[] = [
  {
    id: 1,
    name: "CryptoGamer",
    bio: "An avid gamer who loves exploring the world of crypto.",
    nfts: [
      {
        id: 1,
        name: "Crypto Sword",
        description: "A legendary sword with mystical powers.",
        image: "https://example.com/crypto-sword.png",
        game: "Crypto Legends"
      }
    ],
    games: ["Crypto Legends"],
    achievements: [
      {
        id: 1,
        name: "Legendary Sword Owner",
        description: "Awarded for owning the legendary Crypto Sword.",
        date_achieved: "2023-01-01"
      }
    ]
  },
  {
    id: 2,
    name: "NFTMaster",
    bio: "Master of NFTs and collector of rare items.",
    nfts: [
      {
        id: 2,
        name: "Ethereal Mount",
        description: "A rare mount from the Ethereal Realms.",
        image: "https://example.com/ethereal-mount.png",
        game: "Ethereal Realms"
      }
    ],
    games: ["Ethereal Realms"],
    achievements: [
      {
        id: 2,
        name: "Ethereal Mount Tamer",
        description: "Awarded for taming the Ethereal Mount.",
        date_achieved: "2023-02-01"
      }
    ]
  },
  {
    id: 3,
    name: "BlockchainWarrior",
    bio: "A warrior in the blockchain battles.",
    nfts: [
      {
        id: 3,
        name: "Commander Armor",
        description: "Armor worn by the top commander.",
        image: "https://example.com/commander-armor.png",
        game: "Blockchain Battles"
      }
    ],
    games: ["Blockchain Battles"],
    achievements: [
      {
        id: 3,
        name: "Top Commander",
        description: "Awarded for being the top commander.",
        date_achieved: "2023-03-01"
      }
    ]
  },
  {
    id: 4,
    name: "PixelExplorer",
    bio: "Exploring the pixel dungeons one step at a time.",
    nfts: [
      {
        id: 4,
        name: "Dungeon Key",
        description: "A key to unlock hidden dungeons.",
        image: "https://example.com/dungeon-key.png",
        game: "Pixel Dungeons"
      }
    ],
    games: ["Pixel Dungeons"],
    achievements: [
      {
        id: 4,
        name: "Dungeon Master",
        description: "Awarded for mastering the pixel dungeons.",
        date_achieved: "2023-04-01"
      }
    ]
  }
];


// export const PLACEHOLDER_GAMES: Game[] = [
//   {
//     title: "Crypto Legends",
//     price: 19.99,
//     genre: "RPG",
//     description: "An epic RPG set in the world of blockchain.",
//     nftRewards: [
//       { name: "Legendary Sword", description: "A powerful sword with unique abilities." },
//       { name: "Dragon Egg", description: "A rare egg that can hatch into a dragon." }
//     ],
//     images: ["/placeholder.svg?height=225&width=400"],
//     tags: ["Blockchain", "Fantasy", "Multiplayer"],
//     rating: 4.5,
//     reviews: [
//       {
//         id: 1,
//         user: "Gamer123",
//         avatar: "/avatar1.png",
//         rating: 5,
//         comment: "Amazing game with great NFT rewards!"
//       }
//     ],
//     systemRequirements: {
//       os: "Windows 10",
//       processor: "Intel i5",
//       memory: "8 GB RAM",
//       graphics: "NVIDIA GTX 970",
//       storage: "50 GB available space"
//     },
//     developerData: {
//       name: "Crypto Studios",
//       wallet_address: "TRiNL4y9JUatnMF5hh7TipKJGK7m7aWepq"
//     }
//   },
//   {
//     id: "ethereal-realms",
//     title: "Ethereal Realms",
//     price: 24.99,
//     genre: "MMORPG",
//     description: "A vast open world MMORPG with endless possibilities.",
//     nftRewards: [
//       { name: "Mystic Staff", description: "A staff imbued with mystical powers." },
//       { name: "Ethereal Mount", description: "A mount that can traverse ethereal planes." }
//     ],
//     images: ["/placeholder.svg?height=225&width=400"],
//     tags: ["Open World", "PvP", "Crafting"],
//     rating: 4.7,
//     reviews: [
//       {
//         id: 2,
//         user: "MMOlover",
//         avatar: "/avatar2.png",
//         rating: 4,
//         comment: "Great game, but needs more endgame content."
//       }
//     ],
//     systemRequirements: {
//       os: "Windows 10",
//       processor: "Intel i7",
//       memory: "16 GB RAM",
//       graphics: "NVIDIA GTX 1080",
//       storage: "100 GB available space"
//     },
//     developerData: {
//       name: "Crypto Studios",
//       wallet_address: "TGEZ3a9WQb7DCmzud3Ni167icUonVXKNK9"
//     }
//   },
//   {
//     id: "blockchain-battles",
//     title: "Blockchain Battles",
//     price: 14.99,
//     genre: "Strategy",
//     description: "A strategic game where you battle for blockchain supremacy.",
//     nftRewards: [
//       { name: "Rare Commander", description: "A commander with unique strategic abilities." },
//       { name: "Resource Node", description: "A node that generates valuable resources." }
//     ],
//     images: ["/placeholder.svg?height=225&width=400"],
//     tags: ["Turn-based", "Multiplayer", "Esports"],
//     rating: 4.3,
//     reviews: [
//       {
//         id: 3,
//         user: "Strategist",
//         avatar: "/avatar3.png",
//         rating: 4,
//         comment: "Challenging and fun, but can be a bit slow at times."
//       }
//     ],
//     systemRequirements: {
//       os: "Windows 10",
//       processor: "Intel i5",
//       memory: "8 GB RAM",
//       graphics: "NVIDIA GTX 960",
//       storage: "30 GB available space"
//     },
//     developerData: {
//       name: "Crypto Studios",
//       wallet_address: "TRiNL4y9JUatnMF5hh7TipKJGK7m7aWepq"
//     }
//   },
//   {
//     id: "nft-racer",
//     title: "NFT Racer",
//     price: 29.99,
//     genre: "Racing",
//     description: "A fast-paced racing game with NFT rewards.",
//     nftRewards: [
//       { name: "Exotic Car", description: "A car with unique performance attributes." },
//       { name: "Legendary Driver", description: "A driver with exceptional skills." }
//     ],
//     images: ["/placeholder.svg?height=225&width=400"],
//     tags: ["Fast-paced", "Customization", "Tournaments"],
//     rating: 4.8,
//     reviews: [
//       {
//         id: 4,
//         user: "Speedster",
//         avatar: "/avatar4.png",
//         rating: 5,
//         comment: "Best racing game I've ever played!"
//       }
//     ],
//     systemRequirements: {
//       os: "Windows 10",
//       processor: "Intel i7",
//       memory: "16 GB RAM",
//       graphics: "NVIDIA GTX 1070",
//       storage: "40 GB available space"
//     },
//     developerData: {
//       name: "Crypto Studios",
//       wallet_address: "TRiNL4y9JUatnMF5hh7TipKJGK7m7aWepq"
//     }
//   },
//   {
//     id: "crypto-tycoon",
//     title: "Crypto Tycoon",
//     price: 9.99,
//     genre: "Simulation",
//     description: "A simulation game where you build your crypto empire.",
//     nftRewards: [
//       { name: "Unique Building", description: "A building with special attributes." },
//       { name: "Tycoon Avatar", description: "An avatar that represents your tycoon status." }
//     ],
//     images: ["/placeholder.svg?height=225&width=400"],
//     tags: ["Economy", "Management", "Sandbox"],
//     rating: 4.1,
//     reviews: [
//       {
//         id: 5,
//         user: "SimFan",
//         avatar: "/avatar5.png",
//         rating: 4,
//         comment: "Fun and addictive, but could use more features."
//       }
//     ],
//     systemRequirements: {
//       os: "Windows 10",
//       processor: "Intel i3",
//       memory: "4 GB RAM",
//       graphics: "NVIDIA GTX 750",
//       storage: "20 GB available space"
//     },
//     developerData: {
//       name: "Crypto Studios",
//       wallet_address: "TRiNL4y9JUatnMF5hh7TipKJGK7m7aWepq"
//     }
//   },
//   {
//     id: "pixel-dungeons",
//     title: "Pixel Dungeons",
//     price: 4.99,
//     genre: "Roguelike",
//     description: "A retro-style roguelike game with procedural dungeons.",
//     nftRewards: [
//       { name: "Epic Weapon", description: "A weapon with epic stats." },
//       { name: "Dungeon Key", description: "A key to unlock hidden dungeons." }
//     ],
//     images: ["/placeholder.svg?height=225&width=400"],
//     tags: ["Retro", "Procedural", "Permadeath"],
//     rating: 4.6,
//     reviews: [
//       {
//         id: 6,
//         user: "RetroGamer",
//         avatar: "/avatar6.png",
//         rating: 5,
//         comment: "Love the retro feel and challenging gameplay!"
//       }
//     ],
//     systemRequirements: {
//       os: "Windows 10",
//       processor: "Intel i3",
//       memory: "4 GB RAM",
//       graphics: "NVIDIA GTX 750",
//       storage: "10 GB available space"
//     },
//     developerData: {
//       name: "Crypto Studios",
//       wallet_address: "TRiNL4y9JUatnMF5hh7TipKJGK7m7aWepq"
//     }
//   },
//   {
//     id: "astro-miners",
//     title: "Astro Miners",
//     price: 12.99,
//     genre: "Simulation",
//     description: "A space simulation game where you mine asteroids.",
//     nftRewards: [
//       { name: "Rare Mineral", description: "A mineral with high value." },
//       { name: "Space Station Module", description: "A module to expand your space station." }
//     ],
//     images: ["/placeholder.svg?height=225&width=400"],
//     tags: ["Space", "Resource Management", "Exploration"],
//     rating: 4.4,
//     reviews: [
//       {
//         id: 7,
//         user: "SpaceExplorer",
//         avatar: "/avatar7.png",
//         rating: 4,
//         comment: "Great game for space enthusiasts!"
//       },
//     ],
//     systemRequirements: {
//       os: "Windows 10",
//       processor: "Intel i5",
//       memory: "8 GB RAM",
//       graphics: "NVIDIA GTX 960",
//       storage: "25 GB available space"
//     },
//     developerData: {
//       name: "Crypto Studios",
//       wallet_address: "TRiNL4y9JUatnMF5hh7TipKJGK7m7aWepq"
//     }
//   },
//   {
//     id: "cyber-samurai",
//     title: "Cyber Samurai",
//     price: 34.99,
//     genre: "Action",
//     description: "An action-packed game set in a cyberpunk world.",
//     nftRewards: [
//       { name: "Cybernetic Implant", description: "An implant that enhances abilities." },
//       { name: "AI Companion", description: "An AI companion to assist in battles." }
//     ],
//     images: ["/placeholder.svg?height=225&width=400"],
//     tags: ["Cyberpunk", "Martial Arts", "Story-driven"],
//     rating: 4.9,
//     reviews: [
//       {
//         id: 8,
//         user: "ActionHero",
//         avatar: "/avatar8.png",
//         rating: 5,
//         comment: "Incredible action and storyline!"
//       },
      
//     ],
//     systemRequirements: {
//       os: "Windows 10",
//       processor: "Intel i7",
//       memory: "16 GB RAM",
//       graphics: "NVIDIA GTX 1080",
//       storage: "60 GB available space"
//     },
//     developerData: {
//       name: "Crypto Studios",
//       wallet_address: "TRiNL4y9JUatnMF5hh7TipKJGK7m7aWepq"
//     }
//   }
// ];
