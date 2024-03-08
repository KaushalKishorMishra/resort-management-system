import { compare, compareSync, hash } from "bcrypt";
import { EntityRepository, Repository } from "typeorm";
import { Service } from "typedi";
import { UserEntity } from "@entities/users.entity";
import { HttpException } from "@/exceptions/httpException";
import { User } from "@interfaces/users.interface";
import { UserRepository } from "@/repository/user.repository";
import { Bcrypt } from "@/utils/bcrypt";

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
    const findUser: User = await UserEntity.findOne({
      where: { email: userData.email },
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

  public async verifyUser(userData: User): Promise<User> {
    const findUser: User = await UserRepository.findOne({
      email: userData.email,
    });
    if (!findUser) throw new HttpException(404, "User doesn't exist");
    if (findUser.isVerified === true)
      throw new HttpException(401, "User is already verified");

    await UserEntity.update(findUser.id, { isVerified: true });
    return;
  }

  public async loginUser(userData: User): Promise<User> {
    const findUser: User = await UserRepository.findOne({
      email: userData.email,
    });
    if (!findUser) throw new HttpException(404, "User doesn't exist");
    if (findUser.isVerified === false)
      throw new HttpException(401, "User is not verified");
    const isPasswordMatching: boolean = await Bcrypt.comparePassword(
      userData.password,
      findUser.password,
    );

    if (!isPasswordMatching)
      throw new HttpException(40, "Password is not matching");

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
