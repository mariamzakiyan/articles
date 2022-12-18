import express from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';
import http from 'http';
import config from './config.js';

import errorHandler from './middlewares/errorHandler.js';
import auth from './routes/auth.js';
import category from './routes/category.js';
import article from './routes/article.js';

const app = express();

app.set('port', config.APP_PORT);

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(auth);
app.use(category);
app.use(article);

app.use(errorHandler);

const server = http.createServer(app);
const port = app.get('port');
server.listen(port, () => {
  console.debug(`Application listening on ${port}`);
});

export default app;
