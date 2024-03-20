import { NextFunction, Request, Response } from "express";
import { Container } from "typedi";
import { User } from "@interfaces/users.interface";
import { UserService } from "@services/users.service";
import { UserRepository } from "@/repository/user.repository";
import { Token } from "@/interfaces/tokens.interface";
import { Utils } from "@/utils/utils";
import { TokenRepository } from "@/repository/token.repository";
import { TokenService } from "@/services/token.service";
import { HttpException } from "@/exceptions/httpException";
import { NodeMailer } from "@/utils/nodeMailer";
import { Payload } from "@/interfaces/payload.interface";
import { PayloadPurpose } from "@/enums/payload.enum";
import { Jwt } from "@/utils/jwt";
import { UserRole } from "@/enums/users.enum";
import { GetProfile } from "@/interfaces/getProfile.interface";

export class UserController {
  public user = Container.get(UserService);
  public token = Container.get(TokenService);

  public getUsers = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const { email } = req.body;
      const findAllUsersData: User[] = await this.user.findAllUser(email);

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
        expires_in: Utils.generateVerificationTime(new Date(), 5),
        value: Utils.generateOTP(),
        userId: createUserData.id,
      };

      // token.service to create token and save to database
      let createToken: Token = await this.token.createToken(tokenData);

      if (!createToken) {
        throw new HttpException(409, `Token cant be created.`);
      }

      // send mail
    //  await NodeMailer.test()
      await NodeMailer.sendEmail({
        from: "event-management@api.com",
        to: createUserData.email,
        subject: "Email Verification",
        text: `To verify your event management account use the OTP ${createToken.value}`,
        html: `<a href="https://localhost:3000/users/verify-email">Click to verify ${createToken.value}</a>`,
      });

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
      const { email, value } = req.body;

      const verifyUserData: User = await this.user.verifyUser({
        email,
        value,
      });
      res
        .status(200)
        .json({ data: verifyUserData, message: "Verified user successfully" });
    } catch (error) {
      next(error);
    }
  };

  public resendVerification = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const { email } = req.body;
      console.log(email);
      const resendVerificationData: Token =
        await this.user.resendVerification(email);

      if (resendVerificationData) {
        {
          // send mail
          await NodeMailer.sendEmail({
            from: "event-management@api.com",
            to: email,
            subject: "Email Verification",
            text: `To verify your event management account use the OTP ${resendVerificationData.value}`,
            html: `<a href="https://localhost:3000/users/verify-email">Click to verify ${resendVerificationData.value}</a>`,
          });

          res.status(201).json({
            data: resendVerificationData,
            message: "Resend Verification successfully.",
          });
        }
      }
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
      const { email, password } = req.body;
      const loginUserData: User = await this.user.loginUser({
        email,
        password,
      });

      //  payload
      const payload: Payload = {
        userId: loginUserData.id,
        email: loginUserData.email,
        type: loginUserData.role === "guest" ? UserRole.GUEST : UserRole.ADMIN,
        purpose: PayloadPurpose.LOGIN,
      };

      const jwt = Jwt.signJwt(payload, "1m");

      res.status(200).json({
        status: 200,
        data: loginUserData,
        message: "Login successfully",
        jwt: jwt,
      });
    } catch (error) {
      next(error);
    }
  };

  public forgotPassword = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const { email } = req.body;
      const forgotPasswordData: User = await this.user.forgotPassword({
        email,
      });

      const passwordResetToken: string = Utils.generateOTP();
      const passwordResetTime: Date = Utils.generateVerificationTime(
        new Date(),
        5,
      );

      const existingToken: Token[] = await TokenRepository.findAllToken({
        userId: forgotPasswordData.id,
      });

      if (existingToken) {
        for (const token of existingToken) {
          await TokenRepository.deleteToken(token.id, "reset-password");
        }
      }

      const newToken: Token = await TokenRepository.createToken({
        purpose: "reset-password",
        expires_in: passwordResetTime,
        value: passwordResetToken,
        userId: forgotPasswordData.id,
      });

      // send mail
      await NodeMailer.sendEmail({
        from: "event-management@api.com",
        to: forgotPasswordData.email,
        subject: "Email Verification",
        text: `To verify your event management account use the OTP ${newToken.value}`,
        html: `<a href="https://localhost:3000/api/user/verify-email">Click to verify ${newToken.value}</a>`,
      });

      // payload
      const payload: Payload = {
        userId: forgotPasswordData.id,
        email: forgotPasswordData.email,
        type:
          forgotPasswordData.role === "guest" ? UserRole.GUEST : UserRole.ADMIN,
        purpose: PayloadPurpose.RESET_PASSWORD,
      };

      const jwt = Jwt.signJwt(payload, "5m");

      res.status(201).json({
        status: 201,
        data: forgotPasswordData,
        message: "Password reset OTP sent successfully",
        jwt: jwt,
      });
    } catch (error) {
      next(error);
    }
  };

  public resetPassword = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const { email, password, password_reset_token } = req.body;
      const decoded = req.body.decoded;

      const passwordResetData: User = await this.user.resetPassword({
        email,
        password,
        password_reset_token,
        decoded,
      });

      // send mail
      await NodeMailer.sendEmail({
        from: "",
        to: email,
        subject: "Password Reset",
        text: `Your password has been reset successfully`,
        html: `<a href="https://localhost:3000/users/verify-email">Click to verify</a>`,
      })

      res.status(200).json({
        status: 200,
        data: passwordResetData,
        message: "Password Reset Successfully",
      });
    } catch (error) {
      next(error);
    }
  };

  public getProfile = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const decoded = req.body.decoded;
      const user_id = parseInt(req.params.user_id);
      const getProfileData: GetProfile | User = await this.user.getProfile(
        decoded,
        user_id,
      );
      res.status(200).json({
        status: 200,
        data: getProfileData,
        message: "Successfully get user profile",
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

  public verifyJwt = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    const decoded: Payload = req.body.decoded;
    try {
      if (decoded) {
        res.status(200).json({
          status: 200,
          data: decoded,
          message: "Jwt successfully verified",
          type: decoded.type,
          userId: decoded.userId,
          email: decoded.email,
        });
      } else {
        throw new HttpException(404, "Jwt not found");
      }
    } catch (error) {
      next(error);
    }
  };
}
