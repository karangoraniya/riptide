"use client";
import Link from "next/link";
import {
  Activity,
  ArrowUpRight,
  CircleUser,
  CreditCard,
  Search,
  Users,
} from "lucide-react";
import { SuiClient } from "@mysten/sui/client";
import toast from "react-hot-toast";
import { Transaction } from "@mysten/sui/transactions";
import { Ed25519Keypair } from "@mysten/sui/keypairs/ed25519";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useSuiLink } from "../contexts/suilink-context";
import { useEffect, useState } from "react";

const transactions = [
  {
    username: "Alice",
    roomName: "Room A",
    community: "Doubleup",
    date: "2024-11-20",
    rankAchieved: 1,
  },
  {
    username: "Bob",
    roomName: "Room B",
    community: "Prime Machine",
    date: "2024-11-21",
    rankAchieved: 12,
  },
  {
    username: "Charlie",
    roomName: "Room C",
    community: "Rooters",
    date: "2024-11-22",
    rankAchieved: 13,
  },
  {
    username: "David",
    roomName: "Room D",
    community: "Sui Frens",
    date: "2024-11-23",
    rankAchieved: 3,
  },
  {
    username: "Eva",
    roomName: "Room E",
    community: "Doubleup",
    date: "2024-11-24",
    rankAchieved: 5,
  },
  {
    username: "Frank",
    roomName: "Room F",
    community: "Prime Machine",
    date: "2024-11-25",
    rankAchieved: 10,
  },
  {
    username: "Grace",
    roomName: "Room G",
    community: "Rooters",
    date: "2024-11-26",
    rankAchieved: 17,
  },
  {
    username: "Henry",
    roomName: "Room H",
    community: "Sui Frens",
    date: "2024-11-27",
    rankAchieved: 3,
  },
  {
    username: "Isabel",
    roomName: "Room I",
    community: "Doubleup",
    date: "2024-11-28",
    rankAchieved: 30,
  },
  {
    username: "Jack",
    roomName: "Room J",
    community: "Prime Machine",
    date: "2024-11-29",
    rankAchieved: 10,
  },
];

export default function Dashboard() {
  const { suiName, fetch } = useSuiLink();
  const [depositBalance, setDepositBalance] = useState(0);
  const [suiEns, setSuiEns] = useState("");
  const keyPair = Ed25519Keypair.fromSecretKey(
    "suiprivkey1qqylafxqfue6z2evsmpyavxygdavg275gf4jqdz4q5kr9xyxeshgjalw0gj"
  );
  const client = new SuiClient({ url: " https://rpc-testnet.suiscan.xyz" });
  const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));
  const subBuy = async (suiEns: string) => {
    let id = toast.loading("Buing Sub Domain on Riptide...");
    const tx = new Transaction();
    await delay(3000);
    const domain = tx.moveCall({
      target:
        "0x3c272bc45f9157b7818ece4f7411bdfa8af46303b071aca4e18c03119c9ff636::subdomains::new",
      arguments: [
        tx.object(
          "0x300369e8909b9a6464da265b9a5a9ab6fe2158a040e84e808628cde7a07ee5a3"
        ), //shared object
        tx.object(
          "0xe65d765f6c2724c36b4ad87b422e8894269d1a6297cdda79a2aac6e211cebd33"
        ), // sui ns registry

        tx.object(
          "0x6" // time
        ),
        tx.pure.string(
          `${suiEns}.riptide.sui` 
        ), 
        tx.pure.u64(
          "1764591560456" // time
        ),
        tx.pure.bool(true), // create additional subdomain
        tx.pure.bool(true),
      ],
    });

    tx.transferObjects(
      [domain],
      "0xea79685a73bf25b058a0347e26678053368d3a11e245cdd5334eb8d9f31efcf4" // receiver address
    );

    const response = client.signAndExecuteTransaction({
      signer: keyPair,
      transaction: tx,
      options: {
        showEffects: true,
      },
    });
    toast.success("Sub Domain Bought Successfully", { id });


    // const resp: any = await client.getOwnedObjects({
    //   owner:
    //     "0x83aaa821e548aa3ae84747f14bf3df4fef53718eafc5c6bfdb8cc5d67714b62a",
    //   filter: {
    //     StructType:
    //       "0x22fa05f21b1ad71442491220bb9338f7b7095fe35000ef88d5400d28523bdd93::subdomain_registration::SubDomainRegistration",
    //   },
    //   options: {
    //     showType: true,
    //     showContent: true,
    //     showDisplay: true,
    //   },
    // });
    // console.log("resp", resp);

    // // Extract domain names and handle the response
    // const extractDomainName = (response: any) => {
    //   // Check if there's data and it's an array
    //   if (!response?.data || !Array.isArray(response.data)) {
    //     return null;
    //   }

    //   // Get all domain names
    //   const domainNames: any = response.data
    //     .map(
    //       (item: {
    //         data: {
    //           content: { fields: { nft: { fields: { domain_name: any } } } };
    //         };
    //       }) => item?.data?.content?.fields?.nft?.fields?.domain_name
    //     )
    //     .filter(Boolean);

    //   // Check length
    //   console.log(`Found ${domainNames.length} domain names`);

    //   // Return first domain name if exists, otherwise null
    //   return domainNames.length > 0 ? domainNames[0] : null;
    // };

    // // Get the domain name
    // const domainName: any = extractDomainName(resp);
    // console.log("Domain Name:", domainName);

    // // If you want to see all domain names (optional)
    // const allDomainNames = resp.data
    //   ?.map(
    //     (item: {
    //       data: {
    //         content: { fields: { nft: { fields: { domain_name: any } } } };
    //       };
    //     }) => item?.data?.content?.fields?.nft?.fields?.domain_name
    //   )
    //   .filter(Boolean);
    // console.log("All Domain Names:", allDomainNames);
  };

  useEffect(() => {
    let dep = localStorage.getItem("deposit");
    if (dep) {
      dep = JSON.parse(dep);
      setDepositBalance(Number(dep));
    }
  }, []);
  return (
    <div className="flex min-h-screen w-full flex-col">
      <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
        {/* NAV BAR */}
        <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
          {/* MENU SHEET */}

          <Link
            href="/"
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            Home
          </Link>
          <Link
            href="/dashboard"
            className="text-foreground transition-colors hover:text-foreground"
          >
            Dashboard
          </Link>
        </nav>

        <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
          <form className="ml-auto flex-1 sm:flex-initial">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search trx..."
                className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]"
              />
            </div>
          </form>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary" className="rounded-full">
                <CircleUser className="h-5 w-5" />
                <span className="sr-only">Toggle user menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Support</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-md font-medium">Username</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-1xl font-bold text-blue-500">{suiName}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-md font-medium">
                Total Games Played
              </CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold text-blue-500">12</div>
            </CardContent>
          </Card>
          <Card x-chunk="A card showing the total sales and the percentage difference from last month.">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-md font-medium">Sui Earned</CardTitle>
              <CreditCard className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold text-green-500">7 Sui</div>
            </CardContent>
          </Card>
          <Card x-chunk="A card showing the total active users and the percentage difference from last hour.">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-md font-medium">Balance</CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold text-blue-500">
                {depositBalance} sui
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
          <Card
            className="xl:col-span-2"
            x-chunk="A card showing a table of recent transactions with a link to view all transactions."
          >
            <CardHeader className="flex flex-row items-center justify-between">
              <div className="grid gap-2">
                <CardTitle>Player History</CardTitle>
                <CardDescription>
                  Recent transactions from your games.
                </CardDescription>
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  onChange={(e) => setSuiEns(e.target.value)}
                  value={suiEns}
                  placeholder="Enter .riptide Name"
                  className="border border-gray-300 rounded-md px-4 py-1 text-sm"
                />
                <Button
                  onClick={() => {
                    if (suiEns) {
                      subBuy(suiEns);
                    }
                  }}
                  
                  size="sm"
                  className="ml-auto gap-1"
                >
                  Buy Riptide Name
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Username</TableHead>
                    <TableHead>Room Name</TableHead>
                    <TableHead>Community</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Rank Achieved</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {transactions.map((transaction, id) => {
                    return (
                      <>
                        <TableRow key={id}>
                          <TableCell>
                            <div className="font-medium lowercase">
                              @nikku876
                            </div>
                          </TableCell>
                          <TableCell className=" ">
                            {transaction.roomName}
                          </TableCell>
                          <TableCell className=" ">
                            <Badge
                              className="text-xs bg-blue-50 text-blue-500"
                              variant="outline"
                            >
                              {transaction.community}
                            </Badge>
                          </TableCell>
                          <TableCell className="md:table-cell">
                            {transaction.date}
                          </TableCell>
                          <TableCell>{transaction.rankAchieved}</TableCell>
                        </TableRow>
                      </>
                    );
                  })}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
          <Card x-chunk="A card showing a list of recent sales with customer names and email addresses.">
            <CardHeader>
              <CardTitle>NFT's you hold</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-2">
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-row  w-48 rounded-lg shadow-xl border-8 border-blue-500 h-48 items-center space-x-2">
                  <img
                    src="https://tradeport.mypinata.cloud/ipfs/QmSk9wP9m1wRohnZZcz6GfuwnBrvvF1QWXDwr1Erb6QzG3?pinataGatewayToken=sd9Ceh-eJIQ43PRB3JW6QGkHAr8-cxGhhjDF0Agxwd_X7N4_reLPQXZSP_vUethU&img-width=500&img-height=500&img-fit=cover&img-quality=80&img-onerror=redirect&img-fit=pad&img-format=webp"
                    alt="Community"
                  />
                </div>
                <div className="flex flex-row  w-48 rounded-lg shadow-xl border-8 border-blue-500 h-48 items-center space-x-2">
                  <img
                    src="https://img.sm.xyz/0xc94a37b7a848963fc6ae28bf8ad6bb18e07ed932cfbf6d9cd9c16e0b9108b378/"
                    alt="Community"
                  />
                </div>
                <div className="flex flex-row  w-48 rounded-lg shadow-xl border-8 border-blue-500 h-48 items-center space-x-2">
                  <img
                    src="https://tradeport.mypinata.cloud/ipfs/QmWFurw6xktFkSvKRLWwoNHtPcUBGJDpimECYiz3PJXqMn?pinataGatewayToken=sd9Ceh-eJIQ43PRB3JW6QGkHAr8-cxGhhjDF0Agxwd_X7N4_reLPQXZSP_vUethU&img-width=500&img-height=500&img-fit=cover&img-quality=80&img-onerror=redirect&img-fit=pad&img-format=webp"
                    alt="Community"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
