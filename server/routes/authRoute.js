import express from 'express'
const router = express.Router();
import { login, logout, sendVerifyOtp, signup, verifyEmail } from '../controllers/authController.js';
import protectRoute from '../middlewares/protectRoute.js';

router.post('/signup' , signup);
router.post('/login', login);
router.post('/logout', logout);
router.post('/send-verify-otp', protectRoute, sendVerifyOtp);
router.post('/verify-email', protectRoute, verifyEmail)

export default router