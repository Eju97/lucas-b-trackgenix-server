import express from 'express';

import {
  deleteEmployee,
  editEmployee,
} from '../controllers/employees';

const router = express.Router();

router
  .delete('/:id', deleteEmployee)
  .put('/:id', editEmployee);

export default router;
