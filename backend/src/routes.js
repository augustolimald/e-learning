import { Router } from 'express';

import authentication from './app/middlewares/auth';

const routes = new Router();
routes.use(authentication);

export default routes;
