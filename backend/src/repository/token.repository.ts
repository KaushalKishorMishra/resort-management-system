import { TokenEntity } from "@/entities/tokens.entity";
import { Token } from "@/interfaces/tokens.interface";
import { getRepository, Repository } from "typeorm";

export class TokenRepository extends Repository<Token> {
  static async findAllToken(): Promise<Token[]> {
    return await getRepository(TokenEntity).find();
  }
}
