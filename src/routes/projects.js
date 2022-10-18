import express from 'express';
import {
  getProjects, getProjectById, createProjects, deleteProject,
} from '../controllers/projects';
import validateProjectBody from '../validations/projects';

const router = express.Router();

router
  .get('/', getProjects)
  .get('/:id', getProjectById)
  .post('/', validateProjectBody, createProjects)
  .delete('/:id', deleteProject);

export default router;
