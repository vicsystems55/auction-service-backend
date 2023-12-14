import express from 'express';
import { createUser, fetchUsers } from '../controllers/userController.js';

const router = express.Router();

// Define user routes
router.get('/', fetchUsers);
router.post('/create', createUser);

export default router;
