"use client";
import { useState } from "react";
import styles from "./plantacoes.module.css";

export default function Plantacao() {
  const [estado, setEstado] = useState("semente"); // Estado inicial da planta: 'semente'
  const [milhosColhidos, setMilhosColhidos] = useState(0); // Contador de milhos colhidos

  // Função para plantar
  const plantar = () => {
    if (estado === "semente") {
      setEstado("crescendo");

      // Após 5 segundos, o milho fica pronto para ser colhido
      setTimeout(() => {
        setEstado("pronto");
      }, 5000); // 5 segundos de crescimento
    }
  };

  // Função para colher
  const colher = () => {
    if (estado === "pronto") {
      setMilhosColhidos(milhosColhidos + 1); // Incrementa o contador de milhos colhidos
      setEstado("semente"); // Reinicia o ciclo
    }
  };

  return (
    <div className={styles.container}>
      <h2>Status da Plantação: {estado}</h2>
      <p>Milhos Colhidos: {milhosColhidos}</p>

      {/* Botões para plantar e colher */}
      <div className={styles.buttonContainer}>
        <button
          onClick={plantar}
          style={{
            backgroundColor: "green",
            color: "white",
            padding: "10px 20px",
            margin: "5px",
          }}
          disabled={estado === "crescendo" || estado === "pronto"}
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
      </div>

      {/* Exibição do estado atual da plantação */}
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
