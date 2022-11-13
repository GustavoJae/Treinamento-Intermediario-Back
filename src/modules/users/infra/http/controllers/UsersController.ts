import CreateUserService from "@modules/users/services/CreateUserService";
import DeleteUserService from "@modules/users/services/DeleteUserService";
import FindByIdService from "@modules/users/services/FindByIdService";
import ListUserService from "@modules/users/services/ListUserService";
import UpdateUserService from "@modules/users/services/UpdateUserService";
import { Request, Response } from "express";
import { container } from "tsyringe";

export default class UsersController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { name, email, password, birthDate, cpf, telephone } = req.body;

    const createUserService = container.resolve(CreateUserService);

    const user = await createUserService.execute({name, email, password, birthDate, cpf, telephone});

    return res.json(user)
  }
  public async update(req: Request, res:Response): Promise<Response> {
    const { name, email, password, birthDate, cpf, telephone} = req.body;
    const { id } = req.params;

    const updateUserService = container.resolve(UpdateUserService);

    const user = await updateUserService.execute({ id , name, email, password, birthDate, cpf, telephone});

    return res.json(user);
  }
  public async get(req: Request, res:Response): Promise<Response> {
    const listUserService = container.resolve(ListUserService);
    const users = await listUserService.execute();
    return res.json(users);
  }
  public async getUser(req: Request, res:Response): Promise<Response>{
    const { id } = req.params;
    const findByIdService = container.resolve(FindByIdService);
    const user = await findByIdService.execute( { id } );
    return res.json(user);
  }
  public async delete(req:Request, res:Response): Promise<Response>{
    const { id } = req.params;
    const deleteUserService = container.resolve(DeleteUserService);
    await deleteUserService.execute( { id } );
    return res.json({});
  }
}
