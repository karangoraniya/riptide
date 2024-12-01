"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  CopyIcon,
  EditIcon,
  ImageIcon,
  ShareIcon,
  TrophyIcon,
} from "lucide-react";
import NavBar from "@/components/ui/navbar";

// interface NFT {
//   id: number;
//   name: string;
//   description: string;
//   image: string;
//   game: string;
// }

// interface Achievement {
//   id: number;
//   name: string;
//   description: string;
//   date_achieved: string;
// }

// interface PlayerData {
//   name: string;
//   bio: string;
//   nfts: NFT[];
//   achievements: Achievement[];
// }

// NFT component
const NFTCard = ({ nft }: { nft: Player.NFT }) => (
  <Card className="w-full">
    <CardHeader>
      <CardTitle className="text-lg">{nft.name}</CardTitle>
    </CardHeader>
    <CardContent>
      <div className="aspect-square relative">
        <img
          src={nft.image}
          alt={nft.name}
          className="object-cover rounded-lg"
        />
      </div>
      <p className="mt-2 text-sm text-muted-foreground">{nft.description}</p>
    </CardContent>
    <CardFooter className="flex justify-between">
      <Badge variant="secondary">{nft.game}</Badge>
      <Button variant="outline" size="sm">
        View Details
      </Button>
    </CardFooter>
  </Card>
);

// Achievement component
const AchievementCard = ({
  achievement,
}: {
  achievement: Player.Achievement;
}) => (
  <Card>
    <CardContent className="flex items-center p-4">
      <TrophyIcon className="w-8 h-8 text-yellow-400 mr-4" />
      <div>
        <h3 className="font-semibold">{achievement.name}</h3>
        <p className="text-sm text-muted-foreground">
          {achievement.description}
        </p>
      </div>
    </CardContent>
  </Card>
);

// Edit Profile Dialog
interface EditProfileDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (name: string, bio: string) => void;
  initialName: string;
  initialBio: string;
}

const EditProfileDialog: React.FC<EditProfileDialogProps> = ({
  isOpen,
  onClose,
  onSave,
  initialName,
  initialBio,
}) => {
  const [name, setName] = useState<string>(initialName);
  const [bio, setBio] = useState<string>(initialBio);

  useEffect(() => {
    setName(initialName);
    setBio(initialBio);
  }, [initialName, initialBio]);

  const handleSave = () => {
    onSave(name, bio);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="bio" className="text-right">
              Bio
            </Label>
            <Textarea
              id="bio"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          <Button onClick={handleSave}>Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

interface PlayerProfileComponentProps {
  playerId: string;
}

export function PlayerProfileComponent({
  playerId,
}: PlayerProfileComponentProps) {
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
  const [playerData, setPlayerData] = useState<Player.PlayerData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPlayerData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        // Replace this with your actual API call
        const response = await fetch(`/api/player/${playerId}`);
        if (!response.ok) {
          throw new Error("Failed to fetch player data");
        }
        const data = await response.json();
        setPlayerData(data);
      } catch (err) {
        setError("An error occurred while fetching player data");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPlayerData();
  }, [playerId]);

  const handleEditProfile = async (name: string, bio: string) => {
    try {
      // Replace this with your actual API call
      const response = await fetch(`/api/player/${playerId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, bio }),
      });

      if (!response.ok) {
        throw new Error("Failed to update profile");
      }

      setPlayerData((prevData) => {
        if (prevData) {
          return { ...prevData, name, bio };
        }
        return null;
      });
    } catch (err) {
      console.error("Failed to update profile:", err);
      // Handle error (e.g., show an error message to the user)
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error || !playerData) {
    return <div>Error: {error || "Failed to load player data"}</div>;
  }

  return (
    <div className="min-h-screen bg-background">
      <NavBar />
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Profile Information */}
          <Card className="md:col-span-1">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Profile</CardTitle>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setIsEditProfileOpen(true)}
                >
                  <EditIcon className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center">
                <Avatar className="w-32 h-32 mb-4">
                  <AvatarImage
                    src="/placeholder.svg?height=128&width=128"
                    alt={playerData.name}
                  />
                  <AvatarFallback>
                    {playerData.name.substring(0, 2)}
                  </AvatarFallback>
                </Avatar>
                <h2 className="text-2xl font-bold mb-2">{playerData.name}</h2>
                <p className="text-center text-muted-foreground mb-4">
                  {playerData.bio}
                </p>
                <div className="flex space-x-2 mb-4">
                  <Button variant="outline" size="sm">
                    <ShareIcon className="h-4 w-4 mr-2" />
                    Share Profile
                  </Button>
                  <Button variant="outline" size="sm">
                    <CopyIcon className="h-4 w-4 mr-2" />
                    Copy ID
                  </Button>
                </div>
                <div className="w-full">
                  <h3 className="font-semibold mb-2">Stats</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">
                        NFTs Owned
                      </p>
                      <p className="text-xl font-bold">
                        {playerData.nfts.length}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">
                        Achievements
                      </p>
                      <p className="text-xl font-bold">
                        {playerData.achievements.length}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* NFTs and Achievements */}
          <div className="md:col-span-2">
            <Tabs defaultValue="nfts">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="nfts">NFTs</TabsTrigger>
                <TabsTrigger value="achievements">Achievements</TabsTrigger>
              </TabsList>
              <TabsContent value="nfts">
                <Card>
                  <CardHeader>
                    <CardTitle>My NFTs</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ScrollArea className="h-[400px] pr-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {playerData.nfts.map((nft) => (
                          <NFTCard key={nft.id} nft={nft} />
                        ))}
                      </div>
                    </ScrollArea>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="achievements">
                <Card>
                  <CardHeader>
                    <CardTitle>My Achievements</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ScrollArea className="h-[400px]">
                      <div className="space-y-4">
                        {playerData.achievements.map((achievement) => (
                          <AchievementCard
                            key={achievement.id}
                            achievement={achievement}
                          />
                        ))}
                      </div>
                    </ScrollArea>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>

      <EditProfileDialog
        isOpen={isEditProfileOpen}
        onClose={() => setIsEditProfileOpen(false)}
        onSave={handleEditProfile}
        initialName={playerData.name}
        initialBio={playerData.bio}
      />
    </div>
  );
}
