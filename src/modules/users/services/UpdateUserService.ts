import { User } from "@prisma/client";
import AppError from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";
import IUsersRepository from "../repositories/IUsersRepository";

interface IRequest {
    id: string;
    name: string;
    email: string;
    password: string;
    birthDate: Date;
    cpf: string;
    telephone: string;
}
@injectable()
export default class UpdateUserService {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository
    ) {}
    public async execute({ id, name, email, password, birthDate, cpf, telephone}: IRequest): Promise<Omit<User, "password">> {
        if (!id){
            throw new AppError('You cannot update a user without a id')
        }
        if (!name){
            throw new AppError('You cannot update a user without a name')
        };
        if (!email){
            throw new AppError('You cannot update a user without an email')
        };
        if (!password){
            throw new AppError('You cannot update a user without a password')
        };
        if (!birthDate){
            throw new AppError('You cannot update a user without a birth date')
        };
        if (!cpf){
            throw new AppError('You cannot update a user without a CPF')
        };
        if (!telephone){
            throw new AppError('You cannot update a user wihout a telephone')
        };

        const checkIfUserWIthSameCpf = await this.usersRepository.findByCpf(cpf);
        if (checkIfUserWIthSameCpf && checkIfUserWIthSameCpf.id !== id ) {
            throw new AppError('This cpf is already used')
        }
        
        const user = await this.usersRepository.findById(id);
        if (!user) {
            throw new AppError('There is no user with this Id')
        }
        user.name = name;
        user.birthDate = birthDate;
        user.cpf = cpf;
        user.email = email;
        user.password = password;
        user.telephone = telephone;
        await this.usersRepository.update(user);
        const { password: _, ...userWithoutPassword } = user;
        return userWithoutPassword;
    }



}