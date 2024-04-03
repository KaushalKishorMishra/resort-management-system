import { RoomsEntity } from "@/entities/rooms.entity";
import { Repository, UpdateResult, getRepository } from "typeorm";

export class RoomRepository extends Repository<RoomsEntity> {
  static async findALl(): Promise<RoomsEntity[]> {
    return await getRepository(RoomsEntity).find();
  }

  static async findOne(key: object): Promise<RoomsEntity> {
    return await getRepository(RoomsEntity).findOne({ where: key });
  }

  static async findOneDeleted(key: object): Promise<RoomsEntity> {
    return await getRepository(RoomsEntity).findOne({
      where: key,
      withDeleted: true,
    });
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


  static async recover(id: number): Promise<UpdateResult> {
    // fix type UpdateResult is placeholder
    const test: UpdateResult = await getRepository(RoomsEntity)
      .createQueryBuilder()
      .restore()
      .where("id = :id", { id: id })
      .execute();
    return test;
  }

  static async rangeSearch({ startDate, endDate }): Promise<RoomsEntity[]> {
    const findRangeData: RoomsEntity[] = await getRepository(RoomsEntity)
      .createQueryBuilder("rooms")
      .where("room.status BETWEEN :startDate AND :endDate", {
        startDate,
        endDate,
      })
      .getMany();
    return findRangeData;
  }
}
