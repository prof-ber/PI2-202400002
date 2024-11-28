"use client";
import { usePlantacaoContext } from "./contexts/plantacaoContext";
import { useMoney } from "./contexts/moneyContext";
import { useProducts } from "./contexts/productContext";
import { useMarket } from "./contexts/marketContext";

export default function Save() {
  const { plantacoes } = usePlantacaoContext();
  const [money, setMoney, spendMoney] = useMoney();
  const {
    products: productContextProducts,
    strawberry,
    corn,
    pumpkin,
  } = useProducts();
  const { products: marketProducts, product } = useMarket();

  const handleClick = async () => {
    try {
      const saveData = {
        plantacoes,
        money,
        productContextProducts,
        marketProducts,
        strawberry,
        corn,
        pumpkin,
      };
      console.log("Saving game state:", saveData);
      const response = await fetch("/api/save", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(saveData),
      });

      if (!response.ok) {
        throw new Error("Failed to save game state");
      }

      const result = await response.json();
      if (result.ok) {
        alert("Game saved successfully!");
      }
    } catch (error) {
      console.error("Error saving game:", error);
      alert("Failed to save game. Please try again.");
    }
  };

  return <button onClick={handleClick}>Save Game</button>;
}
