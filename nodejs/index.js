const { randomInt } = require('crypto');
const express = require('express');
const mysql = require("mysql");

const dbConfig = {
  host: 'db',
  user: 'root',
  password: 'root',
  database: 'nodedb'
};
const connection = mysql.createConnection(dbConfig);
const names = ['Wesley', 'Lucas', 'Luis', 'Ana', 'Pamela', 'Pedro'];

const sql = `CREATE TABLE IF NOT EXISTS people(id int not null auto_increment, name varchar(255), primary key (id));`
connection.query(sql);

const app = express();
app.get('/', (req, res) => {
  const name = names[randomInt(names.length)];
  const insertStatement = `INSERT INTO people(name) VALUES ('${name}')`;
  connection.query(insertStatement);

  const selectStatement = 'SELECT name FROM people';
  connection.query(selectStatement, (error, results, fields) => {
    if (error) {
      return res.send(error);
    }
    let content = `<h1>Full Cycle Rocks!<h1><ul>${results.map(result => `<li>${result.name}</li>`).join('')}</ul>`;
    res.send(content);
  });
});
app.listen(3000, () => console.log('Listening on port 3000'));