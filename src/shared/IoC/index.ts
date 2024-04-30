import { PrismaClient, Users } from "@prisma/client";
import { IUsersRepository } from "@repositories/IUsersRepository";
import { UsersRepository } from "@repositories/UsersRepository";
import { prisma } from "shared/infra/database";
import { Container } from "inversify";
import { BaseRepository } from "@repositories/BaseRepository";
import { CreateUsersUseCase } from "API/controllers/CreateUsersUseCase";

export const container = new Container();

container.bind<IUsersRepository>(UsersRepository).toSelf().inSingletonScope();
container.bind<BaseRepository<Users>>('UsersRepository').to(UsersRepository)
container.bind<PrismaClient>('PrismaClient').toConstantValue(prisma);

container.bind<CreateUsersUseCase>(CreateUsersUseCase).toSelf()