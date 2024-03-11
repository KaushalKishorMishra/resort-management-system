import { NextFunction, Request, Response } from "express";
import { Container } from "typedi";
import { User } from "@interfaces/users.interface";
import { UserService } from "@services/users.service";
import { UserRepository } from "@/repository/user.repository";
import { Token } from "@/interfaces/tokens.interface";
import { Service } from "@/utils/utils";
import { TokenRepository } from "@/repository/token.repository";
import { TokenService } from "@/services/token.service";
import { HttpException } from "@/exceptions/httpException";
import { NodeMailer } from "@/utils/nodeMailer";

export class UserController {
  public user = Container.get(UserService);
  public token = Container.get(TokenService);

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

      // user.service to save user data to database is called
      // repository is not called here rather called in service
      const createUserData: User = await this.user.createUser(userData);

      const tokenData: Token = {
        purpose: "verify-email",
        expires_in: Service.generateVerificationTime(new Date(), 5),
        value: Service.generateOTP(),
        userId: createUserData.id,
      };

      // token.service to create token and save to database
      let createToken: Token = await this.token.createToken(tokenData);

      if (!createToken) {
        throw new HttpException(409, `Token cant be created.`);
      }

      // send mail
      // await NodeMailer.sendEmail({
      //   from: "event-management@api.com",
      //   to: createUserData.email,
      //   subject: "Email Verification",
      //   text: `To verify your event management account use the OTP ${createToken.value}`,
      //   html: `<a href="https://localhost:3000/api/user/verify-email">Click to verify ${createToken.value}</a>`,
      // });

      res
        .status(201)
        .json({ data: createUserData, message: "Created user successfully." });
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
      const userData: User = req.body;
      const verifyUserData: User = await this.user.verifyUser(userData);
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

      res.status(200).json({
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
