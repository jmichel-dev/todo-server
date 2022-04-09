import UsersRepository from '@modules/users/typeorm/repositories/UserRepository';
import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Task from '../typeorm/entities/Task';
import TasksRepository from '../typeorm/repositories/TasksRepository';

interface IRequest {
  title: string;
  description: string;
  owner_id: string;
  done: boolean;
  done_at?: Date;
}

export default class CreateTaskService {
  public async execute({
    title,
    description,
    owner_id,
    done = false,
  }: IRequest): Promise<Task> {
    const taskRepository = getCustomRepository(TasksRepository);
    const userRepository = getCustomRepository(UsersRepository);

    const user_exists = await userRepository.findById(owner_id);

    if (!user_exists) {
      throw new AppError('User not found');
    }

    const task = taskRepository.create({
      title,
      description,
      owner_id,
      done,
    });

    await taskRepository.save(task);

    return task;
  }
}
