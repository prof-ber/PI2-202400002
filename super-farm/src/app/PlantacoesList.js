"use client";
import { usePlantacaoContext } from "./contexts/plantacaoContext";
import styles from "./plantacoesList.module.css"; // Estilos para o PlantacoesList

const PlantacoesList = () => {
  const { plantacoes, plantar, colher, acelerarCrescimento } =
    usePlantacaoContext();

  return (
    <div className={styles.container}>
      {plantacoes.length === 0 ? (
        <p>Nenhuma plantação disponível.</p>
      ) : (
        plantacoes.map((plantacao) => (
          <div key={plantacao.id} className={styles.plantacao}>
            <h3>{plantacao.nome}</h3>
            <p>Status: {plantacao.estado}</p>
            <p>
              Tempo de Crescimento: {plantacao.tempoCrescimento / 1000} segundos
            </p>

            <div className={styles.buttons}>
              {plantacao.estado === "semente" && (
                <button onClick={() => plantar(plantacao.id)}>Plantar</button>
              )}
              {plantacao.estado === "crescendo" && (
                <>
                  <button onClick={() => acelerarCrescimento(plantacao.id)}>
                    Acelerar Crescimento
                  </button>
                  <button onClick={() => colher(plantacao.id)}>Colher</button>
                </>
              )}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default PlantacoesList;
