import UsersRepository from '@modules/users/typeorm/repositories/UserRepository';
import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Task from '../typeorm/entities/Task';
import TasksRepository from '../typeorm/repositories/TasksRepository';

interface IRequest {
  task_id: string;
  title: string;
  owner_id: string;
  description: string;
}
export default class UpdateTaskService {
  public async execute({
    task_id,
    title,
    description,
    owner_id,
  }: IRequest): Promise<Task | undefined> {
    const userRepository = getCustomRepository(UsersRepository);
    const taskRepository = getCustomRepository(TasksRepository);

    const user_exists = await userRepository.findById(owner_id);

    if (!user_exists) {
      throw new AppError('User not found');
    }

    const task = await taskRepository.findTaskByOwnerAndId(owner_id, task_id);
    if (task) {
      task.title = title;
      task.description = description;

      await taskRepository.save(task);
    }

    return task;
  }
}
