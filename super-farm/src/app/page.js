import Image from "next/image";
import styles from "./page.module.css";
import PlantacoesMenu from "./plantacoesMenu";
import { MoneyProvider } from "./contexts/moneyContext";
import { ProductProvider } from "./contexts/productContext";
import { PlantacaoProvider } from "./contexts/plantacaoContext";
import BarraSuperior from "./barraSuperior";
import MelhorarPlantacao from "./melhorarPlantacao";
import Mapa from "./mapa";
import Casa from "./casa";
import Plantacoes from "./plantacoes";
import Plantacoes2 from "./plantacoes2";
import { MarketProvider } from "./contexts/marketContext";
import Farmers from "./farmers";
import ProductList from "./productList";
import Market from "./market";

export default function Home() {
  return (
    <>
      <MarketProvider>
        <MoneyProvider>
          <ProductProvider>
            <PlantacaoProvider>
              <div className={styles.container}>
                <BarraSuperior />
                <Casa />
                <Farmers />
                <Market />
              </div>
            </PlantacaoProvider>
          </ProductProvider>
        </MoneyProvider>
      </MarketProvider>
    </>
  );
}
