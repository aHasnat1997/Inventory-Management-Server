import { Router } from "express";
import { UserController } from "./user.controller";
import validateRequest from "../../middlewares/validateRequest";
import { UserValidation } from "./user.validation";

const UserRoute = Router();

UserRoute.post(
  '/register',
  validateRequest(UserValidation.UserRegistrationValidationSchema),
  UserController.Registration
);
UserRoute.post(
  '/login',
  validateRequest(UserValidation.UserLoginValidationSchema),
  UserController.Login
);
UserRoute.post(
  '/logout',
  UserController.LogOut
);
UserRoute.get(
  '/refresh-token',
  UserController.NewAccessToken
);

export default UserRoute;