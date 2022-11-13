import { User } from "@prisma/client";
import AppError from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";
import IUsersRepository from "../repositories/IUsersRepository";
import { omit } from "underscore";

interface IRequest{
    id: string;
}
@injectable()
export default class CreateUserService {
    constructor(
        @inject('UsersRepository')
        private userRepository: IUsersRepository
    ) {}
    public async execute({id}:IRequest): Promise<Omit<User, "password">>{
        const userWithThisId = await this.userRepository.findById(id);
        if (!userWithThisId) {
            throw new AppError('There is no user with this id')
        }
        
        return omit(userWithThisId, "password");
    }
}