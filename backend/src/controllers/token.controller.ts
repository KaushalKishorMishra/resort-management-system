import { TokenService } from "@/services/token.service";
import { NextFunction, Request, Response } from "express";
import Container from "typedi";

export class TokenController {
  public token = Container.get(TokenService);

  public getTokens = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const findAllTokensData = await this.token.getTokens();
      res.status(200).json({ data: findAllTokensData, message: "findAll" });
    } catch (error) {
      next(error);
    }
  };
}
