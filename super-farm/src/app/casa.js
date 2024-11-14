"use client";
import styles from "./casa.module.css";
import { useState } from "react";
import MelhorarPlantacao from "./melhorarPlantacao";
import Plantacao from "./plantacoes";

export default function Casa() {
  const [casa, setCasa] = useState(false);
  const [plantacaoStatus, setPlantacaoStatus] = useState(0); // Conta o número de melhorias

  const handleCasa = () => {
    setCasa(!casa);
  };

  const melhorarPlantacao = () => {
    setPlantacaoStatus(plantacaoStatus + 1); // Incrementa a melhoria
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.buttonContainer} onClick={handleCasa}>
          <img
            className={styles.imageoverlay}
            src="/casinha.png"
            alt="Imagem do botão para plantar milho"
          />
        </div>
        {casa && <MelhorarPlantacao melhorar={melhorarPlantacao} />}
        <Plantacao status={plantacaoStatus} />
      </div>
    </>
  );
}
