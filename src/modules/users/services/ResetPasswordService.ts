import AppError from '@shared/errors/AppError';
import { hash } from 'bcryptjs';
import { addHours, isAfter } from 'date-fns';
import { getCustomRepository } from 'typeorm';
import UsersRepository from '../typeorm/repositories/UserRepository';
import UserTokenRepository from '../typeorm/repositories/UserTokenRepository';

interface IRequest {
  token: string;
  password: string;
}

export default class ResetPasswordService {
  public async execute({ token, password }: IRequest): Promise<void> {
    const userTokensRepository = getCustomRepository(UserTokenRepository);
    const userRepository = getCustomRepository(UsersRepository);

    const userToken = await userTokensRepository.findByToken(token);

    if (!userToken) {
      throw new AppError('Token was not found');
    }

    const user = await userRepository.findById(userToken.user_id);

    if (!user) {
      throw new AppError('User was not found');
    }

    const tokenCreatedAt = userToken.created_at;
    const compareData = addHours(tokenCreatedAt, 2);

    if (isAfter(Date.now(), compareData)) {
      throw new AppError('Token expired');
    }

    const hashedPassword = await hash(password, 8);

    user.password = hashedPassword;
    await userRepository.save(user);
  }
}
