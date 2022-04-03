import path from 'path';
import fs from 'fs';
import uploadConfig from '@config/upload';
import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import User from '../typeorm/entities/User';
import UsersRepository from '../typeorm/repositories/UserRepository';

interface IRequest {
  user_id: string;
  avatarFilename: string | undefined;
}

export default class UpdateUserAvatarService {
  public async execute({ user_id, avatarFilename }: IRequest): Promise<User> {
    const userRepository = getCustomRepository(UsersRepository);

    const user = await userRepository.findById(user_id);

    if (!avatarFilename) {
      throw new AppError('Avatar not specified.');
    }

    if (!user) {
      throw new AppError('User not found');
    }

    if (user.avatar) {
      const currentUserAvatarFilePath = path.join(
        uploadConfig.directory,
        user.avatar,
      );
      const currentUserAvatarFileExists = await fs.promises.stat(
        currentUserAvatarFilePath,
      );

      if (currentUserAvatarFileExists) {
        await fs.promises.unlink(currentUserAvatarFilePath);
      }
    }

    user.avatar = avatarFilename;

    await userRepository.save(user);

    return user;
  }
}
