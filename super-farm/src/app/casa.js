"use client";
import styles from "./casa.module.css";
import { useState } from "react";
import Plantacao from "./plantacoes";

export default function Casa() {
  const [casa, setCasa] = useState(false);
  const [plantacaoStatus, setPlantacaoStatus] = useState(0); // Controle do nível de melhorias

  const handleCasa = () => {
    setCasa(!casa);
    console.log(`Casa foi clicada, estado: ${!casa ? "aberto" : "fechado"}`);
  };

  const melhorarPlantacao = () => {
    if (plantacaoStatus < 2) {
      setPlantacaoStatus(plantacaoStatus + 1); // Incrementa o status da plantação
      console.log(
        `Melhorando plantação... Novo status: ${plantacaoStatus + 1}`
      );
    } else {
      console.log("Nível máximo de melhoria já alcançado.");
    }
  };

  return (
    <div className={styles.container}>
      <h1>Bem-vindo à Fazenda!</h1>
      <div className={styles.buttonContainer} onClick={handleCasa}>
        <img
          className={styles.imageoverlay}
          src="/casinha.png"
          alt="Imagem do botão para abrir o menu de melhorias"
        />
      </div>
      {casa && (
        <div className={styles.melhorarContainer}>
          <button
            onClick={melhorarPlantacao}
            style={{
              backgroundColor: "blue",
              color: "white",
              padding: "10px 20px",
              margin: "5px",
            }}
            disabled={plantacaoStatus >= 2}
          >
            Melhorar Plantação
          </button>
        </div>
      )}
      <Plantacao status={plantacaoStatus} />
    </div>
  );
}
