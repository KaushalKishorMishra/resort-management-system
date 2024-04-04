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

  static async softDelete(id: number): Promise<RoomsEntity> {
    const deletedRoom: RoomsEntity =
      await getRepository(RoomsEntity).findOne(id);
    await getRepository(RoomsEntity)
      .createQueryBuilder()
      .softDelete()
      .where("id = :id", { id: id })
      .execute();
    return deletedRoom;
  }

  static async delete(id: number): Promise<RoomsEntity> {
    const deletedRoom: RoomsEntity =
      await getRepository(RoomsEntity).findOne(id);
    await getRepository(RoomsEntity).delete(id);
    return deletedRoom;
  }

  static async recover(id: number): Promise<RoomsEntity> {
    const recoveredRoom: RoomsEntity = await getRepository(RoomsEntity).findOne(
      id,
      {
        withDeleted: true,
      },
    );
    await getRepository(RoomsEntity)
      .createQueryBuilder()
      .restore()
      .where("id = :id", { id: id })
      .execute();
    return recoveredRoom;
  }


}
