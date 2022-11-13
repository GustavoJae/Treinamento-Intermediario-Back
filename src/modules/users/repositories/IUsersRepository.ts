import { User } from '@prisma/client';
import ICreateUserDTO from "../dtos/ICreateUserDTO";

interface IUsersRepository{
    create(data: ICreateUserDTO): Promise<User>;
    findByEmail(email: string): Promise<User | null>;
    findByName(name: string): Promise<User | null>;
    findById(id: string): Promise<User | null>;
    update(user: User): Promise<User>;
    findByCpf(cpf:string): Promise<User | null>;
    list(): Promise<User[]>;
    delete(id: string): Promise<void>;
}

export default IUsersRepository;
