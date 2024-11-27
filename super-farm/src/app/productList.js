"use client";
import { useMarket } from "./contexts/marketContext";
import styles from "./productList.module.css";

const ProductList = () => {
  const { products, updatePrice } = useMarket();

  return (
    <div className={styles.container}>
      <h2>Lista de Produtos</h2>
      <ul
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gridTemplateRows: "1fr 1fr",
          gridGap: "1vw",
          fontSize: "1.2rem",
        }}
      >
        {products.map((product) => (
          <li
            style={{ listStyleType: "none" }}
            key={product.id}
            className={styles.productitem}
          >
            <div>
              <span className={styles.productname}>{product.name}</span>
              <p className={styles.productprice}>R${product.price}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;
