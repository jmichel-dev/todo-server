import UsersRepository from '@modules/users/typeorm/repositories/UserRepository';
import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Task from '../typeorm/entities/Task';
import TasksRepository from '../typeorm/repositories/TasksRepository';

interface IRequest {
  owner_id: string;
  task_id: string;
}

export default class GetTaskService {
  public async execute({
    owner_id,
    task_id,
  }: IRequest): Promise<Task | undefined> {
    const userRepository = getCustomRepository(UsersRepository);
    const taskRepository = getCustomRepository(TasksRepository);

    const user_exists = await userRepository.findById(owner_id);

    if (!user_exists) {
      throw new AppError('User not found');
    }

    const task = await taskRepository.findTaskByOwnerAndId(owner_id, task_id);

    return task;
  }
}
