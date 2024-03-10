import { TokenEntity } from "@/entities/tokens.entity";
import { Token } from "@/interfaces/tokens.interface";
import { getRepository, Repository } from "typeorm";

export class TokenRepository extends Repository<Token> {
  static async findAllToken(): Promise<Token[]> {
    return await getRepository(TokenEntity).find();
  }

  static async findOneToken(key: object): Promise<Token> {
    return await getRepository(TokenEntity).findOne({ where: key });
  }

  static async createToken(tokenData: Token): Promise<Token> {
    return await getRepository(TokenEntity).save(tokenData);
  }
}
