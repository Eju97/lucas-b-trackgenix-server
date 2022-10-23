import request from 'supertest';
import app from '../app';
import Admins from '../models/Admins';
import adminsSeed from '../seed/admins';

describe('Admins - Unit tests', () => {
  beforeAll(async () => {
    await Admins.collection.insertMany(adminsSeed);
  });

  describe('GET /admins', () => {
    test('Should return status code 404 when the path is wrong.', async () => {
      const res = await request(app).get('/admin').send();
      expect(res.status).toBe(404);
    });
    test('Should return status code 200 and the admins.', async () => {
      const res = await request(app).get('/admins').send();
      expect(res.status).toBe(200);
      expect(res.body.error).toBeFalsy();
      expect(res.body.data.length).toBeGreaterThan(0);
    });
  });
});
