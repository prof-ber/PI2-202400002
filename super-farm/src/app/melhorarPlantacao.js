"use client";
import styles from "./melhorarPlantacao.module.css";

export default function MelhorarPlantacao({ melhorar, status }) {
  return (
    <div className={styles.container}>
      <h2>Melhorar Plantação</h2>
      <p>Status Atual da Plantação: {status}/3</p>
      <button
        onClick={melhorar}
        style={{
          backgroundColor: status < 3 ? "blue" : "grey",
          color: "white",
          padding: "10px 20px",
          margin: "5px",
        }}
        disabled={status >= 3}
      >
        Melhorar
      </button>
      {status >= 3 && <p>Máximo de melhorias atingido.</p>}
    </div>
  );
}
