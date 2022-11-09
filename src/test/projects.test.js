import request from 'supertest';
import mongoose from 'mongoose';
import app from '../app';
import projects from '../models/Projects';
import projectSeed from '../seed/projects';

describe('Projects - Test', () => {
  const invalidProjectId = '63543102f794c80a1abb24a6';
  const mockedProject = {
    clientName: 'Coca Cola',
    description: 'New web page for coca cola',
    endDate: '2022-03-25T03:00:00.000Z',
    name: 'Coca Cola Webpage',
    startDate: '2022-03-22T03:00:00.000Z',
    employees: [
      {
        employee: mongoose.Types.ObjectId('634c68f3658f142935ea7f6e'),
        rate: 20,
        role: 'DEV',
      },
    ],
  };
  const mockedEmployee = {
    employee: mongoose.Types.ObjectId('634c68f3658f142935ea7f6e'),
    rate: 20,
    role: 'DEV',
  };
  beforeAll(async () => {
    await projects.collection.insertMany(projectSeed);
  });

  describe('GET /projects', () => {
    test('should return the status code 200 and the list of projects', async () => {
      const response = await request(app).get('/projects').send();
      expect(response.status).toBe(200);
      expect(response.body.error).toBeFalsy();
      expect(response.body.data.length).toEqual(4);
    });
  });

  describe('POST /projects', () => {
    test('should create a project', async () => {
      const response = await request(app).post('/projects').send(mockedProject);
      expect(response.status).toBe(201);
      expect(response.body.error).toBeFalsy();
      expect(response.body.data).toMatchObject([{
        name: mockedProject.name,
        clientName: mockedProject.clientName,
        description: mockedProject.description,
        startDate: mockedProject.startDate,
        endDate: mockedProject.endDate,
        employees: mockedProject.employees,
      }]);
    });

    test('should not create a project when there is not body', async () => {
      const response = await request(app).post('/projects').send();
      expect(response.status).toBe(400);
      expect(response.body.error).toBeTruthy();
      expect(response.body.data).toBeUndefined();
    });

    test('should not create a project when the user send an invalid project name', async () => {
      const response = await request(app).post('/projects').send({ mockedProject, name: 'a' });
      expect(response.status).toBe(400);
      expect(response.body.error).toBeTruthy();
      expect(response.body.message[0].message).toEqual('"name" length must be at least 3 characters long');
    });

    test('should not create a project when the user sends an invalid project description', async () => {
      const response = await request(app).post('/projects').send(({ mockedProject, description: 'a' }));
      expect(response.status).toBe(400);
      expect(response.body.error).toBeTruthy();
      expect(response.body.message[0].message).toEqual('"name" is required');
    });

    test('should not create a project when the user sends an invalid project endDate', async () => {
      const response = await request(app).post('/projects').send(({ mockedProject, endDate: 'a' }));
      expect(response.status).toBe(400);
      expect(response.body.error).toBeTruthy();
      expect(response.body.message[0].message).toEqual('"name" is required');
    });

    test('should not create a project when the user sends an invalid project clientName', async () => {
      const response = await request(app).post('/projects').send(({ mockedProject, clientName: 'a' }));
      expect(response.status).toBe(400);
      expect(response.body.error).toBeTruthy();
      expect(response.body.message[0].message).toEqual('"name" is required');
    });

    test('should not create a project when the user sends an invalid project startDate', async () => {
      const response = await request(app).post('/projects').send(({ mockedProject, startDate: 'a' }));
      expect(response.status).toBe(400);
      expect(response.body.error).toBeTruthy();
      expect(response.body.message[0].message).toEqual('"name" is required');
    });

    test('should not create a project when the user sends an invalid project employee', async () => {
      const response = await request(app).post('/projects').send(({ mockedProject, employee: 'a' }));
      expect(response.status).toBe(400);
      expect(response.body.error).toBeTruthy();
      expect(response.body.message[0].message).toEqual('"name" is required');
    });
  });

  describe('PUT /projects', () => {
    test('should edit a project', async () => {
      // eslint-disable-next-line no-underscore-dangle
      const response = await request(app).put(`/projects/${projectSeed[0]._id}`).send({ ...mockedProject, clientName: 'newName' });
      expect(response.status).toBe(200);
      expect(response.body.data).toBeDefined();
    });

    test('should not edit a project when the user sends a invalid project id', async () => {
      const response = await request(app).put(`/projects/${invalidProjectId}`).send();
      expect(response.status).toBe(400);
      expect(response.body.error).toBeTruthy();
      expect(response.body.data).toBeUndefined();
    });
  });

  describe('DELETE /projects', () => {
    test('should remove the project', async () => {
      // eslint-disable-next-line no-underscore-dangle
      const response = await request(app).delete(`/projects/${projectSeed[1]._id}`).send();
      expect(response.status).toBe(200);
      expect(response.body.error).toBeFalsy();
    });

    test('should return an error when the user sends an invalid id', async () => {
      const response = await request(app).delete(`/projects/${invalidProjectId}`).send();
      expect(response.status).toBe(404);
      expect(response.body.error).toBeTruthy();
      expect(response.body.message).toEqual('Project not found');
    });
  });

  describe('GetById /projects', () => {
    test('should get a project by ID', async () => {
      // eslint-disable-next-line no-underscore-dangle
      const response = await request(app).get(`/projects/${projectSeed[2]._id}`).send();
      expect(response.status).toBe(200);
    });

    test('Project ID not found', async () => {
      const response = await request(app).get(`/projects/${invalidProjectId}`).send();
      expect(response.status).toBe(404);
      expect(response.body.error).toBeTruthy();
      expect(response.body.message).toEqual('Project not found');
    });
  });

  describe('PUT /projects/id:/assign', () => {
    test('should add a new employee to the project', async () => {
      // eslint-disable-next-line no-underscore-dangle
      const response = await request(app).put(`/projects/${projectSeed[2]._id}/assign`).send(mockedEmployee);
      expect(response.status).toBe(200);
      expect(response.body.error).toBeFalsy();
      expect(response.body.message).toEqual('Employee assigned to project successfully');
    });

    test('should return status code 404 when the user sends an invalid id', async () => {
      const response = await request(app).put(`/projects/${invalidProjectId}/assign`).send(mockedEmployee);
      expect(response.status).toBe(404);
      expect(response.body.error).toBeTruthy();
      expect(response.body.message).toEqual('Project not found');
    });

    test('should return status code 400 when the user sends an invalid body', async () => {
      // eslint-disable-next-line no-underscore-dangle
      const response = await request(app).put(`/projects/${projectSeed[2]._id}/assign`).send({
        ...mockedEmployee,
        role: 'BRO',
      });
      expect(response.status).toBe(400);
      expect(response.body.error).toBeTruthy();
      expect(response.body.data).toBeUndefined();
    });
  });
});
