"use client";
import { createContext, useContext, useState } from "react";

const MoneyContext = createContext();

export function MoneyProvider({ children }) {
  const [money, setMoney] = useState(5000000);

  const spendMoney = (amount) => {
    if (money >= amount) {
      setMoney(money - amount);
      return true;
    }
    return false;
  };

  return (
    <MoneyContext.Provider value={{ money, setMoney, spendMoney }}>
      {children}
    </MoneyContext.Provider>
  );
}

export function useMoney() {
  const context = useContext(MoneyContext);

  if (!context) {
    throw new Error("useMoney must be used within a MoneyProvider");
  }

  return [context.money, context.setMoney, context.spendMoney];
}
