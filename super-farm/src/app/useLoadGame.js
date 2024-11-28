"use client";
import { useState } from "react";

export function useLoadGame() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const loadGame = async (updateFunctions) => {
    const {
      setPlantacoes,
      setMoney,
      setProducts,
      setStrawberry,
      setCorn,
      setPumpkin,
    } = updateFunctions;

    setLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/loading");
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(
          `Failed to load game: ${response.status} ${response.statusText}. ${errorText}`
        );
      }
      const data = await response.json();
      if (!data.gameData) {
        throw new Error("Invalid data structure received from server");
      }
      console.log("Loaded game data:", data.gameData);

      // Set the loaded data using the provided update functions
      setPlantacoes(data.gameData.plantacoes);
      setMoney(data.gameData.money);
      setProducts(data.gameData.productContextProducts);
      setStrawberry(data.gameData.strawberry);
      setCorn(data.gameData.corn);
      setPumpkin(data.gameData.pumpkin);

      setLoading(false);
    } catch (err) {
      // Silently handle the error by setting default values
      setPlantacoes([]);
      setMoney(15000);
      setProducts(1000);
      setStrawberry(1000);
      setCorn(1000);
      setPumpkin(1000);
      setLoading(false);
    }
  };

  return { loadGame, loading, error };
}
