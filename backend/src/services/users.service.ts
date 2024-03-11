import { compare, compareSync, hash } from "bcrypt";
import { EntityRepository, Repository } from "typeorm";
import { Service } from "typedi";
import { UserEntity } from "@entities/users.entity";
import { HttpException } from "@/exceptions/httpException";
import { User } from "@interfaces/users.interface";
import { UserRepository } from "@/repository/user.repository";
import { Bcrypt } from "@/utils/bcrypt";
import { Token } from "@/interfaces/tokens.interface";
import { TokenRepository } from "@/repository/token.repository";
import { Utils } from "@/utils/utils";
import { Payload } from "@/interfaces/payload.interface";

@Service()
@EntityRepository()
export class UserService extends Repository<UserEntity> {
  public async findAllUser(): Promise<User[]> {
    const users: User[] = await UserRepository.findAll();
    return users;
  }

  public async findUserById(userId: number): Promise<User> {
    const findUser: User = await UserRepository.findOne({ id: userId });
    console.log(findUser);
    if (!findUser) throw new HttpException(409, "User doesn't exist");
    return findUser;
  }

  public async createUser(userData: User): Promise<User> {
    const findUser: User = await UserRepository.findOne({
      email: userData.email,
    });
    if (findUser)
      throw new HttpException(
        409,
        `This email ${userData.email} already exists`,
      );

    const hashedPassword = await Bcrypt.encryptPassword(userData.password);
    const createUserData: User = await UserRepository.create({
      ...userData,
      password: hashedPassword,
    });

    return createUserData;
  }

  public async verifyUser({ email, value }): Promise<User> {
    const findUser: User = await UserRepository.findOne({
      email: email,
    });

    if (!findUser) throw new HttpException(404, "User doesn't exist");
    if (findUser.isVerified === true)
      throw new HttpException(401, "User is already verified");

    const findToken: Token = await TokenRepository.findOneToken({
      userId: findUser.id,
      purpose: "verify-email",
    });

    if (!findToken) throw new HttpException(404, "Token not found");

    if (new Date() > findToken.expires_in) {
      throw new HttpException(401, "Email Verification token expired");
    } else if (value !== findToken.value) {
      throw new HttpException(401, "Invalid Verification token");
    }
    const verified_account: User = await UserRepository.update(findUser.id, {
      isVerified: true,
    });

    return verified_account;
  }

  public async resendVerification(email): Promise<Token> {
    const findUser: User = await UserRepository.findOne({ email: email });

    if (!findUser) throw new HttpException(404, "User doesn't exist");

    if (findUser.isVerified === true)
      throw new HttpException(401, "User is already verified");

    const newVerificationToken: string = Utils.generateOTP();
    const newVerificationTime: Date = Utils.generateVerificationTime(
      new Date(),
      5,
    );

    const findToken: Token = await TokenRepository.findOneToken({
      userId: findUser.id,
      purpose: "verify-email",
    });

    let newToken: Token;

    if (!findToken) {
      newToken = await TokenRepository.createToken({
        purpose: "verify-email",
        expires_in: newVerificationTime,
        value: newVerificationToken,
        userId: findUser.id,
      });
    } else {
      newToken = await TokenRepository.updateToken(findToken.id, {
        purpose: "verify-email",
        expires_in: newVerificationTime,
        value: newVerificationToken,
        userId: findUser.id,
      });
    }

    return newToken;
  }

  public async loginUser({ email, password }): Promise<User> {
    const findUser: User = await UserRepository.findOne({
      email: email,
    });

    if (!findUser) throw new HttpException(404, "User doesn't exist");

    if (findUser.isVerified === false)
      throw new HttpException(401, "User is not verified");

    const isPasswordMatching: boolean = await Bcrypt.comparePassword(
      password,
      findUser.password,
    );

    if (!isPasswordMatching) throw new HttpException(40, "Incorrect Password");

    return findUser;
  }

  public async forgotPassword({ email }): Promise<User> {
    const findUser: User = await UserRepository.findOne({ email: email });

    if (!findUser) throw new HttpException(404, "User doesn't exist");
    else if (findUser.isVerified === false)
      throw new HttpException(401, "User is not verified");

    return findUser;
  }

  public async updateUser(userId: number, userData: User): Promise<User> {
    const findUser: User = await UserEntity.findOne({ where: { id: userId } });
    if (!findUser) throw new HttpException(409, "User doesn't exist");

    const hashedPassword = await hash(userData.password, 10);
    await UserEntity.update(userId, { ...userData, password: hashedPassword });

    const updateUser: User = await UserEntity.findOne({
      where: { id: userId },
    });
    return updateUser;
  }

  public async deleteUser(userId: number): Promise<User> {
    const findUser: User = await UserEntity.findOne({ where: { id: userId } });
    if (!findUser) throw new HttpException(40, "User doesn't exist");

    await UserEntity.delete({ id: userId });
    return findUser;
  }
}
