"use client";
import { createContext, useState, useContext, useEffect } from "react";

const MarketContext = createContext();

export function MarketProvider({ children }) {
  const [products, setProducts] = useState([
    { id: 1, name: "trigo", price: 1000 },
    { id: 2, name: "morango", price: 1000 },
    { id: 3, name: "milho", price: 1000 },
    { id: 4, name: "abóbora", price: 1000 },
  ]);

  const updatePrice = (id, newPrice) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === id ? { ...product, price: newPrice } : product
      )
    );
  };

  const fluctuatePrices = () => {
    setProducts((prevProducts) =>
      prevProducts.map((product) => {
        const fluctuation = 1 + (Math.random() * 0.1 - 0.05);
        const newPrice = Math.max(1, product.price * fluctuation);
        return { ...product, price: parseFloat(newPrice.toFixed(2)) };
      })
    );
  };

  useEffect(() => {
    const intervalId = setInterval(fluctuatePrices, 5000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <MarketContext.Provider value={{ products, updatePrice }}>
      {children}
    </MarketContext.Provider>
  );
}

export function useMarket() {
  return useContext(MarketContext);
}
