import UsersRepository from '@modules/users/typeorm/repositories/UserRepository';
import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Task from '../typeorm/entities/Task';
import TasksRepository from '../typeorm/repositories/TasksRepository';

export default class ListTaskService {
  public async execute(owner_id: string): Promise<Task[] | undefined> {
    const userRepository = getCustomRepository(UsersRepository);
    const taskRepository = getCustomRepository(TasksRepository);

    const user_exists = await userRepository.findById(owner_id);

    if (!user_exists) {
      throw new AppError('User not found');
    }

    const tasks = await taskRepository.findByOwner(owner_id);

    return tasks;
  }
}
