import { Router } from 'express';
import AuthController from '../controllers/auth.js';

const router = Router();

// signup
router.post(
  '/signup',
  (req, res, next) => AuthController.signUp(req, res, next)
);

// singin
router.post(
  '/signin',
  (req, res, next) => AuthController.singin(req, res, next)
);

export default router;
