"use client";
import { useState } from "react";
import styles from "./plantacoes.module.css";
import { useProducts } from "./contexts/productContext";

export default function Plantacao() {
  const [estado, setEstado] = useState("semente");
  const [milhosColhidos, setMilhosColhidos] = useState(0);
  const [tempoCrescimento, setTempoCrescimento] = useState(5000);
  const [status, setStatus] = useState(0);
  const { products, setProducts, strawberry, setStrawberry } = useProducts();

  const plantar = () => {
    if (estado === "semente") {
      setEstado("crescendo");

      // A cada nível de melhoria, diminui o tempo de crescimento
      let tempo = 5000 - status * 1000;
      if (tempo < 3000) tempo = 3000; // Limita o tempo de crescimento mínimo em 3000ms

      setTimeout(() => {
        setEstado("pronto");
      }, tempo);
    }
  };

  const colher = () => {
    if (estado === "pronto") {
      setProducts(products + 100);
      setMilhosColhidos(milhosColhidos + 100);
      setEstado("semente");
    }
  };

  const melhorarPlantacao = () => {
    if (status < 2) {
      setStatus(status + 1); // Aumenta o nível de melhoria
    }
  };

  return (
    <div className={styles.container}>
      <h2>Status da Plantação: {estado}</h2>
      <p>Milhos Colhidos: {milhosColhidos}</p>
      <p>Nível de Melhoria: {status}/2</p>
      <p>Tempo de Crescimento: {tempoCrescimento / 1000} segundos</p>

      <div className={styles.buttonContainer}>
        <button
          onClick={plantar}
          style={{
            backgroundColor: "green",
            color: "white",
            padding: "10px 20px",
            margin: "5px",
          }}
          disabled={estado !== "semente"}
        >
          Plantar
        </button>

        <button
          onClick={colher}
          style={{
            backgroundColor: "yellow",
            color: "black",
            padding: "10px 20px",
            margin: "5px",
          }}
          disabled={estado !== "pronto"}
        >
          Colher
        </button>

        <button
          onClick={melhorarPlantacao}
          style={{
            backgroundColor: "blue",
            color: "white",
            padding: "10px 20px",
            margin: "5px",
          }}
        >
          Melhorar Plantação
        </button>
      </div>

      <div className={styles.terra}>
        {estado === "semente" && <p>Plante o milho clicando no botão verde.</p>}
        {estado === "crescendo" && <p>Milho está crescendo...</p>}
        {estado === "pronto" && (
          <p>O milho está pronto para ser colhido! Clique no botão amarelo.</p>
        )}
      </div>
    </div>
  );
}
