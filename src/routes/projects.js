import express from 'express';
import {
  getProjects, getProjectById, createProjects, deleteProject, editProject, assignEmployee,
} from '../controllers/projects';
import { validateProjectBody, validateEmployeeBody } from '../validations/projects';

const router = express.Router();

router
  .get('/', getProjects)
  .get('/:id', getProjectById)
  .post('/', validateProjectBody, createProjects)
  .put('/:id', validateProjectBody, editProject)
  .put('/:id/assign', validateEmployeeBody, assignEmployee)
  .delete('/:id', deleteProject);

export default router;
