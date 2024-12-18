"use client";
import styles from "./plantacoesMenu.module.css";
import { useState, useEffect } from "react";
import { useMoney } from "./contexts/moneyContext";
import { useProducts } from "./contexts/productContext";
import { useMarket } from "./contexts/marketContext";

export default function PlantacoesMenu() {
  const [money, setMoney] = useMoney();
  const [precoVender, setPrecoVender] = useState("");
  const [quantidadeVender, setQuantidadeVender] = useState(1);
  const {
    products,
    strawberry,
    corn,
    pumpkin,
    handleSell,
    precoMilho,
    precoMorango,
    precoTrigo,
    precoAbobora,
  } = useProducts();
  const [produtoSelecionado, setProdutoSelecionado] = useState("milho");
  const { products: marketProducts } = useMarket();

  const [error, setError] = useState("");
  const [precoMercado, setPrecoMercado] = useState("0.00");

  useEffect(() => {
    const selectedProduct = marketProducts.find(
      (p) => p.name === produtoSelecionado
    );
    if (selectedProduct) {
      setPrecoMercado(selectedProduct.price.toFixed(2));
    } else {
      setPrecoMercado("0.00");
    }
  }, [produtoSelecionado, marketProducts]);

  const handleVender = () => {
    const preco = Number(precoVender);
    const estoqueAtual =
      produtoSelecionado === "trigo"
        ? products
        : produtoSelecionado === "morango"
        ? strawberry
        : produtoSelecionado === "milho"
        ? corn
        : pumpkin;

    const marketPrice = Number(precoMercado);

    if (preco <= 0) {
      setError("Preço inválido! Insira um preço maior que zero.");
    } else if (quantidadeVender <= 0) {
      setError("Quantidade inválida! Insira uma quantidade maior que zero.");
    } else if (quantidadeVender > estoqueAtual) {
      setError(
        `Você não tem ${produtoSelecionado} suficiente! Você tem apenas ${estoqueAtual} unidade(s).`
      );
    } else {
      const totalEarnings = preco * quantidadeVender;

      // Always remove the products from inventory
      handleSell(produtoSelecionado, quantidadeVender);

      if (preco > marketPrice) {
        const priceDifference = (preco - marketPrice) / marketPrice;
        const baseChance = 0.7;
        const successChance = Math.max(0, baseChance - priceDifference);

        if (Math.random() < successChance) {
          setError(
            `Venda bem-sucedida com preço acima do mercado! Você vendeu ${quantidadeVender} ${produtoSelecionado}(s) por R$${totalEarnings.toFixed(
              2
            )}.`
          );
          setMoney((prevMoney) => prevMoney + totalEarnings);
        } else {
          setError(
            `Venda falhou! O preço R$${preco.toFixed(
              2
            )} é muito alto comparado ao preço de mercado R$${marketPrice.toFixed(
              2
            )}. Você perdeu ${quantidadeVender} ${produtoSelecionado}(s).`
          );
        }
      } else if (preco < marketPrice) {
        setError(
          `Venda realizada abaixo do preço de mercado. Você vendeu ${quantidadeVender} ${produtoSelecionado}(s) por R$${totalEarnings.toFixed(
            2
          )}.`
        );
        setMoney((prevMoney) => prevMoney + totalEarnings);
      } else {
        setError(
          `Venda realizada pelo preço de mercado. Você vendeu ${quantidadeVender} ${produtoSelecionado}(s) por R$${totalEarnings.toFixed(
            2
          )}.`
        );
        setMoney((prevMoney) => prevMoney + totalEarnings);
      }

      setPrecoVender("");
      setQuantidadeVender(1);
    }
  };
  const getProductPrice = (product) => {
    switch (product) {
      case "milho":
        return precoMilho;
      case "morango":
        return precoMorango;
      case "trigo":
        return precoTrigo;
      case "abóbora":
        return precoAbobora;
      default:
        return 0;
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.sell}>
        <button
          style={{ cursor: "pointer" }}
          className={styles.venda}
          onClick={handleVender}
        >
          Vender
        </button>
      </div>
      <div className={styles.price}>
        <p>Preço de mercado: R${precoMercado}</p>
      </div>
      <input
        type="number"
        placeholder="Insira o preço aqui"
        className={styles.input1}
        value={precoVender}
        onChange={(e) => setPrecoVender(e.target.value)}
      />
      <div className={styles.quantity}>
        <input
          type="number"
          placeholder="Insira a quantidade aqui"
          className={styles.input1}
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
          <option value="trigo">Trigo</option>
          <option value="morango">Morango</option>
          <option value="milho">Milho</option>
          <option value="abóbora">Abóbora</option>
        </select>
      </div>
      {error && <div className={styles.error}>{error}</div>}
    </div>
  );
}
