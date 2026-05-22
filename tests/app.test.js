const request = require('supertest');
const { createApp } = require('../src/index');

describe('API HTTP (GET y POST)', () => {
  let app;
  beforeAll(() => { app = createApp(); });

  describe('GET /health', () => {
    it('responde 200 y JSON con ok', async () => {
      const res = await request(app).get('/health');
      expect(res.status).toBe(200);
      expect(res.body.ok).toBe(true);
    });
  });

  describe('GET /api/saludo', () => {
    it('saluda con nombre por query', async () => {
      const res = await request(app).get('/api/saludo').query({ nombre: 'Duoc' });
      expect(res.status).toBe(200);
      expect(res.body.mensaje).toContain('Duoc');
    });
  });

  describe('GET /api/suma', () => {
    it('suma a y b por query', async () => {
      const res = await request(app).get('/api/suma').query({ a: '4', b: '5' });
      expect(res.status).toBe(200);
      expect(res.body.resultado).toBe(9);
    });
    it('400 si parámetros inválidos', async () => {
      const res = await request(app).get('/api/suma').query({ a: 'x', b: '1' });
      expect(res.status).toBe(400);
    });
  });

  describe('POST /api/echo', () => {
    it('devuelve 201 y refleja el JSON enviado', async () => {
      const payload = { curso: 'AUY1104' };
      const res = await request(app).post('/api/echo').send(payload).set('Content-Type', 'application/json');
      expect(res.status).toBe(201);
      expect(res.body.recibido).toEqual(payload);
    });
  });

  describe('404', () => {
    it('ruta inexistente', async () => {
      const res = await request(app).get('/no/existe');
      expect(res.status).toBe(404);
    });
  });
});