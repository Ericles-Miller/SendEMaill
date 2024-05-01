import { PrismaClient, Users } from "@prisma/client";
import { IUsersRepository } from "@infra/repositories/IUsersRepository";
import { UsersRepository } from "@infra/repositories/UsersRepository";
import { prisma } from "shared/infra/database";
import { Container } from "inversify";
import { BaseRepository } from "@infra/repositories/BaseRepository";
import { CreateUsersUseCase } from "API/controllers/CreateUsersUseCase";

export const container = new Container();

container.bind<IUsersRepository>(UsersRepository).toSelf().inSingletonScope();
container.bind<BaseRepository<Users>>('UsersRepository').to(UsersRepository)
container.bind<PrismaClient>('PrismaClient').toConstantValue(prisma);

container.bind<CreateUsersUseCase>(CreateUsersUseCase).toSelf()