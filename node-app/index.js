const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

const db = mysql.createConnection({
  host: 'mysql',
  user: 'root',
  password: 'rootpass',
  database: 'testdb'
});

db.connect(err => {
  if (err) {
    console.error('Error al conectar a MySQL:', err.message);
    return;
  }
  console.log('Conectado a MySQL');
});

// CREATE
app.post('/users', (req, res) => {
  const { name } = req.body;
  db.query('INSERT INTO users (name) VALUES (?)', [name], (err, result) => {
    if (err) return res.status(500).send(err.message);
    res.status(201).send({ id: result.insertId, name });
  });
});

// READ ALL
app.get('/users', (req, res) => {
  db.query('SELECT * FROM users', (err, results) => {
    if (err) return res.status(500).send(err.message);
    res.json(results);
  });
});

// READ ONE
app.get('/users/:id', (req, res) => {
  db.query('SELECT * FROM users WHERE id = ?', [req.params.id], (err, results) => {
    if (err) return res.status(500).send(err.message);
    if (results.length === 0) return res.status(404).send('Usuario no encontrado');
    res.json(results[0]);
  });
});

// UPDATE
app.put('/users/:id', (req, res) => {
  const { name } = req.body;
  db.query('UPDATE users SET name = ? WHERE id = ?', [name, req.params.id], (err) => {
    if (err) return res.status(500).send(err.message);
    res.send('Usuario actualizado');
  });
});

// DELETE
app.delete('/users/:id', (req, res) => {
  db.query('DELETE FROM users WHERE id = ?', [req.params.id], (err) => {
    if (err) return res.status(500).send(err.message);
    res.send('Usuario eliminado');
  });
});

app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
