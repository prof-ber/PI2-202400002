import Image from "next/image";
import styles from "./page.module.css";
import BarraSuperior from "./barraSuperior";
import MelhorarPlantacao from "./melhorarPlantacao";
import Mapa from "./mapa";

export default function Home() {
  return (
    <>
      <div className={styles.container}>
        <Mapa />
      </div>
    </>
  );
}
