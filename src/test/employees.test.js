import request from 'supertest';
import app from '../app';
import Employees from '../models/Employees';
import employeesSeed from '../seed/employees';

beforeAll(async () => {
  await Employees.collection.insertMany(employeesSeed);
});

describe('GET /employees', () => {
  test('should get code 200', async () => {
    const response = await request(app).get('/Employees').send();
    expect(response.status).toBe(200);
    expect(response.body.error).toBeFalsy();
    expect(response.body.data.length).toBeGreaterThan(0);
  });
});
