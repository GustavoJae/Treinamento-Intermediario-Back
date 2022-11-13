import UsersRepository from "@modules/users/infra/prisma/repositories/UsersRespository";
import IUsersRepository from "@modules/users/repositories/IUsersRepository";
import { container } from "tsyringe";

container.registerSingleton<IUsersRepository>(
    'UsersRepository',
    UsersRepository,
);
