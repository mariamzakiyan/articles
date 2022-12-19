import { Router } from 'express';
import ArticleController from '../controllers/article.js';
import authorize from '../middlewares/authorization.js';
import roles from '../constants/roles.js';

const router = Router();

// publish article
router.post(
  '/article',
  authorize([roles.MODERATOR]),
  (req, res, next) => ArticleController.create(req, res, next)
);

// get articles list with user and category
router.get(
  '/article',
  authorize([]),
  (req, res, next) => ArticleController.list(req, res, next)
);

export default router;
