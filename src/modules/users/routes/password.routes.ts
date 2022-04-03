import { Router } from 'express';
import Joi from 'joi';
import { celebrate, Segments } from 'celebrate';
import ResetPasswordController from '../controllers/ResetPasswordController';
import SendForgotPasswordController from '../controllers/SendForgotPasswordController';

const passwordRouter = Router();

const resetPasswordController = new ResetPasswordController();
const sendForgotPasswordController = new SendForgotPasswordController();

passwordRouter.post(
  '/reset',
  celebrate({
    [Segments.BODY]: {
      token: Joi.string().uuid().required(),
      password: Joi.string().required(),
      password_confirmation: Joi.string().required().valid(Joi.ref('password')),
    },
  }),
  resetPasswordController.create,
);

passwordRouter.post(
  '/forgot',
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().email().required(),
    },
  }),
  sendForgotPasswordController.create,
);

export default passwordRouter;
