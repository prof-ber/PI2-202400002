"use client";
import styles from "./plantacoes.module.css";
import { useState } from "react";
import { useMoney } from "./contexts/moneyContext";

export default function Plantacoes() {
  const [money, getMoney, spendMoney] = useMoney();
  const [precoPlantar, setPrecoPlantar] = useState("");
  const [precoVender, setPrecoVender] = useState("");
  const [precoManutencao, setPrecoManutencao] = useState("");

  const handlePlantar = () => {
    const preco = Number(precoPlantar);
    if (preco > 0 && spendMoney(preco)) {
      console.log("Você plantou com sucesso!");
      setPrecoPlantar("");
    }
  };

  const handleColher = () => {
    const preco = Number(precoManutencao);
    if (preco > 0 && spendMoney(preco)) {
      console.log("Você colheu com sucesso!");
      setPrecoManutencao("");
    }
  };

  const handleVender = () => {
    const preco = Number(precoVender);
    if (preco > 0 && spendMoney(preco)) {
      console.log("Você vendeu com sucesso!");
      setPrecoVender("");
    }
  };
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
            <button className={styles.colheita} onClick={handleColher}>
              Colher
            </button>
          </div>
          <div className={styles.price}>
            <input
              type="number"
              placeholder="Insira o preço aqui"
              className={styles.input1}
              value={precoManutencao}
              onChange={(e) => setPrecoManutencao(e.target.value)}
            />
          </div>
          <div className={styles.grow}>
            <button className={styles.cultivar} onClick={handlePlantar}>
              Plantar
            </button>
          </div>
          <div className={styles.price}>
            <input
              type="number"
              placeholder="Insira o preço aqui"
              className={styles.input1}
              value={precoPlantar}
              onChange={(e) => setPrecoPlantar(e.target.value)}
            />
          </div>
          <div className={styles.sell}>
            <button className={styles.venda} onClick={handleVender}>
              Vender
            </button>
          </div>
          <div className={styles.price}>
            <input
              type="number"
              placeholder="Insira o preço aqui"
              className={styles.input1}
              value={precoVender}
              onChange={(e) => setPrecoVender(e.target.value)}
            />
          </div>
        </div>
      </div>
    </>
  );
}
