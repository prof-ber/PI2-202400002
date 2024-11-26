const express = require("express");
const next = require("next");
const session = require("express-session");
const MySQLStore = require("express-mysql-session")(session);
const mysql2 = require("mysql2");
const bcrypt = require("bcrypt"); // Corrigido para usar require

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

const port = process.env.PORT || 3000;

// MySQL connection options
const options = {
  host: "localhost",
  port: 3306,
  user: "your_mysql_user",
  password: "your_mysql_password",
  database: "your_database_name",
};

const connection = mysql2.createConnection(options).promise(); // Usando `.promise()` para facilitar o uso de async/await
const sessionStore = new MySQLStore({}, connection);

app
  .prepare()
  .then(() => {
    const server = express();

    // Middleware para parsing de JSON e URL-encoded
    server.use(express.json());
    server.use(express.urlencoded({ extended: true }));

    // Middleware para sessões
    server.use(
      session({
        key: "session_cookie_name",
        secret: "session_cookie_secret",
        store: sessionStore,
        resave: false,
        saveUninitialized: false,
      })
    );

    // Rota para registro de usuário
    server.post("/api/register", async (req, res) => {
      const { username, email, password } = req.body;

      if (!username || !email || !password) {
        return res
          .status(400)
          .json({ error: "Todos os campos são obrigatórios" });
      }

      try {
        // Hash da senha
        const saltRounds = 10;
        const passwordHash = await bcrypt.hash(password, saltRounds);

        // Inserir usuário no banco
        const query =
          "INSERT INTO users (username, email, password_hash) VALUES (?, ?, ?)";
        await connection.query(query, [username, email, passwordHash]);

        res.status(201).json({ message: "Usuário cadastrado com sucesso" });
      } catch (error) {
        console.error("Erro ao cadastrar usuário:", error);
        if (error.code === "ER_DUP_ENTRY") {
          return res.status(409).json({ error: "E-mail já cadastrado" });
        }
        res.status(500).json({ error: "Erro ao cadastrar usuário" });
      }
    });

    // Rota de teste
    server.get("/api/hello", (req, res) => {
      res.json({ message: "Hello from the server!" });
    });

    // Tratamento de todas as outras rotas com Next.js
    server.all("*", (req, res) => {
      return handle(req, res);
    });

    // Iniciar o servidor
    server.listen(port, (err) => {
      if (err) throw err;
      console.log(`> Ready on http://localhost:${port}`);
    });
  })
  .catch((ex) => {
    console.error(ex.stack);
    process.exit(1);
  });
