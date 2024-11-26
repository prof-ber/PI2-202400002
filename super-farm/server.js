const express = require("express");
const next = require("next");
const session = require("express-session");
const MySQLStore = require("express-mysql-session")(session);
const mysql2 = require("mysql2");

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
