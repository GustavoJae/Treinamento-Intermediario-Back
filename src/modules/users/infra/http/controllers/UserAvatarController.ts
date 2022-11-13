import UpdateUserAvatarService from "@modules/users/services/UpdateUserAvatarService";
import { Request, Response } from "express";
import { container } from "tsyringe";

export default class UserAvatarController {
  public async update(req: Request, res: Response): Promise<Response> {
    const updateUserAvatarService = container.resolve(UpdateUserAvatarService);

    const user = await updateUserAvatarService.execute({
        user_id: req.user.id,
        avatarFileName: req.file ? req.file.filename : '',
    });

    const { password: _,  ...userWithPassword} = user;

    return res.json(userWithPassword);
  }
}
