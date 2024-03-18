import { RoomsEntity } from "@/entities/rooms.entity";
import { Repository, getRepository } from "typeorm";

export class RoomRepository extends Repository<RoomsEntity> {
  static async findALl(): Promise<RoomsEntity[]> {
    return await getRepository(RoomsEntity).find();
  }

  static async findOne(key: object): Promise<RoomsEntity> {
    return await getRepository(RoomsEntity).findOne({ where: key });
  }

  static async create(key: object): Promise<RoomsEntity> {
    return await getRepository(RoomsEntity).save(key);
  }

  static async update(id: number, key: object): Promise<RoomsEntity> {
    await getRepository(RoomsEntity).update(id, key);
    const updatedRoom: RoomsEntity =
      await getRepository(RoomsEntity).findOne(id);
    return updatedRoom;
  }

  static async delete(id: number): Promise<RoomsEntity> {
    const deletedRoom: RoomsEntity =
      await getRepository(RoomsEntity).findOne(id);
    await getRepository(RoomsEntity).delete(id);
    return deletedRoom;
  }
}
