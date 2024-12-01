"use client";
import React, {
  createContext,
  useState,
  ReactNode,
  useEffect,
  useContext,
} from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

const GameProductsContext = createContext(undefined);

export const GameProductsProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([
    {
      id: "1",
      title: "Coin Flip",
      image:
        "https://www.kundanrefinery.com/pub/media/catalog/product/cache/a6819a77997e6f5ec84977f1af72369f/k/r/kr337-a_1.jpg",
    },
    {
      id: "2",
      title: "Price Prediction",
      image:
        "https://academy-public.coinmarketcap.com/optimized-uploads/a189e72d71ad447b985f6d8ad225ba5a.jpeg",
    },
    {
      id: "3",
      title: "Roulette",
      image:
        "https://m.media-amazon.com/images/I/61u26l97ssL._UF1000,1000_QL80_.jpg",
    },
    {
      id: "4",
      title: "Snake Run",
      image: "https://m.media-amazon.com/images/I/81t8t9TyYLL.png",
    },
  ]);


  const registerUser = async (username: any, wallet: any) => {
    console.log(username, wallet);
    let id = toast.loading("Generating your Sui Riptide SuiNS...");
    try {
      console.log(username, wallet);
      let res = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/user/register`, {
        username,
        wallet,
      });
      toast.success("Sui Riptide SuiNS generated successfully", { id });
      return res.data;
    } catch (error) {
      console.log(error);
      toast.error("Error generating Sui Riptide SuiNS", { id });
    }
  };

  return (
    <GameProductsContext.Provider value={{ products, loading, registerUser }}>
      {children}
    </GameProductsContext.Provider>
  );
};


// Export the context and provider
export const useGameProducts = () => {
  const context = useContext(GameProductsContext);
  if (context === undefined) {
    throw new Error(
      "useGameProducts must be used within a GameProductsProvider"
    );
  }
  return context;
};
