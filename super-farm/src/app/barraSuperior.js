"use client";
import { useEffect } from "react";
import styles from "./barraSuperior.module.css";
import { useProducts } from "./contexts/productContext";
import PlantacoesMenu from "./plantacoesMenu";
import { useMoney } from "./contexts/moneyContext";

export default function BarraSuperior() {
  const { products } = useProducts();
  const [money] = useMoney();

  useEffect(() => {}, [products]);
  return (
    <>
      <div className={styles.container}>
        <PlantacoesMenu />
        <div className={styles.recursos}>💰: {money}</div>
        <div className={styles.recursos}>🌾: {products}</div>
      </div>
    </>
  );
}
