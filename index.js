const express = require('express');
const config = require('./src/config');
const app = express();
const port = process.env.PORT || config.port;

app.get('/', (req, res) => {
  res.send('¡Hola Mundo desde CI/CD!');
});

app.get('/suma', (req, res) => {
  const { a, b } = req.query;
  if (a === undefined || b === undefined) {
    return res.status(400).send('Faltan parámetros "a" o "b"');
  }
  const result = Number(a) + Number(b);
  res.send(`Resultado: ${result}`);
});

app.get('/resta', (req, res) => {
  const { a, b } = req.query;
  if (a === undefined || b === undefined) {
    return res.status(400).send('Faltan parámetros "a" o "b"');
  }
  const result = Number(a) - Number(b);
  res.send(`Resultado: ${result}`);
});

app.get('/multiplica', (req, res) => {
  const { a, b } = req.query;
  if (a === undefined || b === undefined) {
    return res.status(400).send('Faltan parámetros "a" o "b"');
  }
  const result = Number(a) * Number(b);
  res.send(`Resultado: ${result}`);
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('¡Error en el servidor!');
});

app.listen(port, () => {
  console.log(`🚀 Servidor corriendo en puerto ${port} modo ${process.env.NODE_ENV || 'default'}`);
});
