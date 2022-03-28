import { celebrate, Segments } from 'celebrate';
import { Router } from 'express';
import Joi from 'joi';
import SessionsController from '../controllers/SessionsController';

const sessionRouter = Router();

const sessionsController = new SessionsController();

sessionRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    },
  }),
  sessionsController.session,
);

export default sessionRouter;
