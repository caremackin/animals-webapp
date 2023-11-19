const express = require('express')
const app = express()
const PORT = process.env.PORT || 3000;
const sqlite3 = require('sqlite3')
const path = require('path')

const cors = require('cors')
app.use(cors())

const dbfile = path.resolve(__dirname,'db', 'animaldb.sqlite');

console.log(dbfile)

let db = new sqlite3.Database(dbfile, sqlite3.OPEN_READWRITE, (err) => {
  if (err) {
    console.error(err.message);
  } else {
    console.log('Connected to the database.');
  }
});

const routes = require("./routes.js")
routes(app, db)
 
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`)
})

// console.log("This is my env", process.env);
// console.log('The value of PORT is:', process.env.PORT);

app.get('/animals', (req, res) => {
  db.all('SELECT * FROM animaltable', (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ data: rows });
  });
});
