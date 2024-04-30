import { CreateUsersController } from "API/controllers/CreateUsersController";
import { Router } from "express";



export const usersRoutes = Router();

const createUsersController = new CreateUsersController();

usersRoutes.post('/', createUsersController.handle);
