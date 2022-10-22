import request from 'supertest';
import mongoose from 'mongoose';
import app from '../app';
import projects from '../models/Projects';
import projectSeed from '../seed/projects';

describe('Projects -Test', () => {
  let newProject;
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
  beforeAll(async () => {
    await projects.collection.insertMany(projectSeed);
  });

  describe('GET /projects', () => {
    test('should return the status code 200 and the list of projects', async () => {
      const response = await request(app).get('/projects').send();
      expect(response.status).toBe(200);
    });
    test('return false', async () => {
      const response = await request(app).get('/projects').send();
      expect(response.body.error).toBeFalsy();
    });
    test('return more than one project', async () => {
      const response = await request(app).get('/projects').send();
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
    test('should not create a project', async () => {
      const response = await request(app).post('/projects').send();
      expect(response.status).toBe(400);
      expect(response.body.error).toBeTruthy();
      expect(response.body.data).toBeUndefined();
    });
    test('Project not created because incorrect Project name', async () => {
      const response = await request(app).post('/projects').send({ mockedProject, name: 'a' });

      expect(response.status).toBe(400);
      expect(response.body.error).toBeTruthy();
    });
    test('Project not created because incorrect Project description', async () => {
      const response = await request(app).post('/projects').send(({ mockedProject, description: 'a' }));
      expect(response.status).toBe(400);
      expect(response.body.error).toBeTruthy();
    });
    test('Project not created because incorrect Project end date', async () => {
      const response = await request(app).post('/projects').send(({ mockedProject, endDate: 'a' }));
      expect(response.status).toBe(400);
      expect(response.body.error).toBeTruthy();
    });
    test('Project not created because incorrect Client name', async () => {
      const response = await request(app).post('/projects').send(({ mockedProject, clientName: 'a' }));
      expect(response.status).toBe(400);
      expect(response.body.error).toBeTruthy();
    });
    test('Project not created because incorrect Project start date', async () => {
      const response = await request(app).post('/projects').send(({ mockedProject, startDate: 'a' }));
      expect(response.status).toBe(400);
      expect(response.body.error).toBeTruthy();
    });
    test('Project not created because incorrect Project employee', async () => {
      const response = await request(app).post('/projects').send(({ mockedProject, employee: 'a' }));
      expect(response.status).toBe(400);
      expect(response.body.error).toBeTruthy();
    });
  });

  describe('PUT /projects', () => {
    beforeEach(async () => {
      newProject = await projects.create(mockedProject);
    });
    afterEach(async () => {
      await projects.findByIdAndUpdate(newProject.id);
    });
    test('should edit a project', async () => {
      const response = await request(app).put(`/projects/${newProject.id}`).send({ ...mockedProject, clientName: 'newName' });
      expect(response.status).toBe(200);
      expect(response.body.error).toBeFalsy();
    });
    test('should not edit the project because an error', async () => {
      const response = await request(app).put(`/projects/${invalidProjectId}`).send();
      expect(response.status).toBe(400);
      expect(response.body.error).toBeTruthy();
      expect(response.body.data).toBeUndefined();
    });
  });

  describe('DELETE /projects', () => {
    beforeEach(async () => {
      newProject = await projects.create(mockedProject);
    });
    test('should remove the project', async () => {
      const response = await request(app).delete(`/projects/${newProject.id}`).send();
      expect(response.status).toBe(200);
      expect(response.body.error).toBeFalsy();
    });
  });

  describe('GetById /projects', () => {
    beforeEach(async () => {
      newProject = await projects.create(mockedProject);
    });
    test('should get a project by ID', async () => {
      const response = await request(app).get(`/projects/${newProject.id}`).send();
      expect(response.status).toBe(200);
      expect(response.body.data).toBeDefined();
      const projectFound = await projects.findById(newProject.id);
      expect(projectFound).toBeDefined();
    });
    test('Project ID not found', async () => {
      const response = await request(app).get(`/projects/${invalidProjectId}`).send();
      expect(response.status).toBe(404);
      expect(response.body.error).toBeTruthy();
      expect(response.body.data).toBeNull();
    });
  });
});
