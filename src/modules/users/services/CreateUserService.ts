import { User } from "@prisma/client";
import { hash } from "bcryptjs";
import AppError from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";
import IUsersRepository from "../repositories/IUsersRepository";

interface IRequest {
    name: string;
    email: string;
    password: string;
    birthDate: Date;
    cpf: string;
    telephone: string;
}

@injectable()
export default class CreateUserService {
    constructor(
        @inject('UsersRepository')
        private userRepository: IUsersRepository
    ) {}

    public async execute({name, email, password, birthDate, cpf, telephone}: IRequest): Promise<Omit<User, "password">> {

        if (!name){
            throw new AppError('You cannot create a user without a name')
        };
        if (!email){
            throw new AppError('You cannot create a user without an email')
        };
        if (!password){
            throw new AppError('You cannot create a user without a password')
        };
        if (!birthDate){
            throw new AppError('You cannot create a user without a birth date')
        };
        if (!cpf){
            throw new AppError('You cannot create a user without a CPF')
        };
        if (!telephone){
            throw new AppError('You cannot create a user wihout a telephone')
        };
        const checkIfUserWithSameEmailExists = await this.userRepository.findByEmail(email);

        const checkIfUserWithSameNameExists = await this.userRepository.findByName(name);

        if (checkIfUserWithSameEmailExists || checkIfUserWithSameNameExists) {
            throw new AppError('Email or name already used')
        };

        const checkIfUserWIthSameCpf = await this.userRepository.findByCpf(cpf);
        if (checkIfUserWIthSameCpf){
            throw new AppError('CPF already used')
        };

        const hashedPassword = await hash(password, 8);

        const user = await this.userRepository.create({
            name,
            email,
            password: hashedPassword,
            birthDate,
            cpf,
            telephone,
        });
        const { password: _, ...userWithoutPassword } = user;

        return userWithoutPassword;
        
    }
}