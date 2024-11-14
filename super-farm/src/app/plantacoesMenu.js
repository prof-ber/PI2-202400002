"use client";
import styles from "./plantacoesMenu.module.css";
import { useState } from "react";
import { useMoney } from "./contexts/moneyContext";
import { useProducts } from "./contexts/productContext";

export default function PlantacoesMenu() {
  const [money, setMoney, spendMoney] = useMoney();
  const [precoVender, setPrecoVender] = useState("");
  const [precoManutencao, setPrecoManutencao] = useState("");
  const { products, setProducts, handleHarvest, handleSell } = useProducts();

  const handleVender = () => {
    const preco = Number(precoVender);

    if (preco <= 0) {
      console.log("Preço inválido!");
    } else if (products <= 0) {
      console.log("Você não tem produtos suficientes para vender!");
    } else {
      console.log("Você vendeu com sucesso!");
      setMoney(money + preco); // Aumenta o saldo
      handleSell(); // Diminui a quantidade de produtos
      setPrecoVender(""); // Limpa o campo de preço
    }
  };
  return (
    <>
      <div className={styles.container}>
        <div className={styles.sell}>
          <button className={styles.venda} onClick={handleVender}>
            Vender
          </button>
        </div>
        <div className={styles.price}>
          <input
            type="number"
            placeholder="Insira o preço aqui"
            className={styles.input1}
            value={precoVender}
            onChange={(e) => setPrecoVender(e.target.value)}
          />
        </div>
      </div>
    </>
  );
}
