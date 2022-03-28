import { Router } from 'express';
import sessionRouter from '@modules/users/routes/sessions.routes';
import userRouter from '@modules/users/routes/users.routes';

const routes = Router();

routes.use('/users', userRouter);
routes.use('/auth', sessionRouter);

export default routes;
