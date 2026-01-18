import express from 'express';
import { register,login } from '../controller/user.controller.js';

const router = express.Router();

router.post('/register', register)
router.post('/login', login)
// router.post('/add-to-activity')
// router.post('/get-all-activity')

export default router;