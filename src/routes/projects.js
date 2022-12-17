import express from 'express';
import {
  getProjects, getProjectById, createProjects, deleteProject, editProject, assignEmployee,
} from '../controllers/projects';
import { validateProjectBody, validateEmployeeBody } from '../validations/projects';
import checkAuth from '../middlewares/authMiddleware';

const router = express.Router();

router
  .get('/', checkAuth(['SUPER_ADMIN', 'ADMIN', 'EMPLOYEE']), getProjects)
  .get('/:id', checkAuth(['SUPER_ADMIN', 'ADMIN', 'EMPLOYEE']), getProjectById)
  .post('/', checkAuth(['SUPER_ADMIN', 'ADMIN']), validateProjectBody, createProjects)
  .put('/:id', checkAuth(['SUPER_ADMIN', 'ADMIN', 'EMPLOYEE']), validateProjectBody, editProject)
  .put('/:id/assign', checkAuth(['SUPER_ADMIN', 'ADMIN']), validateEmployeeBody, assignEmployee)
  .delete('/:id', checkAuth(['SUPER_ADMIN', 'ADMIN']), deleteProject);

export default router;
