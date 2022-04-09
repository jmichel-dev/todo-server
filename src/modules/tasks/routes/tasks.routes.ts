import isAuthenticated from '@shared/middlewares/isAuthenticated';
import { celebrate, Segments } from 'celebrate';
import { Router } from 'express';
import Joi from 'joi';
import TasksController from '../controllers/TasksController';

const taskRouter = Router();

const tasksController = new TasksController();

taskRouter.get('/', isAuthenticated, tasksController.index);
taskRouter.get(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  isAuthenticated,
  tasksController.show,
);
taskRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      title: Joi.string().required(),
      description: Joi.string().required(),
      done: Joi.boolean().required(),
    },
  }),
  isAuthenticated,
  tasksController.create,
);
taskRouter.put(
  '/',
  celebrate({
    [Segments.BODY]: {
      title: Joi.string().required(),
      description: Joi.string().required(),
    },
  }),
  isAuthenticated,
  tasksController.update,
);
taskRouter.delete(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  isAuthenticated,
  tasksController.delete,
);

export default taskRouter;
