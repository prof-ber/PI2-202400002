"use client";
import { createContext, useContext, useState } from "react";

const ProductContext = createContext();

export function ProductProvider({ children }) {
  const [products, setProducts] = useState(1000);
  const [strawberry, setStrawberry] = useState(1000);

  const handleHarvest = (produto) => {
    if (produto === "milho") {
      setProducts(products + 1);
    } else if (produto === "morango") {
      setStrawberry(strawberry + 1);
    }
  };

  const handleSell = (produto, quantidade) => {
    if (produto === "milho" && products >= quantidade) {
      setProducts(products - quantidade);
    } else if (produto === "morango" && strawberry >= quantidade) {
      setStrawberry(strawberry - quantidade);
    }
  };

  return (
    <ProductContext.Provider
      value={{
        products,
        setProducts,
        strawberry,
        setStrawberry,
        handleHarvest,
        handleSell,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
}

export function useProducts() {
  const context = useContext(ProductContext);
  if (context === undefined) {
    throw new Error("useProducts must be used within a ProductProvider");
  }
  return context;
}
