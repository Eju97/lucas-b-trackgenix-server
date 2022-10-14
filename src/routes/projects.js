import express from 'express';

const router = express.Router();

router
  .get('/projects')
  .get('/projects/:id');

export default router;
