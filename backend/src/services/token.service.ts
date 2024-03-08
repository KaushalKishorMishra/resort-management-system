import { TokenEntity } from "@/entities/tokens.entity";
import { Token } from "@/interfaces/tokens.interface";
import { TokenRepository } from "@/repository/token.repository";
import { Service } from "typedi";
import { EntityRepository, Repository } from "typeorm";

@Service()
@EntityRepository()
export class TokenService extends Repository<TokenEntity> {
  // finds all the tokens
  public async getTokens(): Promise<Token[]> {
    const tokens: Token[] = await TokenRepository.findAllToken();
    return tokens;
  }

  
}
