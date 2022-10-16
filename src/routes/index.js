import express from 'express';
import employee from './employees';

const router = express.Router();

router.use('/Employees', employee);

export default router;
