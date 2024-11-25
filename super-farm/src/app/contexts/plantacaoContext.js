"use client";
import { createContext, useContext, useState, useEffect } from "react";
import { useMoney } from "../contexts/moneyContext"; // Importando o contexto de dinheiro
import { useProducts } from "../contexts/productContext"; // Importando o contexto de produtos

const PlantacaoContext = createContext();

export function PlantacaoProvider({ children }) {
  const [plantacoes, setPlantacoes] = useState([]);
  const { handleHarvest } = useProducts(); // Acessando a função de colheita do contexto de produtos

  const [money, setMoney, spendMoney] = useMoney(); // Acessando o contexto de dinheiro

  // Função para adicionar uma nova plantação
  const addPlantacao = (nome, tipo) => {
    const novaPlantacao = {
      id: plantacoes.length + 1,
      nome: nome,
      tipo: tipo,
      estado: "semente", // Semente inicialmente
      tempoCrescimento: 5000, // Tempo inicial de crescimento em milissegundos
      quantidade: 20, // Quantidade de produto inicialmente 0
      melhoria: 0, // Nível de melhoria da plantação
      inicioCrescimento: Date.now(), // Timestamp de quando o crescimento começou
    };
    setPlantacoes([...plantacoes, novaPlantacao]);
  };

  // Função para iniciar o crescimento da plantação
  const iniciarCrescimento = (id) => {
    setPlantacoes((prev) =>
      prev.map((plantacao) =>
        plantacao.id === id && plantacao.estado === "semente"
          ? {
              ...plantacao,
              estado: "crescendo",
              inicioCrescimento: Date.now(), // Atualiza o timestamp do crescimento
            }
          : plantacao
      )
    );
  };

  // Função para verificar se a plantação cresceu
  const verificarCrescimento = () => {
    setPlantacoes((prev) =>
      prev.map((plantacao) => {
        if (plantacao.estado === "crescendo") {
          const tempoPassado = Date.now() - plantacao.inicioCrescimento;
          if (tempoPassado >= plantacao.tempoCrescimento) {
            return {
              ...plantacao,
              estado: "pronto", // A plantação agora está pronta para ser colhida
            };
          }
        }
        return plantacao;
      })
    );
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      verificarCrescimento();
    }, 1000); // Verifica o crescimento a cada 1 segundo
    return () => clearInterval(intervalId); // Limpa o intervalo quando o componente for desmontado
  }, [plantacoes]);

  // Função para colher a plantação
  const colherPlantacao = (id) => {
    setPlantacoes((prev) =>
      prev.map((plantacao) =>
        plantacao.id === id && plantacao.estado === "pronto"
          ? {
              ...plantacao,
              estado: "colhido",
              quantidade:
                plantacao.tipo === "milho"
                  ? 50 * (plantacao.melhoria + 1) // Aumento com a melhoria
                  : 50 * (plantacao.melhoria + 1),
            }
          : plantacao
      )
    );

    // Permite replantar após a colheita
    setPlantacoes((prev) =>
      prev.map((plantacao) =>
        plantacao.id === id && plantacao.estado === "colhido"
          ? { ...plantacao, estado: "semente" }
          : plantacao
      )
    );

    // Atualizando os produtos no contexto de produtos
    const plantacaoColhida = plantacoes.find(
      (plantacao) => plantacao.id === id
    );
    if (plantacaoColhida) {
      const produto = plantacaoColhida.tipo;
      const quantidade = plantacaoColhida.quantidade;
      if (produto === "milho") {
        handleHarvest(produto, quantidade);
      } else if (produto === "morango") {
        handleHarvest(produto, quantidade);
      }
    }
  };

  // Função para melhorar a plantação
  const melhorarPlantacao = (id) => {
    const baseCustoMelhoria = 200; // Custo inicial de melhoria
    const custoMelhoria =
      baseCustoMelhoria *
      Math.pow(1.5, plantacoes.find((p) => p.id === id).melhoria); // Cálculo do aumento de 50% a cada melhoria

    // Verifica se o jogador tem dinheiro suficiente antes de realizar a melhoria
    if (spendMoney(custoMelhoria)) {
      setPlantacoes((prev) =>
        prev.map((plantacao) =>
          plantacao.id === id && plantacao.estado === "crescendo"
            ? {
                ...plantacao,
                melhoria:
                  plantacao.melhoria < 5
                    ? plantacao.melhoria + 1 // Aumenta o nível de melhoria se for menor que 5
                    : plantacao.melhoria, // Não aumenta se já atingiu o limite
                tempoCrescimento: plantacao.tempoCrescimento - 1000, // Reduz o tempo de crescimento
              }
            : plantacao
        )
      );

      // Verifica se o limite de melhoria foi atingido e exibe um alerta
      const plantacao = plantacoes.find((p) => p.id === id);
      if (plantacao && plantacao.melhoria >= 5) {
        alert("Limite de melhorias atingido para esta plantação!");
      }
    } else {
      alert(
        `Dinheiro insuficiente para melhorar a plantação! Custo atual: $${custoMelhoria.toFixed(
          2
        )}`
      );
    }
  };

  return (
    <PlantacaoContext.Provider
      value={{
        plantacoes,
        addPlantacao,
        iniciarCrescimento,
        colherPlantacao,
        melhorarPlantacao,
      }}
    >
      {children}
    </PlantacaoContext.Provider>
  );
}

export function usePlantacaoContext() {
  const context = useContext(PlantacaoContext);
  if (context === undefined) {
    throw new Error(
      "usePlantacaoContext must be used within a PlantacaoProvider"
    );
  }
  return context;
}
