"use client";
import styles from "./plantacoesMenu.module.css";
import { useState } from "react";
import { useMoney } from "./contexts/moneyContext";
import { useProducts } from "./contexts/productContext";

export default function PlantacoesMenu() {
  const [money, setMoney] = useMoney();
  const [precoVender, setPrecoVender] = useState("");
  const [quantidadeVender, setQuantidadeVender] = useState(1);
  const { products, strawberry, handleSell } = useProducts();
  const [produtoSelecionado, setProdutoSelecionado] = useState("milho");

  const [error, setError] = useState("");

  const handleVender = () => {
    const preco = Number(precoVender);
    const estoqueAtual = produtoSelecionado === "milho" ? products : strawberry;

    if (preco <= 0) {
      setError("Preço inválido! Insira um preço maior que zero.");
    } else if (quantidadeVender <= 0) {
      setError("Quantidade inválida! Insira uma quantidade maior que zero.");
    } else if (quantidadeVender > estoqueAtual) {
      setError(
        `Você não tem ${produtoSelecionado} suficiente! Você tem apenas ${estoqueAtual} unidade(s).`
      );
    } else {
      console.log(
        `Você vendeu ${quantidadeVender} ${produtoSelecionado}(s) com sucesso!`
      );
      setMoney(money + preco * quantidadeVender); // Aumenta o saldo
      handleSell(produtoSelecionado, quantidadeVender); // Diminui a quantidade do produto selecionado
      setPrecoVender(""); // Limpa o campo de preço
      setQuantidadeVender(1); // Reseta a quantidade de venda
      setError(""); // Limpa qualquer erro anterior
    }
  };

  return (
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
      <div className={styles.quantity}>
        <input
          type="number"
          placeholder="Insira a quantidade aqui"
          className={styles.input2}
          value={quantidadeVender}
          onChange={(e) => setQuantidadeVender(Number(e.target.value))}
        />
      </div>
      <div className={styles.select}>
        <select
          value={produtoSelecionado}
          onChange={(e) => setProdutoSelecionado(e.target.value)}
          className={styles.input1}
        >
          <option value="milho">Milho</option>
          <option value="morango">Morango</option>
        </select>
      </div>
      {error && <div className={styles.error}>{error}</div>}
    </div>
  );
}
