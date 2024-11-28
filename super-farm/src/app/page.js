"use client";
import { useEffect } from "react";
import Image from "next/image";
import styles from "./page.module.css";
import PlantacoesMenu from "./plantacoesMenu";
import { MoneyProvider, useMoney } from "./contexts/moneyContext";
import { ProductProvider, useProducts } from "./contexts/productContext";
import {
  PlantacaoProvider,
  usePlantacaoContext,
} from "./contexts/plantacaoContext";
import { MarketProvider, useMarket } from "./contexts/marketContext";
import BarraSuperior from "./barraSuperior";
import MelhorarPlantacao from "./melhorarPlantacao";
import Mapa from "./mapa";
import Casa from "./casa";
import Plantacoes from "./plantacoes";
import Plantacoes2 from "./plantacoes2";
import Farmers from "./farmers";
import Signup from "./cadastro";
import Login from "./login";
import Save from "./save";
import { useLoadGame } from "./useLoadGame";

function GameContent() {
  const { loadGame, loading, error } = useLoadGame();
  const { setPlantacoes } = usePlantacaoContext();
  const [, setMoney] = useMoney();
  const { setProducts, setStrawberry, setCorn, setPumpkin } = useProducts();
  const { setProducts: setMarketProducts } = useMarket();

  useEffect(() => {
    const initializeGame = async () => {
      await loadGame({
        setPlantacoes,
        setMoney,
        setProducts,
        setMarketProducts,
        setStrawberry,
        setCorn,
        setPumpkin,
      });
    };

    initializeGame();
  }, []);

  if (loading) {
    return <div>Carregando...</div>;
  }

  if (error) {
    return <div style={{ color: "red" }}>{error}</div>;
  }

  return (
    <div className={styles.container}>
      <BarraSuperior />
      <Casa />
      <Farmers />
      <Signup />
      <Login />
      <Save />
    </div>
  );
}

export default function Home() {
  return (
    <MarketProvider>
      <MoneyProvider>
        <ProductProvider>
          <PlantacaoProvider>
            <GameContent />
          </PlantacaoProvider>
        </ProductProvider>
      </MoneyProvider>
    </MarketProvider>
  );
}
