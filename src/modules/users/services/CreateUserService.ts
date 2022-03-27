import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import User from '../typeorm/entities/User';
import UsersRepository from '../typeorm/repositories/UserRepository';

interface IRequest {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
}

class CreateUserService {
  public async execute({
    first_name,
    last_name,
    email,
    password,
  }: IRequest): Promise<User> {
    const usersRepository = getCustomRepository(UsersRepository);
    const userEmailExisis = await usersRepository.findByEmail(email);

    if (!userEmailExisis) {
      throw new AppError('Email address already exists');
    }

    const user = usersRepository.create({
      first_name,
      last_name,
      email,
      password,
    });

    await usersRepository.save(user);

    return user;
  }
}

export default CreateUserService;
