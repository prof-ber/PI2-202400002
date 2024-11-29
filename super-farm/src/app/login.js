"use client";
import React, { useState, useEffect } from "react";
import styles from "./login.module.css";
import Signup from "./cadastro";

export default function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [error, setError] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [account, setAccount] = useState(false);

  useEffect(() => {
    const loggedInUser = localStorage.getItem("user");
    if (loggedInUser) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch("http://localhost:3000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, senha }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Erro desconhecido");
      }

      const data = await response.json();
      localStorage.setItem("user", JSON.stringify(data.user));
      setIsLoggedIn(true);
      setEmail("");
      setSenha("");
    } catch (error) {
      setError("Erro ao fazer login: " + error.message);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    setIsLoggedIn(false);
  };

  const handleSignup = (showSignup = true) => {
    setAccount(showSignup);
  };

  return (
    <div className={styles.container}>
      <div className={styles.promptcontainer}>
        {isLoggedIn ? (
          <div className={styles.loggedin}>
            <p>Você está logado!</p>
            <button onClick={handleLogout} className={styles.button1}>
              Sair
            </button>
          </div>
        ) : account ? (
          <Signup onBack={() => handleSignup(false)} />
        ) : (
          <form onSubmit={handleSubmit} className={styles.form1}>
            <h2 className={styles.title}>Login</h2>
            <div className={styles.inputgroup}>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                required
                className={styles.input}
              />
            </div>
            <div className={styles.inputgroup}>
              <input
                type="password"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                placeholder="Senha"
                required
                className={styles.input}
              />
            </div>
            <button type="submit" className={styles.button1}>
              Entrar
            </button>
            <div className={styles.signupprompt}>
              <p>Não tem uma conta ainda?</p>
              <button
                onClick={() => handleSignup(true)}
                className={styles.signupbutton}
              >
                Criar uma conta
              </button>
              <p className={styles.benefits}>
                Crie uma conta para salvar seu progresso, competir com amigos e
                muito mais!
              </p>
            </div>
          </form>
        )}
        {error && <p className={styles.error}>{error}</p>}
      </div>
    </div>
  );
}
