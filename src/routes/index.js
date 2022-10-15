import express from 'express';
import timeSheetsRouter from './time-sheets';

const router = express.Router();

router.use('/time-sheets', timeSheetsRouter);

export default router;
