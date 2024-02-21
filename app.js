const express = require("express");
const app = express();
const { createDatabaseAndTable } = require("./src/configs/db.config");
require("dotenv").config();

const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use("/", (req, res) => {
  res.send("Welcome to the server...");
});

// initialize db and create schemas
createDatabaseAndTable();

app.listen(PORT, () => {
  console.log("Server Started on Port:", PORT);
});
