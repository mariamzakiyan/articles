import { Router } from 'express';
import Models from '../models/models.js';
import CategoryController from '../controllers/category.js';
import Database from '../database.js';
import verifyToken from '../middlewares/authentication.js';
import permit from '../middlewares/authorization.js';
import roles from '../constants/roles.js';

const router = Router();
const { db } = Database.getInstance();
const models = new Models(db);
const categoryController = new CategoryController(models);

// create category
router.post(
  '/category',
  verifyToken,
  permit([roles.ADMIN, roles.MODERATOR]),
  (req, res, next) => categoryController.create(req, res, next)
);

// get categories list
router.get(
  '/category',
  verifyToken,
  (req, res, next) => categoryController.list(req, res, next)
);

// delete category, only admin role allowed
router.delete(
  '/category/:id',
  verifyToken,
  permit([roles.ADMIN]),
  (req, res, next) => categoryController.delete(req, res, next)
);

export default router;
