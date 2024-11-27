"use client";
import { useState } from "react";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [nome, setNome] = useState("");
  const [error, setError] = useState("");
  const [debug, setDebug] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setDebug("");

    try {
      const response = await fetch("http://localhost:3000/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, senha, nome }),
      });
      if (!response.ok) {
        throw new Error(`Erro ${response.status}: ${response.statusText}`);
      } else {
        alert("Cadastrado com sucesso!");
        setEmail("");
        setSenha("");
        setNome("");
      }
    } catch (error) {
      alert("Erro ao cadastrar:", error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="nome">Nome:</label>
          <input
            type="text"
            id="nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="senha">Senha:</label>
          <input
            type="password"
            id="senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            required
          />
        </div>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <button type="submit">Cadastrar</button>
      </form>
      {debug && (
        <div style={{ marginTop: "20px", whiteSpace: "pre-wrap" }}>
          <h3>Debug Info:</h3>
          <pre>{debug}</pre>
        </div>
      )}
    </div>
  );
}
