const express = require("express");
const next = require("next");
const session = require("express-session");
const MySQLStore = require("express-mysql-session")(session);
const mysql2 = require("mysql2/promise");
const bcrypt = require("bcrypt");

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

const port = process.env.PORT || 3000;

const sessionStore = new MySQLStore({
  host: "localhost",
  user: "root",
  password: "admin",
  database: "farm",
});

app
  .prepare()
  .then(() => {
    const server = express();

    // Session middleware
    server.use(
      session({
        key: "session_cookie_name",
        secret: "session_cookie_secret",
        store: sessionStore,
        resave: false,
        saveUninitialized: false,
      })
    );

    // Parse JSON bodies
    server.use(express.json());

    // Parse URL-encoded bodies
    server.use(express.urlencoded({ extended: true }));

    server.post("/api/signup", async (req, res) => {
      const { email, senha, nome } = req.body;
      if (!email || !senha || !nome) {
        return res
          .status(400)
          .json({ message: "Todos os campos são obrigatórios" });
      }

      let connection;
      try {
        const connection = await mysql2.createConnection({
          host: process.env.DB_HOST,
          user: process.env.DB_USER,
          password: process.env.DB_PASSWORD,
          database: process.env.DB_NAME,
        });

        const [rows] = await connection.execute(
          "SELECT * FROM users WHERE email = ?",
          [email]
        );

        if (rows.length > 0) {
          return res.status(422).json({ message: "Este usuário já existe" });
        }

        const hashedPassword = await bcrypt.hash(senha, 10);

        await connection.execute(
          "INSERT INTO users (email, password, nome) VALUES (?, ?, ?)",
          [email, hashedPassword, nome]
        );

        res.status(200).json({ message: "Usuário criado com sucesso" });
      } catch (error) {
        console.error(error);
        res
          .status(500)
          .json({ message: "Ocorreu um erro ao tentar cadastrar o usuário" });
      } finally {
        if (connection) {
          await connection.end();
        }
      }
    });

    server.get("/api/login", async (req, res) => {
      const { email, senha } = req.body;

      if (!email || !senha) {
        return res
          .status(400)
          .json({ message: "Email e senha são necessários" });
      }

      try {
        const connection = await mysql2.createConnection({
          host: process.env.DB_HOST,
          user: process.env.DB_USER,
          password: process.env.DB_PASSWORD,
          database: process.env.DB_NAME,
        });

        const [user] = await connection.execute(
          "SELECT * FROM users WHERE email =?",
          [email]
        );

        if (user.length === 0) {
          connection.end();
          return res.status(401).json({ message: "Email ou senha inválidos" });
        }

        const isValid = await bcrypt.compare(senha, user[0].password);

        if (!isValid) {
          connection.end();
          res.status(401).json({ message: "Email ou senha inválidos" });
        }

        req.session.user = { id: user[0].id, email: user[0].email };
        connection.end();
        res.json({ message: "Login efetuado com sucesso" });
      } catch (error) {
        console.error(error);
        res
          .status(500)
          .json({ message: "Ocorreu um erro ao tentar fazer o login" });
      }
    });

    // Your custom routes go here
    server.get("/api/hello", (req, res) => {
      res.json({ message: "Hello from the server!" });
    });

    // Handle all other routes with Next.js
    server.all("*", (req, res) => {
      return handle(req, res);
    });

    server.listen(port, (err) => {
      if (err) throw err;
      console.log(`> Ready on http://localhost:${port}`);
    });
  })
  .catch((ex) => {
    console.error(ex.stack);
    process.exit(1);
  });