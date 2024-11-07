import styles from "./plantacoes.module.css";

export default function Plantacoes() {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.cabecalho}>
          <div className={styles.plant}>
            <h1>
              Progresso da <span className={styles.goodcolor}>Plantação</span>
            </h1>
          </div>
          <div className={styles.keep}>
            <h1>
              <span className={styles.money}>
                {" "}
                <img
                  style={{ display: "inline", width: "4rem", height: "auto" }}
                  src="/money.svg"
                />
                Dinheiro
              </span>{" "}
              gasto para manter
            </h1>
          </div>
        </div>
        <div className={styles.containerfilho}>
          <div className={styles.harvest}>
            <button className={styles.colheita}>Colher</button>
          </div>
          <div className={styles.price}>
            <input
              type="Number"
              placeholder="Insira o preço aqui"
              className={styles.input1}
            />
          </div>
          <div className={styles.grow}>
            <button className={styles.cultivar}>Plantar</button>
          </div>
          <div className={styles.price}>
            <input
              type="Number"
              placeholder="Insira o preço aqui"
              className={styles.input1}
            />
          </div>
          <div className={styles.sell}>
            <button className={styles.venda}>Vender</button>
          </div>
          <div className={styles.price}>
            <input
              type="Number"
              placeholder="Insira o preço aqui"
              className={styles.input1}
            />
          </div>
        </div>
      </div>
    </>
  );
}
