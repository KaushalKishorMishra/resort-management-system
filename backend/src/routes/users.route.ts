import { Router } from "express";
import { UserController } from "@controllers/users.controller";
import { CreateUserDto, LoginUserDto, ResendVerificationDto, VerifyUserDto } from "@dtos/users.dto";
import { Routes } from "@interfaces/routes.interface";
import { ValidationMiddleware } from "@middlewares/validation.middleware";

export class UserRoute implements Routes {
  public path = "/users";
  public router = Router();
  public user = new UserController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.user.getUsers);
    this.router.get(`${this.path}/:id(\\d+)`, this.user.getUserById);
    this.router.post(
      `${this.path}/create`,
      ValidationMiddleware(CreateUserDto),
      this.user.createUser,
    );
    this.router.put(
      `${this.path}/:id(\\d+)`,
      ValidationMiddleware(CreateUserDto, true),
      this.user.updateUser,
    );
    this.router.delete(`${this.path}/:id(\\d+)`, this.user.deleteUser);
    this.router.post(
      `${this.path}/login`,
      ValidationMiddleware(LoginUserDto),
      this.user.loginUser,
    );
    this.router.patch(
      `${this.path}/verify-user`,
      ValidationMiddleware(VerifyUserDto),
      this.user.verifyUser,
    );

    this.router.patch(
      `${this.path}/resend-verification`,
      ValidationMiddleware(ResendVerificationDto),
      this.user.resendVerification,
    );
  }
}
