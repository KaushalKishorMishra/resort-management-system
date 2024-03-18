import { DataSource, getRepository, Repository } from "typeorm";
import { User } from "@/interfaces/users.interface";
import { UserEntity } from "@/entities/users.entity";

export class UserRepository extends Repository<User> {
  static async findAll(): Promise<User[]> {
    return await getRepository(UserEntity).find();
  }
  static async findOne(key: object): Promise<User> {
    return await getRepository(UserEntity).findOne({ where: key });
  }

  static async create(key: object): Promise<User> {
    return await getRepository(UserEntity).save(key);
  }

  static async update(id: number, key: object): Promise<User> {
    await getRepository(UserEntity).update(id, key);
    const updatedUser: User = await getRepository(UserEntity).findOne(id);
    return updatedUser;
  }

  static async delete(id: number): Promise<User> {
    const deletedUser: User = await getRepository(UserEntity).findOne(id);
    if (!deletedUser) return null;
    await getRepository(UserEntity).delete(id);
    return deletedUser;
  }
}
