import { EntityRepository, Repository } from 'typeorm';
import Task from '../entities/Task';

@EntityRepository(Task)
export default class TasksRepository extends Repository<Task> {
  public async findByTitle(title: string): Promise<Task[] | undefined> {
    const tasks = await this.find({
      where: {
        title,
      },
    });

    return tasks;
  }

  public async findById(id: string): Promise<Task | undefined> {
    const task = await this.findOne({
      where: {
        id,
      },
    });

    return task;
  }

  public async findByOwner(owner_id: string): Promise<Task[] | undefined> {
    const tasks = await this.find({
      where: {
        owner_id,
      },
    });

    return tasks;
  }

  public async findTaskByOwnerAndId(
    owner_id: string,
    task_id: string,
  ): Promise<Task | undefined> {
    const task = await this.findOne({
      where: {
        owner_id,
        id: task_id,
      },
    });

    return task;
  }
}
