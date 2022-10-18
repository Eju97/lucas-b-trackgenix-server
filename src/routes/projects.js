import express from 'express';
import {
  getProjects, getProjectById, createProjects, deleteProject, editProject, assignEmployee,
} from '../controllers/projects';
import validateProjectBody from '../validations/projects';

const router = express.Router();

router
  .get('/', getProjects)
  .get('/:id', getProjectById)
  .post('/', validateProjectBody, createProjects)
  .put('/:id', editProject)
  .put('/:id/assign', assignEmployee)
  .delete('/:id', deleteProject);

export default router;
