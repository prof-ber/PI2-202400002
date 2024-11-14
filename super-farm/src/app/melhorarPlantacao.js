import styles from "./melhorarPlantacao.module.css";

export default function MelhorarPlantacao({ melhorar }) {
  return (
    <div className={styles.container}>
      <h1>Melhorar a Plantação</h1>
      <button className={styles.button} onClick={melhorar}>
        ⬆️ Aumentar Velocidade
      </button>
    </div>
  );
}
