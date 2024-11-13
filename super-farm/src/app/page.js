import Image from "next/image";
import styles from "./page.module.css";
import Plantacoes from "./plantacoes";
import { MoneyProvider } from "./contexts/moneyContext";

export default function Home() {
  return (
    <>
      <MoneyProvider>
        <Plantacoes />
      </MoneyProvider>
    </>
  );
}
