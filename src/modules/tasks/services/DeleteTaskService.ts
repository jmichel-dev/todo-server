import UsersRepository from '@modules/users/typeorm/repositories/UserRepository';
import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import TasksRepository from '../typeorm/repositories/TasksRepository';

interface IRequest {
  owner_id: string;
  task_id: string;
}

export default class DeleteTaskService {
  public async execute({ owner_id, task_id }: IRequest): Promise<void> {
    const userRepository = getCustomRepository(UsersRepository);
    const taskRepository = getCustomRepository(TasksRepository);

    const user_exists = await userRepository.findById(owner_id);

    if (!user_exists) {
      throw new AppError('User not found');
    }

    const task = await taskRepository.findTaskByOwnerAndId(owner_id, task_id);

    if (!task) {
      throw new AppError('Task not found');
    }

    await taskRepository.remove(task);
  }
}
