"use client";

import { useState } from "react";
import { usePlantacaoContext } from "./contexts/plantacaoContext"; // Certifique-se de que este contexto está configurado corretamente
import styles from "./melhorarPlantacao.module.css";

export default function MelhorarPlantacao() {
  const { plantacoes, addPlantacao } = usePlantacaoContext(); // Acessa o contexto de plantações
  const [saldo, setSaldo] = useState(100); // Saldo inicial

  const handleCompra = () => {
    if (saldo >= 10) {
      setSaldo(saldo - 10); // Subtrai o custo do saldo
      addPlantacao(`Plantação ${plantacoes.length + 1}`); // Adiciona uma nova plantação com um nome dinâmico
    } else {
      alert("Saldo insuficiente para comprar a plantação."); // Exibe alerta se o saldo for insuficiente
    }
  };

  return (
    <div className={styles.container}>
      <button className={styles.button} onClick={handleCompra}>
        Comprar Plantação
      </button>
      <p>Saldo: {saldo}</p>
      <p>Plantações: {plantacoes.length}</p>{" "}
      {/* Exibe a quantidade de plantações */}
    </div>
  );
}
