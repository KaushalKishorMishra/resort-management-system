import { NextFunction, Request, Response } from "express";
import { Container } from "typedi";
import { User } from "@interfaces/users.interface";
import { UserService } from "@services/users.service";
import { UserRepository } from "@/repository/user.repository";

export class UserController {
  public user = Container.get(UserService);

  public getUsers = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      // const findAllUsersData: User[] = await this.user.findAllUser();
      const findAllUsersData: User[] = await UserRepository.findAll();

      res.status(200).json({ data: findAllUsersData, message: "findAll" });
    } catch (error) {
      next(error);
    }
  };

  public getUserById = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const userId = Number(req.params.id);
      const findOneUserData: User = await this.user.findUserById(userId);
      res.status(200).json({ data: findOneUserData, message: "findOne" });
    } catch (error) {
      next(error);
    }
  };

  public createUser = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const userData: User = req.body;
      const createUserData: User = await this.user.createUser(userData);
      res
        .status(201)
        .json({ data: createUserData, message: "Created user successfully" });
    } catch (error) {
      next(error);
    }
  };

  public verifyUser = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const {email,verification_token}= req.body;
      const verifyUserData: User = await this.user.verifyUser({email,verification_token});
      res
        .status(200)
        .json({ data: verifyUserData, message: "Verified user successfully" });
    } catch (error) {
      next(error);
    }
  };

  public loginUser = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const userData: User = req.body;
      console.log("1");
      const loginUserData: User = await this.user.loginUser(userData);
      console.log("6");
      res.status(200).json({
        status: 200,
        data: loginUserData,
        message: "Login successfully",
      });
    } catch (error) {
      next(error);
    }
  };

  public updateUser = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const userId = Number(req.params.id);
      const userData: User = req.body;
      const updateUserData: User = await this.user.updateUser(userId, userData);

      res
        .status(200)
        .json({
          status: 200,
          data: updateUserData,
          message: "Updated user successfully",
        });
    } catch (error) {
      next(error);
    }
  };

  public deleteUser = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const userId = Number(req.params.id);
      const deleteUserData: User = await this.user.deleteUser(userId);

      res
        .status(200)
        .json({ data: deleteUserData, message: "Deleted user successfully" });
    } catch (error) {
      next(error);
    }
  };
}
