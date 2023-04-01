const fs = require("fs");
const fetch = require("cross-fetch");

function readDB() {
  let db = fs.readFileSync("./db.json");

  return JSON.parse(db);
}

function writeDB(db) {
  fs.writeFileSync("./db.json", JSON.stringify(db, null, 2));
}

function addURL(url) {
  let db = readDB();

  db.push({ url: url, online: false });

  writeDB(db);
}

function removeURL(url) {
  let db = readDB();
  for (var i = 0; i < db.length; i++) {
    if (db[i].url === url) {
      db.splice(i, 1);
      break;
    }
  }

  writeDB(db);
}

function containsURL(url) {
  let db = readDB();

  for (var i = 0; i < db.length; i++) {
    if (db[i].url === url) {
      return true;
    }
  }
  return false;
}

async function updateURLStatus() {
  const db = readDB();
  for (var i = 0; i < db.length; i++) {
    try {
      console.log("Pinging " + db[i].url);
      const response = await fetch(db[i].url);
      if (response.status == 200) {
        db[i].online = true;
      } else {
        db[i].online = false;
      }
    } catch (error) {
      db[i].online = false;
    }
  }

  writeDB(db);
}

module.exports = {
  readDB,
  writeDB,
  addURL,
  removeURL,
  containsURL,
  updateURLStatus,
};
