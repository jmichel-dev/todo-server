import { Router } from 'express';
import sessionRouter from '@modules/users/routes/sessions.routes';
import userRouter from '@modules/users/routes/users.routes';
import passwordRouter from '@modules/users/routes/password.routes';

const routes = Router();

routes.use('/users', userRouter);
routes.use('/auth', sessionRouter);
routes.use('/password', passwordRouter);

export default routes;
