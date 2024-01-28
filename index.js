const express = require("express");
const http = require("http");
const app = express();
const db = require("./api/utils/db/db");

app.use(express.json());

const port = process.env.PORT || 8080;

const server = http.createServer(app);


require("./api/services/user/user.routes")(app);

db.db.authenticate()
  .then(() => {
    console.log("Connection with DB has been established successfully.");
    server.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });
