"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import {
  createNetworkConfig,
  SuiClientProvider,
  WalletProvider,
} from "@mysten/dapp-kit";

import "@mysten/dapp-kit/dist/index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SuiClient, getFullnodeUrl } from "@mysten/sui/client";
const { networkConfig } = createNetworkConfig({
  testnet: { url: "https://rpc-testnet.suiscan.xyz/" },  
});

const queryClient = new QueryClient();

interface SuiLinkContextType {
  isConnected: boolean;
  address: string;
  setConnection: (isConnected: boolean, address: string) => void;
  suiName: string;
  setSuiName: (suiName: string) => void;
  fetch: (address: string) => void;
}

const SuiLinkContext = createContext<SuiLinkContextType | undefined>(undefined);

export const SuiLinkProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isConnected, setIsConnected] = useState(false);
  const [address, setAddress] = useState("");
  const [suiName,setSuiName] = useState("");
  const client = new SuiClient({ url: " https://rpc-testnet.suiscan.xyz" });
  const extractDomainName = (response: any) => {
    if (!response?.data || !Array.isArray(response.data)) {
      return null;
    }
    const domainNames: any = response.data
      .map(
        (item: {
          data: {
            content: { fields: { nft: { fields: { domain_name: any } } } };
          };
        }) => item?.data?.content?.fields?.nft?.fields?.domain_name
      )
      .filter(Boolean);
  
    // Check length
    console.log(`Found ${domainNames.length} domain names`);
  
    // Return first domain name if exists, otherwise null
    return domainNames.length > 0 ? domainNames[0] : null;
  };
  async function fetch(address:any) {
    if (address) {
      const resp = await client.getOwnedObjects({
        owner:address,
        filter: {
          StructType:
            "0x22fa05f21b1ad71442491220bb9338f7b7095fe35000ef88d5400d28523bdd93::subdomain_registration::SubDomainRegistration",
        },
        options: {
          showType: true,
          showContent: true,
          // showDisplay: true,
        },
      });   
    
      // Get the domain name
      const domainName = extractDomainName(resp);
      console.log("Domain Name:", domainName);
      // If you want to see all domain names (optional)
      const allDomainNames = resp.data
        ?.map(
          (item:any) => item?.data?.content?.fields?.nft?.fields?.domain_name
        )
        .filter(Boolean);
        setSuiName(allDomainNames[0]);
    }
  }

  useEffect(() => {
    const storedConnection = localStorage.getItem("SuiLinkConnection");
    if (storedConnection) {
      const { isConnected, address } = JSON.parse(storedConnection);
      setIsConnected(isConnected);
      setAddress(address);
    }

    fetch(address);
  }, []);

  
  const setConnection = (isConnected: boolean, address: string) => {
    setIsConnected(isConnected);
    setAddress(address);
    localStorage.setItem(
      "SuiLinkConnection",
      JSON.stringify({ isConnected, address })
    );
  };

  return (
    <SuiLinkContext.Provider value={{ isConnected, address,setSuiName, setConnection,suiName,fetch }}>
      <QueryClientProvider client={queryClient}>
        <SuiClientProvider networks={networkConfig} defaultNetwork="testnet">
          <WalletProvider
            autoConnect={true}
            stashedWallet={{
              name: "Baskt",
            }}
          >
            {children}
          </WalletProvider>
        </SuiClientProvider>
      </QueryClientProvider>
    </SuiLinkContext.Provider>
  );
};

export const useSuiLink = () => {
  const context = useContext(SuiLinkContext);
  if (context === undefined) {
    throw new Error("useSuiLink must be used within a SuiLinkProvider");
  }
  return context;
};
