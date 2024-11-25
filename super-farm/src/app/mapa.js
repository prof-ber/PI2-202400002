"use client";
import styles from "./mapa.module.css";
import { useState, useEffect } from "react";
import Image from "next/image";

export default function Mapa() {
  const [crescimento, setCrescimento] = useState("semente");
  const [milhosColhidos, setMilhosColhidos] = useState(0);

  const plantarMilho = () => {
    setCrescimento("crescendo");

    // Após 5 segundos, o milho muda para o estado "pronto"
    setTimeout(() => {
      setCrescimento("pronto");
    }, 5000);
  };

  const colherMilho = () => {
    // Incrementa o contador de milhos colhidos e reinicia o ciclo de crescimento
    setMilhosColhidos(milhosColhidos + 1);
    setCrescimento("semente");
  };

  return (
    <>
      <div className={styles.container}>
        {/* Mostra a quantidade de milhos colhidos */}
        <div className={styles.milhosColhidos}>
          <p>Milhos Colhidos: {milhosColhidos}</p>
        </div>

        {/* Botão de plantar milho */}
        <div className={styles.buttonContainer} onClick={plantarMilho}>
          <img
            className={styles.imageoverlay}
            src="/casinha.png"
            alt="Imagem do botão para plantar milho"
          />
        </div>

        {/* Renderização da imagem de milho com base no estado de crescimento */}
        <div className={styles.terra}>
          {crescimento === "semente" && (
            <p>Plante o milho clicando na casinha</p>
          )}

          {crescimento === "crescendo" && (
            <Image
              src="/milho.1.png"
              alt="Milho Crescendo"
              width={200}
              height={200}
            />
          )}

          {crescimento === "pronto" && (
            <div onClick={colherMilho} style={{ cursor: "pointer" }}>
              <Image
                src="/milho.2.png"
                alt="Milho Pronto para Colher"
                width={200}
                height={200}
              />
              <p>Clique para colher o milho!</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
