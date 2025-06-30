const request = require('supertest');
const express = require('express');
const app = express();

app.get('/suma', (req, res) => {
  const { a, b } = req.query;
  if (!a || !b) return res.status(400).send('Faltan parámetros');
  res.send(`Resultado: ${Number(a) + Number(b)}`);
});

test('GET /suma funciona correctamente', async () => {
  const res = await request(app).get('/suma?a=5&b=3');
  expect(res.statusCode).toEqual(200);
  expect(res.text).toContain('8');
});
