import { Router } from 'express';
import CategoryController from '../controllers/category.js';
import authorize from '../middlewares/authorization.js';
import roles from '../constants/roles.js';

const router = Router();

// create category
router.post(
  '/category',
  authorize([roles.ADMIN, roles.MODERATOR]),
  (req, res, next) => CategoryController.create(req, res, next)
);

// get categories list
router.get(
  '/category',
  authorize([]),
  (req, res, next) => CategoryController.list(req, res, next)
);

// delete category, only admin role allowed
router.delete(
  '/category/:id',
  authorize([roles.ADMIN]),
  (req, res, next) => CategoryController.delete(req, res, next)
);

export default router;
