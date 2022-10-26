import request from 'supertest';
import app from '../app';
import Tasks from '../models/Tasks';
import tasks from '../seed/tasks';

describe('Tasks - unit tests', () => {
  beforeAll(async () => {
    await Tasks.collection.insertMany(tasks);
  });

  const correctMockedTaskId = '63568fcc930a506d2400e17f';
  const wrongMockedTaskId = '5355c950520cf5e99219bb5a';
  const wrongTaskId = 5;

  const mockedTask = {
    description: 'Mocked task description',
  };

  describe('GET /tasks', () => {
    test('Should return a status code 200 and the list of tasks', async () => {
      const res = await request(app).get('/tasks').send();
      expect(res.status).toBe(200);
      expect(res.body.error).toBeFalsy();
      expect(res.body.data).toBeDefined();
      expect(res.body.message).toBe('Tasks found');
    });
  });

  describe('GET /tasks/:id', () => {
    test('Should return a status code 200 and a task when you send an existing valid id', async () => {
      const res = await request(app).get(`/tasks/${correctMockedTaskId}`).send();
      expect(res.status).toBe(200);
      expect(res.body.error).toBeFalsy();
      expect(res.body.data).toBeDefined();
      expect(res.body.message).toBe('Tasks found');
      expect(res.body.data).toMatchObject({
        _id: correctMockedTaskId,
      });
    });

    test('Should return status code 404 when you send a non existing id', async () => {
      const res = await request(app).get(`/tasks/${wrongMockedTaskId}`).send();
      expect(res.status).toBe(404);
      expect(res.body.error).toBeFalsy();
      expect(res.body.message).toBe('Task does not exists');
    });

    test('Should return status code 400 when you send an invalid id', async () => {
      const res = await request(app).get(`/tasks/${wrongTaskId}`).send();
      expect(res.status).toBe(400);
      expect(res.body.error).toBeTruthy();
    });
  });

  describe('DELETE /tasks/:id', () => {
    test('Should return a status code 200 and delete a task when you send an existing valid id', async () => {
      const res = await request(app).delete(`/tasks/${correctMockedTaskId}`).send();
      expect(res.status).toBe(200);
      expect(res.body.error).toBeFalsy();
      expect(res.body.message).toBe(`Task with Id ${correctMockedTaskId} deleted`);
    });

    test('Should return status code 404 when you send a non existing id', async () => {
      const res = await request(app).delete(`/tasks/${wrongMockedTaskId}`).send();
      expect(res.status).toBe(404);
      expect(res.body.error).toBeFalsy();
      expect(res.body.message).toBe(`Task with Id ${wrongMockedTaskId} does not exists`);
    });

    test('Should return status code 400 when you send an invalid id', async () => {
      const res = await request(app).delete(`/tasks/${wrongTaskId}`).send();
      expect(res.status).toBe(400);
      expect(res.body.error).toBeTruthy();
    });
  });

  describe('POST /tasks', () => {
    test('Should return a status code 201 and create a task', async () => {
      const res = await request(app).post('/tasks').send(mockedTask);
      expect(res.status).toBe(201);
      expect(res.body.error).toBeFalsy();
      expect(res.body.message).toBe('Task created successfully');
    });

    test('Should return status code 400 when the request body is empty', async () => {
      const res = await request(app).post('/tasks').send();
      expect(res.status).toBe(400);
      expect(res.body.error).toBeTruthy();
    });
  });

  describe('PUT /tasks/:id', () => {
    test('Should return a status code 200 and edit a task when you send an existing valid id', async () => {
      // eslint-disable-next-line no-underscore-dangle
      const res = await request(app).put(`/tasks/${tasks[0]._id}`).send(mockedTask);
      expect(res.status).toBe(200);
      expect(res.body.error).toBeFalsy();
      expect(res.body.data).toBeDefined();
      // eslint-disable-next-line no-underscore-dangle
      expect(res.body.message).toBe(`Task with Id ${tasks[0]._id} updated`);
      expect(res.body.data).toMatchObject({
        // eslint-disable-next-line no-underscore-dangle
        _id: tasks[0]._id,
        description: mockedTask.description,
      });
    });

    test('Should return status code 404 when you send a non existing id', async () => {
      const res = await request(app).put(`/tasks/${wrongMockedTaskId}`).send(mockedTask);
      expect(res.status).toBe(404);
      expect(res.body.error).toBeFalsy();
      expect(res.body.message).toBe(`Task with Id ${wrongMockedTaskId} does not exists`);
    });

    test('Should return status code 400 when you send an invalid id', async () => {
      const res = await request(app).put(`/tasks/${wrongTaskId}`).send(mockedTask);
      expect(res.status).toBe(400);
      expect(res.body.error).toBeTruthy();
    });
  });
});
