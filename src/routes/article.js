import { Router } from 'express';
import Models from '../models/models.js';
import ArticleController from '../controllers/article.js';
import Database from '../database.js';
import verifyToken from '../middlewares/authentication.js';
import permit from '../middlewares/authorization.js';
import roles from '../constants/roles.js';

const router = Router();
const { db } = Database.getInstance();
const models = new Models(db);
const articleController = new ArticleController(models);

// publish article
router.post(
  '/article',
  verifyToken,
  permit([roles.MODERATOR, roles.MEMBER]),
  (req, res, next) => articleController.create(req, res, next)
);

// get articles list with user and category
router.get(
  '/article',
  verifyToken,
  (req, res, next) => articleController.list(req, res, next)
);

export default router;
