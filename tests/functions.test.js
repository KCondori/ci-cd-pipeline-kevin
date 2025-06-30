const request = require('supertest');
const express = require('express');

// Funciones de cálculo
const suma = (a, b) => a + b;
const resta = (a, b) => a - b;
const multiplica = (a, b) => a * b;

// App simulada para testear endpoints
const app = express();
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

describe('Funciones de cálculo simples', () => {
  test('suma: 2 + 3 = 5', () => {
    expect(suma(2, 3)).toBe(5);
  });

  test('resta: 5 - 7 = -2 (caso extremo negativo)', () => {
    expect(resta(5, 7)).toBe(-2);
  });

  test('multiplica: 0 * 100 = 0 (caso con cero)', () => {
    expect(multiplica(0, 100)).toBe(0);
  });
});

describe('Endpoints principales e integridad', () => {
  test('GET /suma funciona correctamente', async () => {
    const res = await request(app).get('/suma?a=10&b=15');
    expect(res.statusCode).toBe(200);
    expect(res.text).toBe('Resultado: 25');
  });

  test('GET /resta sin parámetro devuelve error 400', async () => {
    const res = await request(app).get('/resta?a=10');
    expect(res.statusCode).toBe(400);
    expect(res.text).toBe('Faltan parámetros "a" o "b"');
  });
});
