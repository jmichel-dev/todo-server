import { Request, Response } from 'express';
import SendForgotEmailService from '../services/SendForgotEmailService';

export default class SendForgotPasswordController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { email } = request.body;

    const sendForgotEmailService = new SendForgotEmailService();

    await sendForgotEmailService.execute({ email });

    return response.status(204).json();
  }
}
