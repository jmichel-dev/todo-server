import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import UsersRepository from '../typeorm/repositories/UserRepository';
import UserTokenRepository from '../typeorm/repositories/UserTokenRepository';

interface IRequest {
  email: string;
}

export default class SendForgotEmailService {
  public async execute({ email }: IRequest): Promise<void> {
    const userTokensRepository = getCustomRepository(UserTokenRepository);
    const userRepository = getCustomRepository(UsersRepository);

    const user = await userRepository.findByEmail(email);

    if (!user) {
      throw new AppError('User not found');
    }

    const { token } = await userTokensRepository.generate(user.id);

    console.log(token);

    // TODO - send email notification
  }
}
