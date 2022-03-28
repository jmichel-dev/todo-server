import { Request, Response } from 'express';
import CreateSessionsService from '../services/CreateSessionsService';

export default class SessionsController {
  public async session(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { email, password } = request.body;

    const createSessionService = new CreateSessionsService();

    const user = await createSessionService.execute({ email, password });

    return response.json(user);
  }
}
