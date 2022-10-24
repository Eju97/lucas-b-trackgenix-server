import mongoose from 'mongoose';
import request from 'supertest';
import app from '../app';
import TimeSheets from '../models/Time-sheets';
import Employees from '../models/Employees';
import Projects from '../models/Projects';
import Tasks from '../models/Tasks';
import timeSheetSeed from '../seed/time-sheets';
import employeesSeed from '../seed/employees';
import projectsSeed from '../seed/projects';
import tasksSeed from '../seed/tasks';

const mockedTimeSheet = {
  description: 'Example for testing with jest in timesheet',
  date: '2022-03-22T03:00:00.000Z',
  hours: 15,
  task: mongoose.Types.ObjectId('635325a5c39a0040ecf7a860'),
  employees: mongoose.Types.ObjectId('635325adc90228d7485c0e1f'),
  project: mongoose.Types.ObjectId('63532304206881f4ae0b709b'),
};

const failedMockedTimeSheet = {
  description: 'Example for testing with jest in timesheet',
  date: '2022-03-22T03:00:00.000Z',
  hours: 'Twenty',
  task: mongoose.Types.ObjectId('635325a5c39a0040ecf7a860'),
  employees: mongoose.Types.ObjectId('635325adc90228d7485c0e1f'),
  project: mongoose.Types.ObjectId('63532304206881f4ae0b709b'),
};

const incorrectMongooseType = '635325a5c39a0040ecf7a860';

describe('TESTS endpoints /time-sheets', () => {
  beforeAll(async () => {
    await TimeSheets.collection.insertMany(timeSheetSeed);
    await Employees.collection.insertMany(employeesSeed);
    await Projects.collection.insertMany(projectsSeed);
    await Tasks.collection.insertMany(tasksSeed);
  });

  describe('GET /time-sheets', () => {
    test('status should be 200', async () => {
      const response = await request(app).get('/time-sheets').send();
      expect(response.status).toBe(200);
      expect(response.body.error).toBeFalsy();
      expect(response.body.data).toBeDefined();
      expect(response.body.data.length).toBeGreaterThan(0);
    });
    test('status should be 200, correct query, empty result', async () => {
      const response = await request(app).get('/time-sheets/?description=ThisWontWork').send();
      expect(response.status).toBe(200);
      expect(response.body.error).toBeFalsy();
      expect(response.body.data).toStrictEqual([]);
      expect(response.body.data.length).not.toBeGreaterThan(0);
    });
  });

  describe('POST /time-sheets', () => {
    test('status should be 201, should create a new time-sheet', async () => {
      const response = await request(app).post('/time-sheets').send(mockedTimeSheet);
      expect(response.status).toBe(201);
      expect(response.body.error).toBeFalsy();
      expect(response.body.data).toBeDefined();
    });
    test('status should be 400 if the body is empty', async () => {
      const response = await request(app).post('/time-sheets').send();
      expect(response.status).toBe(400);
      expect(response.body.error).toBeTruthy();
      expect(response.body.data).toBe(undefined);
    });
    test('status should be 400 when the description is shorter than 3 characters', async () => {
      const response = await request(app).post('/time-sheets').send({
        ...failedMockedTimeSheet,
        description: 'no',
      });
      expect(response.status).toBe(400);
      expect(response.body.error).toBeTruthy();
      expect(response.body.data).toBe(undefined);
    });
    test('status should be 400 when the description is larger than 300 characters', async () => {
      const response = await request(app).post('/time-sheets').send({
        ...failedMockedTimeSheet,
        description: 'Should not work, phrase repeted till 301 character.Should not work, phrase repeted till 301 character.Should not work, phrase repeted till 301 character.Should not work, phrase repeted till 301 character.Should not work, phrase repeted till 301 character.Should not work, phrase repeted till 301 character.',
      });
      expect(response.status).toBe(400);
      expect(response.body.error).toBeTruthy();
      expect(response.body.data).toBe(undefined);
    });
    test('status should be 400 when the date is not ISO formated', async () => {
      const response = await request(app).post('/time-sheets').send({
        ...failedMockedTimeSheet,
        date: '23/10/2022',
      });
      expect(response.status).toBe(400);
      expect(response.body.error).toBeTruthy();
      expect(response.body.data).toBe(undefined);
    });
    test('status should be 400 when the hours are negative', async () => {
      const response = await request(app).post('/time-sheets').send({
        ...failedMockedTimeSheet,
        hours: -20,
      });
      expect(response.status).toBe(400);
      expect(response.body.error).toBeTruthy();
      expect(response.body.data).toBe(undefined);
    });
    test('status should be 400 when the task is not an mongoose.Types.ObjectId from task', async () => {
      const response = await request(app).post('/time-sheets').send({
        ...failedMockedTimeSheet,
        task: incorrectMongooseType,
      });
      expect(response.status).toBe(400);
      expect(response.body.error).toBeTruthy();
      expect(response.body.data).toBe(undefined);
    });
    test('status should be 400 when the employee is not an mongoose.Types.ObjectId', async () => {
      const response = await request(app).post('/time-sheets').send({
        ...failedMockedTimeSheet,
        employee: incorrectMongooseType,
      });
      expect(response.status).toBe(400);
      expect(response.body.error).toBeTruthy();
      expect(response.body.data).toBe(undefined);
    });
    test('status should be 400 when the project is not an mongoose.Types.ObjectId', async () => {
      const response = await request(app).post('/time-sheets').send({
        ...failedMockedTimeSheet,
        employee: incorrectMongooseType,
      });
      expect(response.status).toBe(400);
      expect(response.body.error).toBeTruthy();
      expect(response.body.data).toBe(undefined);
    });
  });
});
