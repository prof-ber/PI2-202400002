"use client";
import styles from "./farmers.module.css";
import { useState, useEffect } from "react";
import { useMoney } from "./contexts/moneyContext";
import { useProducts } from "./contexts/productContext";
import { useMarket } from "./contexts/marketContext";

export default function Farmers() {
  const [money, setMoney] = useMoney();
  const { handleSell } = useProducts();
  const { products: marketProducts } = useMarket();

  const [selectedProduct, setSelectedProduct] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [price, setPrice] = useState("");
  const [message, setMessage] = useState("");
  const [triesLeft, setTriesLeft] = useState(3);
  const [currentFarmer, setCurrentFarmer] = useState(null);
  const [waitingForFarmer, setWaitingForFarmer] = useState(true);

  const farmers = [
    { name: "João", product: "trigo", quantity: 50, price: 10 },
    { name: "Maria", product: "morango", quantity: 30, price: 15 },
    { name: "Pedro", product: "milho", quantity: 40, price: 8 },
    { name: "Ana", product: "abóbora", quantity: 20, price: 12 },
  ];

  const setMessageWithTimeout = (msg) => {
    setMessage(msg);
    setTimeout(() => setMessage(""), 5000);
  };

  const selectRandomFarmer = () => {
    if (waitingForFarmer) {
      const randomIndex = Math.floor(Math.random() * farmers.length);
      setCurrentFarmer(farmers[randomIndex]);
      setWaitingForFarmer(false);
      setTriesLeft(3);
      setMessage("");
    }
  };

  useEffect(() => {
    const farmerInterval = setInterval(() => {
      selectRandomFarmer();
    }, 10000);
    return () => clearInterval(farmerInterval);
  }, [waitingForFarmer]);

  const getProductDescription = (product) => {
    switch (product) {
      case "trigo":
        return "Trigo";
      case "morango":
        return "Morango";
      case "milho":
        return "Milho";
      case "abóbora":
        return "Abóbora";
      default:
        return "um produto desconhecido";
    }
  };

  const handleSale = () => {
    if (!currentFarmer) {
      setMessageWIthTimeout("Não há nenhum fazendeiro no momento.");
      return;
    }

    if (triesLeft <= 0) {
      setMessagewithTimeout(
        "Você não tem mais tentativas para negociar com este fazendeiro."
      );
      return;
    }

    if (!selectedProduct) {
      setMessageWithTimeout(
        "Por favor, selecione um produto antes de propor uma venda."
      );
      return;
    }

    if (selectedProduct !== currentFarmer.product) {
      setMessageWithTimeout(
        `O produto selecionado (${getProductDescription(
          selectedProduct
        )}) não é o que o fazendeiro está procurando (${getProductDescription(
          currentFarmer.product
        )}).`
      );
      setTriesLeft((prev) => prev - 1);
      if (triesLeft === 1) {
        handleFarmerDeparture();
      }
      return;
    }

    if (!price || price <= 0) {
      setMessageWithTimeout(
        "Por favor, defina um preço válido antes de propor uma venda."
      );
      return;
    }

    if (quantity > currentFarmer.quantity) {
      setMessageWithTimeout(
        `O fazendeiro está procurando apenas ${currentFarmer.quantity} unidades. Você está oferecendo muito.`
      );
      setTriesLeft((prev) => prev - 1);
      if (triesLeft === 1) {
        handleFarmerDeparture();
      }
      return;
    }

    if (quantity < currentFarmer.quantity) {
      setMessageWithTimeout(
        `O fazendeiro está procurando ${currentFarmer.quantity} unidades. Você está oferecendo menos do que ele precisa.`
      );
      setTriesLeft((prev) => prev - 1);
      if (triesLeft === 1) {
        handleFarmerDeparture();
      }
      return;
    }

    if (!quantity || quantity <= 0) {
      setMessageWithTimeout(
        "Por favor, defina uma quantidade válida antes de propor uma venda."
      );
      return;
    }

    if (selectedProduct !== currentFarmer.product) {
      setMessageWithTimeout(
        "O produto selecionado não é o que o fazendeiro está procurando."
      );
      setTriesLeft((prev) => prev - 1);
      if (triesLeft === 1) {
        handleFarmerDeparture();
      }
      return;
    }

    const marketPrice =
      marketProducts.find((p) => p.name === selectedProduct)?.price || 0;
    const priceDifference = Math.abs(price - marketPrice) / marketPrice;

    let baseChance = 0.7;
    let happiness = 2;

    if (priceDifference <= -0.2) {
      baseChance = 0.9;
      happiness = 0;
    } else if (priceDifference <= 0.1) {
      baseChance = 0.7;
      happiness = 1;
    } else if (priceDifference >= 0) {
      baseChance = 0.5;
      happiness = 2;
    } else if (priceDifference >= -0.1) {
      baseChance = 0.3;
      happiness = 3;
    } else {
      baseChance = 0.1;
      happiness = 3;
    }

    const randomFactor = Math.random() * 0.2 - 0.1;
    const successChance = Math.max(0, Math.min(1, baseChance + randomFactor));

    if (Math.random() < successChance) {
      const totalEarnings = price * quantity;
      setMoney((prevMoney) => prevMoney + totalEarnings);
      handleSell(selectedProduct, quantity);

      const happiness = 4 - triesLeft;
      const happinessMessages = [
        "O fazendeiro está extremamente feliz com a negociação!",
        "O fazendeiro está muito satisfeito com a negociação.",
        "O fazendeiro está satisfeito com a negociação.",
        "O fazendeiro aceitou a negociação, mas não parece muito entusiasmado.",
      ];

      setMessageWithTimeout(
        `Venda bem-sucedida! Você vendeu ${quantity} ${selectedProduct}(s) e ganhou R$${totalEarnings.toFixed(
          2
        )}. ${happinessMessages[happiness]}`
      );
      setCurrentFarmer(null);
      setWaitingForFarmer(true);
    } else {
      setMessageWithTimeout("O fazendeiro recusou a oferta.");
      setTriesLeft((prev) => {
        if (prev <= 1) {
          handleFarmerDeparture();
          return 3;
        }
        return prev - 1;
      });
    }
  };

  const handleFarmerDeparture = () => {
    setMessageWithTimeout("O fazendeiro foi embora insatisfeito.");
    setCurrentFarmer(null);
    setWaitingForFarmer(true);
  };

  return (
    <div className={styles.container}>
      {message && <div className={styles.message}>{message}</div>}
      <div className={styles.content}>
        <div className={styles.farmersection}>
          {currentFarmer ? (
            <div className={styles.currentFarmer}>
              <h3>Fazendeiro Atual:</h3>
              <p>Nome: {currentFarmer.name}</p>
              <p>
                Procurando por: {getProductDescription(currentFarmer.product)}
              </p>
              <p>Quantidade desejada: {currentFarmer.quantity}</p>
              <p>Tentativas restantes: {triesLeft}</p>
            </div>
          ) : (
            <p>Aguardando um fazendeiro...</p>
          )}
        </div>
        <div className={styles.salesection}>
          <select
            value={selectedProduct}
            onChange={(e) => setSelectedProduct(e.target.value)}
            className={styles.input1}
          >
            <option value="">Selecione um produto</option>
            <option value="trigo">Trigo</option>
            <option value="morango">Morango</option>
            <option value="milho">Milho</option>
            <option value="abóbora">Abóbora</option>
          </select>
          <input
            type="number"
            placeholder="Quantidade"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            className={styles.input1}
          />
          <input
            type="number"
            placeholder="Preço por unidade"
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
            className={styles.input1}
          />
          <button
            style={{ cursor: "pointer" }}
            onClick={handleSale}
            className={styles.salebutton}
          >
            Propor Venda
          </button>
        </div>
      </div>
    </div>
  );
}
