import { Router } from 'express';

import authentication from './app/middlewares/auth';
import controllers from './app/controllers';

const routes = new Router();

routes.post('/login', controllers.Login.login);
routes.post('/users', controllers.User.store);

routes.use(authentication);

routes.get('/users/:id', controllers.User.show);
routes.get('/users/:id/subscriptions', controllers.Subscription.index);
routes.post('/courses', controllers.Course.store);
routes.get('/courses', controllers.Course.index);
routes.get('/courses/:id', controllers.Course.show);
routes.post('/courses/:id/subscribe', controllers.Subscription.store);
routes.post('/courses/:id/progress', controllers.Subscription.progress);
routes.post('/courses/:id/final_test', controllers.Subscription.submit);

export default routes;
