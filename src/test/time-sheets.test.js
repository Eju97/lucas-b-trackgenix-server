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

const validId = '635321207ca59575d18db35b';
const invalidId = '635321207ca59575d18db35b2';
const shorterId = '635325a5c39a0040ecf7a86';
const largerId = '635325a5c39a0040ecf7a8601';
const notFoundId = '635325a5c39a0040ecf7a861';

const mockedTimeSheet = {
  description: 'Example for testing with jest in timesheet',
  date: '2022-03-22T03:00:00.000Z',
  hours: 15,
  task: mongoose.Types.ObjectId('635325a5c39a0040ecf7a860'),
  employee: mongoose.Types.ObjectId('635325adc90228d7485c0e1f'),
  project: mongoose.Types.ObjectId('63532304206881f4ae0b709b'),
};

const mockedWrongTimeSheet = {
  invalid: 'This field is not valid',
  description: 'Example for testing with jest in timesheet',
  date: '2022-03-22T03:00:00.000Z',
  hours: 15,
  task: mongoose.Types.ObjectId('635325a5c39a0040ecf7a860'),
  employee: mongoose.Types.ObjectId('635325adc90228d7485c0e1f'),
  project: mongoose.Types.ObjectId('63532304206881f4ae0b709b'),
};

const mockedIncompleteTimeSheet = {
  invalid: 'This field is not valid',
  description: 'Example for testing with jest in timesheet',
  hours: 15,
  task: mongoose.Types.ObjectId('635325a5c39a0040ecf7a860'),
  employee: mongoose.Types.ObjectId('635325adc90228d7485c0e1f'),
  project: mongoose.Types.ObjectId('63532304206881f4ae0b709b'),
};

// eslint-disable-next-line no-underscore-dangle
const timesheetId = timeSheetSeed[0]._id;

describe('Time-sheet - Unit tests', () => {
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

  describe('GET by ID /time-sheets', () => {
    test('status should be 200 and get an object from the timesheet', async () => {
      const response = await request(app).get(`/time-sheets/${validId}`).send();
      expect(response.status).toBe(200);
      expect(response.body.error).toBeFalsy();
      expect(response.body.data).toMatchObject({
        _id: timesheetId,
      });
    });

    test('status should be 404 not get an employee when the id is not in the DB', async () => {
      const response = await request(app).get(`/time-sheets/${notFoundId}`).send();
      expect(response.status).toBe(404);
      expect(response.body.error).toBeTruthy();
    });

    test('status should be 500 and not get an employee when the id is invalid', async () => {
      const response = await request(app).get(`/time-sheets/${shorterId}`).send();
      expect(response.status).toBe(500);
      expect(response.body.error).toBeTruthy();
      expect(response.body.data).not.toBeDefined();
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
        ...mockedTimeSheet,
        description: 'no',
      });
      expect(response.status).toBe(400);
      expect(response.body.error).toBeTruthy();
      expect(response.body.data).toBe(undefined);
    });

    test('status should be 400 when the description is larger than 300 characters', async () => {
      const response = await request(app).post('/time-sheets').send({
        ...mockedTimeSheet,
        description: 'Should not work, phrase repeted till 301 character.'
        + 'Should not work, phrase repeted till 301 character.Should not work, phrase repeted till 301 character.'
        + 'Should not work, phrase repeted till 301 character.Should not work, phrase repeted till 301 character.'
        + 'Should not work, phrase repeted till 301 character.',
      });
      expect(response.status).toBe(400);
      expect(response.body.error).toBeTruthy();
      expect(response.body.data).toBe(undefined);
    });

    test('status should be 400 when the date is not ISO formated', async () => {
      const response = await request(app).post('/time-sheets').send({
        ...mockedTimeSheet,
        date: '23/10/2022',
      });
      expect(response.status).toBe(400);
      expect(response.body.error).toBeTruthy();
      expect(response.body.data).toBe(undefined);
    });

    test('status should be 400 when the hours are negative', async () => {
      const response = await request(app).post('/time-sheets').send({
        ...mockedTimeSheet,
        hours: -20,
      });
      expect(response.status).toBe(400);
      expect(response.body.error).toBeTruthy();
      expect(response.body.data).toBe(undefined);
    });

    test('status should be 400 when the task is shorter than 24 character', async () => {
      const response = await request(app).post('/time-sheets').send({
        ...mockedTimeSheet,
        task: shorterId,
      });
      expect(response.status).toBe(400);
      expect(response.body.error).toBeTruthy();
      expect(response.body.data).toBe(undefined);
    });

    test('status should be 400 when the task is larger than 24 character', async () => {
      const response = await request(app).post('/time-sheets').send({
        ...mockedTimeSheet,
        task: largerId,
      });
      expect(response.status).toBe(400);
      expect(response.body.error).toBeTruthy();
      expect(response.body.data).toBe(undefined);
    });

    test('status should be 400 when the employee is shorter than 24 character', async () => {
      const response = await request(app).post('/time-sheets').send({
        ...mockedTimeSheet,
        employees: shorterId,
      });
      expect(response.status).toBe(400);
      expect(response.body.error).toBeTruthy();
      expect(response.body.data).toBe(undefined);
    });

    test('status should be 400 when the employee is larger than 24 character', async () => {
      const response = await request(app).post('/time-sheets').send({
        ...mockedTimeSheet,
        employees: largerId,
      });
      expect(response.status).toBe(400);
      expect(response.body.error).toBeTruthy();
      expect(response.body.data).toBe(undefined);
    });

    test('status should be 400 when the project is shorter than 24 character', async () => {
      const response = await request(app).post('/time-sheets').send({
        ...mockedTimeSheet,
        project: shorterId,
      });
      expect(response.status).toBe(400);
      expect(response.body.error).toBeTruthy();
      expect(response.body.data).toBe(undefined);
    });

    test('status should be 400 when the project is larger than 24 character', async () => {
      const response = await request(app).post('/time-sheets').send({
        ...mockedTimeSheet,
        project: largerId,
      });
      expect(response.status).toBe(400);
      expect(response.body.error).toBeTruthy();
      expect(response.body.data).toBe(undefined);
    });
  });

  describe('PUT /time-sheets', () => {
    test('status should be 200 and must return an edited time-sheet', async () => {
      const response = await request(app).put(`/time-sheets/${timesheetId}`).send({
        ...mockedTimeSheet,
        description: 'New description',
      });
      expect(response.status).toBe(200);
      expect(response.body.error).toBeFalsy();
      expect(response.body.data).toMatchObject({
        _id: timesheetId,
      });
      expect(response.body.data.description).toBe('New description');
    });

    test('status should be 400 and not edit anything when the body is invalid', async () => {
      const response = await request(app).put(`/time-sheets/${timesheetId}`).send({
        ...mockedWrongTimeSheet,
        description: 'New description',
      });
      expect(response.status).toBe(400);
      expect(response.body.error).toBeTruthy();
      expect(response.body.data).not.toBeDefined();
    });

    test('status should be 400 and not edit anything when the body is empty', async () => {
      const response = await request(app).put(`/time-sheets/${timesheetId}`).send();
      expect(response.status).toBe(400);
      expect(response.body.error).toBeTruthy();
      expect(response.body.data).not.toBeDefined();
    });

    test('status should be 400 when a required field is not in the body', async () => {
      const response = await request(app).put(`/time-sheets/${timesheetId}`).send({
        ...mockedIncompleteTimeSheet,
        description: 'New description',
      });
      expect(response.status).toBe(400);
      expect(response.body.error).toBeTruthy();
      expect(response.body.data).not.toBeDefined();
    });

    test('status should be 400 when the description is shorter than 3', async () => {
      const response = await request(app).put(`/time-sheets/${timesheetId}`).send({
        ...mockedTimeSheet,
        description: 'Ne',
      });
      expect(response.status).toBe(400);
      expect(response.body.error).toBeTruthy();
      expect(response.body.data).not.toBeDefined();
    });

    test('status should be 400 when the description is larger than 300', async () => {
      const response = await request(app).put(`/time-sheets/${timesheetId}`).send({
        ...mockedTimeSheet,
        description: 'Should not work, phrase repeated till 313 character.'
        + 'Should not work, phrase repeated till 313 character.Should not work, phrase repeted till 301 character.'
        + 'Should not work, phrase repeated till 313 character.Should not work, phrase repeted till 301 character.'
        + 'Should not work, phrase repeated till 313 character.',
      });
      expect(response.status).toBe(400);
      expect(response.body.error).toBeTruthy();
      expect(response.body.data).not.toBeDefined();
    });

    test('status should be 400 when the date is not ISO formated', async () => {
      const response = await request(app).put(`/time-sheets/${timesheetId}`).send({
        ...mockedTimeSheet,
        date: '22-03-2022',
      });
      expect(response.status).toBe(400);
      expect(response.body.error).toBeTruthy();
      expect(response.body.data).not.toBeDefined();
    });

    test('status should be 400 when the hours are negative', async () => {
      const response = await request(app).put(`/time-sheets/${timesheetId}`).send({
        ...mockedTimeSheet,
        hours: -15,
      });
      expect(response.status).toBe(400);
      expect(response.body.error).toBeTruthy();
      expect(response.body.data).not.toBeDefined();
    });

    test('status should be 400 when the hours are not a number', async () => {
      const response = await request(app).put(`/time-sheets/${timesheetId}`).send({
        ...mockedTimeSheet,
        hours: 'String',
      });
      expect(response.status).toBe(400);
      expect(response.body.error).toBeTruthy();
      expect(response.body.data).not.toBeDefined();
    });

    test('status should be 400 when the task id is shorter than 24', async () => {
      const response = await request(app).put(`/time-sheets/${timesheetId}`).send({
        ...mockedTimeSheet,
        task: shorterId,
      });
      expect(response.status).toBe(400);
      expect(response.body.error).toBeTruthy();
      expect(response.body.data).not.toBeDefined();
    });

    test('status should be 400 when the task id is longer than 24', async () => {
      const response = await request(app).put(`/time-sheets/${timesheetId}`).send({
        ...mockedTimeSheet,
        task: largerId,
      });
      expect(response.status).toBe(400);
      expect(response.body.error).toBeTruthy();
      expect(response.body.data).not.toBeDefined();
    });

    test('status should be 400 when the employees id is shorter than 24', async () => {
      const response = await request(app).put(`/time-sheets/${timesheetId}`).send({
        ...mockedTimeSheet,
        employees: shorterId,
      });
      expect(response.status).toBe(400);
      expect(response.body.error).toBeTruthy();
      expect(response.body.data).not.toBeDefined();
    });

    test('status should be 400 when the employees id is longer than 24', async () => {
      const response = await request(app).put(`/time-sheets/${timesheetId}`).send({
        ...mockedTimeSheet,
        employees: largerId,
      });
      expect(response.status).toBe(400);
      expect(response.body.error).toBeTruthy();
      expect(response.body.data).not.toBeDefined();
    });

    test('status should be 400 when the project id is shorter than 24', async () => {
      const response = await request(app).put(`/time-sheets/${timesheetId}`).send({
        ...mockedTimeSheet,
        project: shorterId,
      });
      expect(response.status).toBe(400);
      expect(response.body.error).toBeTruthy();
      expect(response.body.data).not.toBeDefined();
    });

    test('status should be 400 when the project id is longer than 24', async () => {
      const response = await request(app).put(`/time-sheets/${timesheetId}`).send({
        ...mockedTimeSheet,
        project: largerId,
      });
      expect(response.status).toBe(400);
      expect(response.body.error).toBeTruthy();
      expect(response.body.data).not.toBeDefined();
    });

    test('status should be 404 and not edit anything when the id is not found', async () => {
      const response = await request(app).put(`/time-sheets/${notFoundId}`).send({
        ...mockedTimeSheet,
        description: 'New description',
      });
      expect(response.status).toBe(404);
      expect(response.body.error).toBeTruthy();
    });
  });

  describe('DELETE /time-sheets', () => {
    test('should delete user when user send an valid id', async () => {
      const response = await request(app).delete(`/time-sheets/${validId}`).send();
      expect(response.status).toBe(200);
      expect(response.body.error).toBeFalsy();
    });

    test('should not delete when the user sends an invalid id', async () => {
      const response = await request(app).delete(`/time-sheets/${invalidId}`).send();
      expect(response.status).toBe(500);
      expect(response.body.error).toBeTruthy();
      expect(response.body.data).toBeUndefined();
    });
  });
});
