"use client";
import { createContext, useContext, useState } from "react";

const MoneyContext = createContext();

export function MoneyProvider({ children }) {
  const [money, setMoney] = useState(100);

  const getMoney = () => money;

  const spendMoney = (amount) => {
    if (money >= amount) {
      setMoney(money - amount);
      return true;
    }
    return false;
  };

  return (
    <MoneyContext.Provider value={{ money, getMoney, spendMoney }}>
      {children}
    </MoneyContext.Provider>
  );
}

export function useMoney() {
  const context = useContext(MoneyContext);

  if (!context) {
    throw new Error("useMoney must be used within a MoneyProvider");
  }

  return [context.money, context.getMoney, context.spendMoney];
}
