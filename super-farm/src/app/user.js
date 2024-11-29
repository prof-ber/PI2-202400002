import { useState, useEffect } from "react";
import Signup from "./cadastro"; //RENDERIZAR CADASTRO QUANDO O USUÁRIO CLICA EM CADASTRO E NÃO ESTIVER LOGADO
import Login from "./login"; //RENDERIZAR LOGIN POR PADRÃO
import Save from "./save"; //RENDERIZAR SALVAR QUANDO O USUÁRIO ESTIVER LOGADO
import styles from "./user.module.css";

export default function User() {
  const [account, setAccount] = useState(false);
  const [signup, setSignup] = useState(false);
  const [isLoggedIn, setUsuarioLogado] = useState(false);

  useEffect(() => {
    const checkUserSession = async () => {
      try {
        const response = await fetch("/api/logincheck");
        if (response.ok) {
          const data = await response.json();
          if (data.user) {
            setUsuarioLogado(true);
          } else {
            setUsuarioLogado(false);
          }
        } else {
          setUsuarioLogado(false);
        }
      } catch (error) {
        console.error("Error checking user session:", error);
        setUsuarioLogado(false);
      }
    };
    checkUserSession();
  });

  const handleClick = () => {
    setAccount(!account);
  };

  return (
    <>
      {account &&
        (isLoggedIn ? (
          //Renderizar aqui o botão de deslogar
          <div className={styles.loggedin}>
            <p>Você está logado!</p>
            <Save setAccount={setAccount} />
            <button
              onClick={() => {
                setUsuarioLogado(false);
                localStorage.removeItem("user");
                window.location.reload();
                fetch("/api/logout");
              }}
              className={styles.button1}
            >
              Sair
            </button>
          </div>
        ) : signup ? (
          <Signup setAccount={setAccount} setSignup={setSignup} />
        ) : (
          <Login setAccount={setAccount} setSignup={setSignup} />
        ))}
      <div className={styles.container} onClick={handleClick}>
        <img src="/userlight.svg" />
      </div>
    </>
  );
}
