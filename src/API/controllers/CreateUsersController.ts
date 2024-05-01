import { Request, Response } from "express";
import { CreateUsersUseCase } from "./CreateUsersUseCase";
import { container } from "@shared/IoC";


export class CreateUsersController {
  async handle(request: Request, response: Response) : Promise<Response> {
    const { name, email, password } = request.body;

    const createUsersUseCase = container.get(CreateUsersUseCase);

    await createUsersUseCase.create({email, name, password});

    return response.status(201).send();

  }
}