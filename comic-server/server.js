const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 8000;

const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));

app.use(cors());

app.get("/comics", async (req, res) => {
  const response = await fetch(
    `https://comicvine.gamespot.com/api/issues/?api_key=${process.env.API_KEY}&sort=cover_date: desc&format=json`
  );
  res.json(await response.json());
});

app.get("/comic/:id", async (req, res) => {
  const { id } = req.params;
  const response = await fetch(
    `https://comicvine.gamespot.com/api/issue/4000-${id}/?api_key=${process.env.API_KEY}&format=json`
  );
  res.json(await response.json());
});

app.listen(port, () => {
  console.log(`API listening on http://localhost:${port}`);
});
