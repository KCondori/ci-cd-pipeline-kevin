const request = require('supertest');
const express = require('express');
const config = require('../src/config');

const app = express();

app.get('/suma', (req, res) => {
  const { a, b } = req.query;
  if (a === undefined || b === undefined) return res.status(400).send('Faltan parámetros "a" o "b"');
  res.send(`Resultado: ${Number(a) + Number(b)}`);
});

app.get('/resta', (req, res) => {
  const { a, b } = req.query;
  if (a === undefined || b === undefined) return res.status(400).send('Faltan parámetros "a" o "b"');
  res.send(`Resultado: ${Number(a) - Number(b)}`);
});

app.get('/multiplica', (req, res) => {
  const { a, b } = req.query;
  if (a === undefined || b === undefined) return res.status(400).send('Faltan parámetros "a" o "b"');
  res.send(`Resultado: ${Number(a) * Number(b)}`);
});

describe('🤖 Test de Integración - Aplicación Completa', () => {
  test('flujo suma → resta → multiplicación con valores correctos', async () => {
    const res1 = await request(app).get('/suma?a=2&b=3');
    expect(res1.statusCode).toBe(200);
    expect(res1.text).toBe('Resultado: 5');

    const res2 = await request(app).get('/resta?a=5&b=2');
    expect(res2.statusCode).toBe(200);
    expect(res2.text).toBe('Resultado: 3');

    const res3 = await request(app).get('/multiplica?a=4&b=6');
    expect(res3.statusCode).toBe(200);
    expect(res3.text).toBe('Resultado: 24');
  });

  test('interacción: sumando un resultado previo encadenado', async () => {
    
    const resSum = await request(app).get('/suma?a=10&b=15');
    expect(resSum.statusCode).toBe(200);
    const sumResult = Number(resSum.text.split(': ')[1]);

    const resMul = await request(app).get(`/multiplica?a=${sumResult}&b=2`);
    expect(resMul.statusCode).toBe(200);
    expect(resMul.text).toBe(`Resultado: ${sumResult * 2}`);
  });
});
