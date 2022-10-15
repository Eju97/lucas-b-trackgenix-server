import express from 'express';
import employeesRoute from './employees';

const router = express.Router();

router.use('employeesRoute', employeesRoute);

export default router;
