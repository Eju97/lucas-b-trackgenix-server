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

describe('Time-sheet - Unit tests', () => {
  beforeAll(async () => {
    await TimeSheets.collection.insertMany(timeSheetSeed);
    await Employees.collection.insertMany(employeesSeed);
    await Projects.collection.insertMany(projectsSeed);
    await Tasks.collection.insertMany(tasksSeed);
  });

  describe('DELETE /time-sheets', () => {
    test('should delete user when user send an valid id', async () => {
      const response = await request(app).delete(`/time-sheets/${validId}`).send();
      expect(response.status).toBe(200);
      expect(response.body.error).toBeFalsy();
    });

    test('should not delete when the user sends an invalid id', async () => {
      const response = await request(app).delete(`/time-sheets/${invalidId}`).send();
      expect(response.status).toBe(404);
      expect(response.body.error).toBeTruthy();
      expect(response.body.data).toBeUndefined();
    });
  });
});
