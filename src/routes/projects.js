import express from 'express';
import { getProjects, getProjectById, createProjects } from '../controllers/projects';

const router = express.Router();

router
  .get('/', getProjects)
  .get('/:id', getProjectById)
  .post('/', createProjects);

export default router;
