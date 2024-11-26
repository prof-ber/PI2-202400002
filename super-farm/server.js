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

// MySQL connection options
const options = {
  host: "localhost",
  port: 3306,
  user: "root",
  password: "admin",
  database: "farm",
};

const connection = mysql2.createConnection(options);
const sessionStore = new MySQLStore({}, connection);

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

        await connection.query(
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
