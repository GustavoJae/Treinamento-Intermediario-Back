import { inject, injectable } from "tsyringe";
import { sign, Secret } from "jsonwebtoken";

import { User } from "@prisma/client";

import AppError from "@shared/errors/AppError";
//import authConfig from "@config/auth";

//import IHashProvider from "@shared/container/providers/HashProvider/models/IHashProvider";
import IUsersRepository from "../repositories/IUsersRepository";
import { compare } from "bcryptjs";
import auth from "@config/auth";

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: User;
  token: string;
}

@injectable()
export default class AuthenticateUserService {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,

    //@inject("HashProvider")
    //private hashProvider: IHashProvider,
  ) {}

  public async execute({ email, password }: IRequest): Promise<IResponse> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError("Incorrect email/password combination", 401);
    }

    const passwordMatched = await compare(password, user.password);

    if (!passwordMatched) {
      throw new AppError("Incorrect email/password combination", 401);
    }

    const { secret, expiresIn } = auth.jwt;

    const token = sign({}, secret as Secret, {
      subject: user.id,
      expiresIn,
    });

    return {
      user,
      token,
    };
  }
}
