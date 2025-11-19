import express from 'express'
import protectRoute from '../middlewares/protectRoute.js';
import { getUser } from '../controllers/userController.js';

const router = express.Router();

router.get('/get-user', protectRoute , getUser)

export default router