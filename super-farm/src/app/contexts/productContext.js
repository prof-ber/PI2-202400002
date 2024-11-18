"use client";
import { createContext, useContext, useState } from "react";

const ProductContext = createContext();

export function ProductProvider({ children }) {
  const [products, setProducts] = useState(1000);
  const [strawberry, setStrawberry] = useState(1000);
  const [corn, setCorn] = useState(1000);
  const [pumpkin, setPumpkin] = useState(1000);

  const handleHarvest = (produto) => {
    if (produto === "trigo") {
      setProducts(products + 1);
    } else if (produto === "morango") {
      setStrawberry(strawberry + 1);
    } else if (produto === "milho") {
      setCorn(corn + 1);
    } else if (produto === "abóbora") {
      setPumpkin(pumpkin + 1);
    }
  };

  const handleSell = (produto, quantidade) => {
    if (produto === "trigo" && products >= quantidade) {
      setProducts(products - quantidade);
    } else if (produto === "morango" && strawberry >= quantidade) {
      setStrawberry(strawberry - quantidade);
    } else if (produto === "milho" && corn >= quantidade) {
      setCorn(corn - quantidade);
    } else if (produto === "abóbora" && pumpkin >= quantidade) {
      setPumpkin(pumpkin - quantidade);
    }
  };

  return (
    <ProductContext.Provider
      value={{
        products,
        setProducts,
        strawberry,
        setStrawberry,
        corn,
        setCorn,
        pumpkin,
        setPumpkin,
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
