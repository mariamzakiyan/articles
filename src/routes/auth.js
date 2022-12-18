import { Router } from 'express';
import Models from '../models/models.js';
import AuthController from '../controllers/auth.js';
import Database from '../database.js';

const router = Router();
const { db } = Database.getInstance();
const models = new Models(db);
const authController = new AuthController(models);

// signup
router.post(
  '/signup',
  (req, res, next) => authController.signUp(req, res, next)
);

// singin
router.post(
  '/signin',
  (req, res, next) => authController.singin(req, res, next)
);

export default router;
