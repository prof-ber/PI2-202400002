"use client";
import { useState } from "react";
import { usePlantacaoContext } from "./contexts/plantacaoContext";
import { useMoney } from "./contexts/moneyContext";
import styles from "./casa.module.css";

export default function Casa() {
  const [money, setMoney, spendMoney] = useMoney();
  const {
    plantacoes,
    addPlantacao,
    iniciarCrescimento,
    colherPlantacao,
    melhorarPlantacao,
  } = usePlantacaoContext();

  const [precoPlantacao, setPrecoPlantacao] = useState(500); // Preço para criar a nova plantação
  const [precoMelhoria, setPrecoMelhoria] = useState(200); // Preço para melhoria

  const handleCriarPlantacao = (nome, tipo) => {
    if (money >= precoPlantacao) {
      addPlantacao(nome, tipo);
      spendMoney(precoPlantacao); // Deduz o dinheiro ao criar a plantação
      setPrecoPlantacao(Math.ceil(precoPlantacao * 2)); // Aumenta o preço da próxima plantação em 50%
    } else {
      alert("Dinheiro insuficiente para criar uma nova plantação.");
    }
  };

  const handleMelhorar = (id) => {
    // Realiza a melhoria e ajusta o preço da melhoria
    if (money >= precoMelhoria) {
      melhorarPlantacao(id); // Chama a função de melhoria
      spendMoney(precoMelhoria); // Deduz o dinheiro pela melhoria
      setPrecoMelhoria(Math.ceil(precoMelhoria * 2)); // Aumenta o preço da melhoria em 50%
    } else {
      alert("Dinheiro insuficiente para melhorar a plantação.");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.buttonContainer}>
        <button
          onClick={() =>
            handleCriarPlantacao(`Plantação ${plantacoes.length + 1}`, "milho")
          }
          className={styles.button1}
        >
          Criar Plantação de Milho (Preço: {precoPlantacao} 💰)
        </button>
        <button
          onClick={() =>
            handleCriarPlantacao(
              `Plantação ${plantacoes.length + 1}`,
              "morango"
            )
          }
          className={styles.button1}
        >
          Criar Plantação de Morango (Preço: {precoPlantacao} 💰)
        </button>
      </div>

      <div className={styles.containerfilho}>
        {plantacoes.length === 0 ? (
          <p>Nenhuma plantação disponível.</p>
        ) : (
          plantacoes.map((plantacao) => (
            <div className={styles.house} key={plantacao.id}>
              <h3>{plantacao.nome}</h3>
              <p>Status: {plantacao.estado}</p>
              <p>Melhoria: {plantacao.melhoria}</p>
              <div className={styles.caixabotao}>
                <button
                  onClick={() => iniciarCrescimento(plantacao.id)}
                  disabled={plantacao.estado !== "semente"}
                  className={styles.buttonbrown}
                >
                  Plantar
                </button>
                <button
                  onClick={() => colherPlantacao(plantacao.id)}
                  disabled={plantacao.estado !== "pronto"}
                  className={styles.buttonyellow}
                >
                  Colher (Quantidade: {plantacao.quantidade})
                </button>
                <button
                  onClick={() => handleMelhorar(plantacao.id)}
                  disabled={plantacao.estado !== "crescendo"}
                  className={styles.buttongolden}
                >
                  Melhorar (Custo: {precoMelhoria} 💰)
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
