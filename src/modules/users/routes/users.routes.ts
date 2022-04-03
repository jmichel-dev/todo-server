import { Router } from 'express';
import Joi from 'joi';
import multer from 'multer';
import uploadConfig from '@config/upload';
import { celebrate, Segments } from 'celebrate';
import isAuthenticated from '@shared/middlewares/isAuthenticated';
import UsersController from '../controllers/UsersController';
import UserAvatarController from '../controllers/UserAvatarController';

const userRouter = Router();

const userControllers = new UsersController();
const avatarController = new UserAvatarController();

const upload = multer(uploadConfig);

userRouter.get('/', isAuthenticated, userControllers.index);
userRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      first_name: Joi.string().required(),
      last_name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    },
  }),
  userControllers.create,
);
userRouter.patch(
  '/avatar',
  isAuthenticated,
  upload.single('avatar'),
  avatarController.update,
);

export default userRouter;
