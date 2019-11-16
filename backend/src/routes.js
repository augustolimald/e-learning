import multer from 'multer';
import { resolve } from 'path';
import express, { Router } from 'express';
import multerConfig from './config/multer';
import controllers from './app/controllers';
import authentication from './app/middlewares/auth';

const routes = new Router();
const upload = multer(multerConfig);

routes.post('/users', controllers.User.store);
routes.post('/login', controllers.Login.login);
routes.post('/upload', upload.single('file'), controllers.Image.store);
routes.use('/image', express.static(resolve(__dirname, '..', 'tmp', 'img')));
routes.use('/certificate', express.static(resolve(__dirname, '..', 'tmp', 'certificate')));
routes.get('/courses', controllers.Course.index);

routes.use(authentication);

routes.get('/users/:id', controllers.User.show);
routes.get('/users/:id/subscriptions', controllers.Subscription.index);
routes.post('/courses', controllers.Course.store);
routes.get('/courses/:id', controllers.Course.show);
routes.post('/courses/:id/subscribe', controllers.Subscription.store);
routes.post('/courses/:id/progress', controllers.Subscription.progress);
routes.post('/courses/:id/final_test', controllers.Subscription.submit);
routes.get('/courses/:id/certificate', controllers.Subscription.certificate);

export default routes;
