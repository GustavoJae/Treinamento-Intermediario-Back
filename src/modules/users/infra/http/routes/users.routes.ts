import { Router } from "express";
import multer from "multer";
import uploadConfig from "@config/upload";
import UserAvatarController from "../controllers/UserAvatarController";
import UsersController from "../controllers/UsersController";
import ensureAuthenticated from "../middlewares/ensureAuthenticated";

const usersRouter = Router();
const usersController = new UsersController();
const userAvatarController = new UserAvatarController();
const upload = multer(uploadConfig);


usersRouter.post('/', usersController.create);
usersRouter.patch('/avatar', ensureAuthenticated , upload.single('avatar'),userAvatarController.update);
usersRouter.put('/:id', ensureAuthenticated, usersController.update)
usersRouter.delete('/:id', ensureAuthenticated, usersController.delete)
usersRouter.get('/', ensureAuthenticated, usersController.get)
usersRouter.get('/:id', ensureAuthenticated, usersController.getUser)


export default usersRouter;