import { Request, Response } from 'express';
import CreateTaskService from '../services/CreateTaskService';
import DeleteTaskService from '../services/DeleteTaskService';
import GetTaskService from '../services/GetTaskService';
import ListTaskService from '../services/ListTaskService';
import UpdateTaskService from '../services/UpdateTaskService';

export default class TasksController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { id: owner_id } = request.user;

    const listTaskService = new ListTaskService();
    const tasks = await listTaskService.execute(owner_id);

    return response.json(tasks);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { id: owner_id } = request.user;
    const { id: task_id } = request.params;

    const getTaskService = new GetTaskService();
    const task = await getTaskService.execute({ owner_id, task_id });

    return response.json(task);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { title, description, done } = request.body;
    const { id: owner_id } = request.user;

    const createTaskService = new CreateTaskService();
    const task = await createTaskService.execute({
      title,
      description,
      owner_id,
      done,
    });

    return response.json(task);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { title, description } = request.body;
    const { id: owner_id } = request.user;
    const { id: task_id } = request.params;

    const updateTaskService = new UpdateTaskService();
    const task = await updateTaskService.execute({
      task_id,
      title,
      description,
      owner_id,
    });

    return response.json(task);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id: owner_id } = request.user;
    const { id: task_id } = request.params;

    const deleteTaskService = new DeleteTaskService();
    await deleteTaskService.execute({ owner_id, task_id });

    return response.json();
  }
}
