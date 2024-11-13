import styles from "./barraSuperior.module.css";

export default function BarraSuperior() {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.recursos}>💰 R$100.00</div>
        <div className={styles.recursos}>🌾 150</div>
        <div className={styles.recursos}>📉 R$10</div>
      </div>
    </>
  );
}
