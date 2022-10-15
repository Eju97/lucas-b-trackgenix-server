import express from 'express';
import { getProjects, getProjectById } from '../controllers/projects';

const router = express.Router();

router
  .get('/', getProjects)
  .get('/:id', getProjectById);

export default router;
