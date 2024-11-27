"use client";
import { useEffect } from "react";
import styles from "./barraSuperior.module.css";
import { useProducts } from "./contexts/productContext";
import PlantacoesMenu from "./plantacoesMenu";
import { useMoney } from "./contexts/moneyContext";
import Market from "./market";

export default function BarraSuperior() {
  const { products, strawberry, corn, pumpkin } = useProducts();
  const [money] = useMoney();

  // Atualiza a barra superior sempre que os valores de produtos ou dinheiro mudarem
  useEffect(() => {
    console.log("BarraSuperior atualizada!");
  }, [products, strawberry, money, corn, pumpkin]); // A função será chamada sempre que esses valores mudarem.

  return (
    <>
      <div className={styles.container}>
        <PlantacoesMenu />
        <div className={styles.recursos}>💰: {money}</div>
        <div className={styles.containerfilho}>
          <div className={styles.produto}>🌾: {products}</div>
          <div className={styles.produto}>🍓: {strawberry}</div>
          <div className={styles.produto}>🌽: {corn}</div>
          <div className={styles.produto}>🎃: {pumpkin}</div>
        </div>
      </div>
    </>
  );
}
