import Image from "next/image";
import styles from "./page.module.css";
import PlantacoesMenu from "./plantacoesMenu";
import { MoneyProvider } from "./contexts/moneyContext";
import { ProductProvider } from "./contexts/productContext";
import BarraSuperior from "./barraSuperior";
import MelhorarPlantacao from "./melhorarPlantacao";
import Mapa from "./mapa";
import { MarketProvider } from "./contexts/marketContext";

export default function Home() {
  return (
    <>
      <MarketProvider>
        <MoneyProvider>
          <ProductProvider>
            <div className={styles.container}>
              <Mapa />
              <BarraSuperior />
            </div>
          </ProductProvider>
        </MoneyProvider>
      </MarketProvider>
    </>
  );
}
