import express from 'express';
import { getProjects, getProjectById, createProjects } from '../controllers/projects';
import validateProjectBody from '../validations/projects';

const router = express.Router();

router
  .get('/', getProjects)
  .get('/:id', getProjectById)
  .post('/', validateProjectBody, createProjects);

export default router;
