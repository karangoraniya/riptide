import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Loader2 } from "lucide-react";
import TronWeb from "tronweb";

declare global {
  interface Window {
    tronWeb: any;
  }
}

export default function NFTMint() {
  const isConnected = false;
  const address ="";
  const [nftName, setNftName] = useState("");
  const [nftDescription, setNftDescription] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [transactionId, setTransactionId] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [receipt, setReceipt] = useState<any>(null);
  const [error, setError] = useState<any>("");
  const [tronWeb, setTronWeb] = useState<any>(null);
  const NFT_SMARTCONTRACT_ADDRESS = process.env.NFT_SMARTCONTRACT_ADDRESS;
  const BTFS_RSA_URL = process.env.BTFS_RSA_URL;
  useEffect(() => {
    const _tronWeb = window.tronWeb;
    if (!_tronWeb || !_tronWeb.defaultAddress.base58) {
      console.error("TronLink is not installed or logged in!");
    } else {
      console.log("TronLink connected:", _tronWeb.defaultAddress.base58);
      setTronWeb(_tronWeb);
    }
  }, []);

  const getBTFSRSA = async (file: File) => {
    try {
      console.log("Uploading file to BTFS...");
      const formData = new FormData();
      formData.append("file", file);
      // In a real scenario, you would upload the file to BTFS here
      // and get back a CID (Content Identifier)
      const response = await fetch(`${BTFS_RSA_URL}/upload`, {
        method: "POST",
        headers: {
          accept: "application/json",
        },
        body: formData,
      });
      if (response.ok) {
        const res = await response.json();
        console.log("File uploaded to BTFS:", res.encrypted_hash);
        return res.encrypted_hash;
      } else {
        throw new Error("Failed to get CID from BTFS");
      }
    } catch (error) {
      console.error("Error uploading to BTFS:", error);
      throw error;
    }
  };

  const mintNFT = async (RSA: string) => {
    try {
      setIsLoading(true);
      setError(null);
      // Smart Contract Details
      const contractAddress = NFT_SMARTCONTRACT_ADDRESS; // Replace with your NFT contract address
      const recipientAddress = tronWeb.defaultAddress.base58; // NFT will be minted to the connected user's address
      const MINT_METHOD_NAME =
        process.env.MINT_METHOD_NAME || "defaultMintMethod"; // Name of the minting function in the smart contract
      // Set parameters for the minting function
      const tokenURI = RSA; // URI for the NFT metadata
      console.log(Date.now());
      const args = [recipientAddress, Date.now(), tokenURI]; // Arguments needed for the mint function

      // Access the contract using TronWeb
      const contract = await tronWeb.contract().at(contractAddress);
      console.log("Contract:", contract);
      // Call the mint function on the smart contract
      if (!contract[MINT_METHOD_NAME]) {
        throw new Error(
          `Mint method ${MINT_METHOD_NAME} not found in the contract`
        );
      }
      const transaction = await contract[MINT_METHOD_NAME](...args).send({
        feeLimit: 100_000_000, // Adjust fee limit as needed
        callValue: 0, // No TRX sent along with the transaction
        shouldPollResponse: true,
        keepTxID: true,
      });
      console.log("Transaction", transaction);
      const transactionHash = transaction[0];

      const receipt = await verifyTransaction(transactionHash);
      if (receipt) {
        console.log("Transaction was successful:", receipt);
        setReceipt(receipt);
      } else {
        throw new Error("Transaction failed or is pending.");
      }
    } catch (err: any) {
      console.error("Error minting NFT:", err.message);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const verifyTransaction = async (transactionHash: string) => {
    try {
      let retries = 10; // Number of times to retry before giving up
      let receipt = null;

      while (retries > 0) {
        receipt = await tronWeb.trx.getTransactionInfo(transactionHash);
        console.log("Receipt:", receipt);
        if (receipt && receipt.receipt.result === "SUCCESS") {
          return receipt;
        } else {
          retries--;
          console.log(`Retrying... (${10 - retries} of 10)`);
          await new Promise((resolve) => setTimeout(resolve, 3000)); // Wait for 3 seconds before retrying
        }
      }

      return receipt; // If still null, transaction might have failed
    } catch (err) {
      console.error("Error verifying transaction:", err);
    }
  };

  const handleMint = async () => {
    if (!isConnected) {
      setError("Please connect your wallet first.");
      return;
    }

    setIsLoading(true);
    setError("");
    setTransactionId("");

    try {
      if (file) {
        const RSA = await getBTFSRSA(file);
        await mintNFT(RSA);
      } else setError("Please select a file to mint as an NFT");
    } catch (error) {
      console.error("Minting failed:", error);
      setError("Failed to mint NFT. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }; // Add this closing brace for the try block

  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Mint NFT</CardTitle>
        <CardDescription>
          Create your own NFT on the Tron network
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                placeholder="Name of your NFT"
                value={nftName}
                onChange={(e) => setNftName(e.target.value)}
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="description">Description</Label>
              <Input
                id="description"
                placeholder="Describe your NFT"
                value={nftDescription}
                onChange={(e) => setNftDescription(e.target.value)}
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="file">File</Label>
              <Input
                id="file"
                type="file"
                onChange={(e) =>
                  setFile(e.target.files ? e.target.files[0] : null)
                }
              />
            </div>
          </div>
        </form>
        {error && (
          <Alert variant="destructive" className="mt-4">
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        {receipt && (
          <Alert className="mt-4">
            <AlertTitle>Success</AlertTitle>
            <AlertDescription>Transaction ID: {receipt.id}</AlertDescription>
          </Alert>
        )}
      </CardContent>
      <CardFooter className="flex justify-between">
        {!isConnected ? (
          <Button variant="outline" disabled={isLoading}>
            Connect Wallet
          </Button>
        ) : (
          <>
            <Button variant="outline" disabled={isLoading}>
              Cancel
            </Button>
            <Button onClick={handleMint} disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Minting...
                </>
              ) : (
                "Mint NFT"
              )}
            </Button>
          </>
        )}
      </CardFooter>
    </Card>
  );
}
