import { MarketProvider } from "./contexts/marketContext";
import ProductList from "./productList";
import styles from "./market.module.css";

export default function Market() {
  return (
    <MarketProvider>
      <div className={styles.container}>
        <h1 className={styles.title}>Mercado</h1>
        <ProductList />
      </div>
    </MarketProvider>
  );
}
