import { Router } from 'express';
import sessionRouter from '@modules/users/routes/sessions.routes';
import userRouter from '@modules/users/routes/users.routes';
import passwordRouter from '@modules/users/routes/password.routes';
import taskRouter from '@modules/tasks/routes/tasks.routes';

const routes = Router();

routes.use('/users', userRouter);
routes.use('/auth', sessionRouter);
routes.use('/password', passwordRouter);
routes.use('/tasks', taskRouter);

export default routes;
