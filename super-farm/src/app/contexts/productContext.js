"use client";
import { createContext, useContext, useState } from "react";

const ProductContext = createContext();

export function ProductProvider({ children }) {
  const [products, setProducts] = useState(1000);

  const handleHarvest = () => {
    setProducts(products + 1);
  };

  const handleSell = () => {
    if (products > 0) {
      setProducts(products - 1);
    }
  };

  return (
    <ProductContext.Provider value={{ products, handleHarvest, handleSell }}>
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
