import Image from "next/image";
import styles from "./page.module.css";
import PlantacoesMenu from "./plantacoesMenu";
import { MoneyProvider } from "./contexts/moneyContext";
import BarraSuperior from "./barraSuperior";
import MelhorarPlantacao from "./melhorarPlantacao";
import Mapa from "./mapa";

export default function Home() {
  return (
    <>
      <MoneyProvider>
        <div className={styles.container}>
          <Mapa />
          <PlantacoesMenu />
        </div>
      </MoneyProvider>
    </>
  );
}
