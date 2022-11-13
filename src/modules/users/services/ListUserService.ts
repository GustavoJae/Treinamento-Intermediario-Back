import { User } from "@prisma/client";
import { inject, injectable } from "tsyringe";
import IUsersRepository from "../repositories/IUsersRepository";
import { omit } from "underscore";
@injectable()
export default class ListUserService {
    constructor (
        @inject('UsersRepository')
        private usersRepository: IUsersRepository
    ) {}
    public async execute(): Promise<Omit<User, "password">[]>{
        const users = await this.usersRepository.list();
        return users.map((user) => omit(user, "password"));
    }
    
}