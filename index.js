const express = require("express");
const path = require("path");

const {
  readDB,
  removeURL,
  addURL,
  containsURL,
  updateURLStatus,
} = require("./db");

require("dotenv").config();

const PING_INTERVAL_MINUTES = parseInt(process.env.PING_INTERVAL_MINUTES) || 2;

const app = express();

app.use(express.json());
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("index", { data: readDB(), pingInterval: PING_INTERVAL_MINUTES });
});

app.post("/db/delete", (req, res) => {
  if (req.body.password == process.env.MASTER_PASSWORD) {
    let url = req.body.url;
    if (url != "" && url) {
      if (containsURL(url)) {
        removeURL(url);
        res.json({ response: true });
      } else {
        res.status(400).json({ response: false, msg: "URL doesn't exist!" });
      }
    } else {
      res.status(400).json({ response: false, msg: "No URL specified!" });
    }
  } else {
    res.status(400).json({ response: false, msg: "Incorrect Password!" });
  }
});

app.post("/db/add", (req, res) => {
  if (req.body.password == process.env.MASTER_PASSWORD) {
    let url = req.body.url;
    if (url != "" && url) {
      if (!containsURL(url)) {
        addURL(url);
        res.json({ response: true });
      } else {
        res.status(400).json({ response: false, msg: "URL is already added!" });
      }
    } else {
      res.status(400).json({ response: false, msg: "No URL specified!" });
    }
  } else {
    res.status(400).json({ response: false, msg: "Incorrect Password!" });
  }
});

setInterval(() => {
  updateURLStatus();
}, PING_INTERVAL_MINUTES * 60 * 1000);

const PORT = parseInt(process.env.PORT);

app.listen(PORT, () => {
  console.log("Running on port " + PORT);
});
