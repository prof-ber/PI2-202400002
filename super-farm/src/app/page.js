import Image from "next/image";
import styles from "./page.module.css";
import PlantacoesMenuMenu from "./plantacoesMenuMenu";
import { MoneyProvider } from "./contexts/moneyContext";
import { ProductProvider } from "./contexts/productContext";
import BarraSuperior from "./barraSuperior";
import MelhorarPlantacao from "./melhorarPlantacao";
import Mapa from "./mapa";
import Casa from "./casa";
import Plantacoes from "./plantacoes";

export default function Home() {
  return (
    <>
      <MoneyProvider>
        <ProductProvider>
          <div className={styles.container}>
            <Casa />
            <BarraSuperior />
          </div>
        </ProductProvider>
      </MoneyProvider>
    </>
  );
}
