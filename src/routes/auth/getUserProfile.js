import express from 'express';
import checkAuth from '../../middlewares/authMiddleware';
import getUserProfile from '../../controllers/getUserProfile';

const router = express.Router();

router.get('/', checkAuth(['SUPER_ADMIN', 'ADMIN', 'EMPLOYEE']), getUserProfile);

export default router;
