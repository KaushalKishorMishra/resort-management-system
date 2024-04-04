import { Service } from "typedi";
import { EntityRepository, Repository } from "typeorm";
// import { UserRepository } from "../repository/user.repository";
import { RoomRepository } from "../repository/room.repository";
import { Rooms } from "@/interfaces/rooms.interface";
import { HttpException } from "@/exceptions/httpException";

@Service()
@EntityRepository()
export class RoomService extends Repository<Rooms> {
  public async findAllRooms(): Promise<Rooms[]> {
    const rooms: Rooms[] = await RoomRepository.findALl();
    if (!rooms) {
      throw new HttpException(404, "no rooms found");
    }
    return rooms;
  }

  public async findOneRoom(key: object): Promise<Rooms> {
    const room: Rooms = await RoomRepository.findOne(key);
    // if (!room) {
    //   throw new HttpException(404, "room not found");
    // }
    return room;
  }

  public async searchAvailableRooms({ startDate, endDate }): Promise<Rooms[]> {
    const rooms: Rooms[] = await RoomRepository.rangeSearch({
      startDate,
      endDate,
    });

    console.log(rooms);

    if (!rooms) {
      throw new HttpException(404, "rooms not available in the range");
    }
    return rooms;

  public async findOneDeletedRoom(key: object): Promise<Rooms> {
    const room: Rooms = await RoomRepository.findOneDeleted(key);
    if (!room) return null;
    return room;

  }

  public async createRoom(roomData: Rooms): Promise<Rooms> {
    const findRoom = await this.findOneRoom({ name: roomData.name });
    if (findRoom) throw new HttpException(401, "room already exists");

    const createRoomData: Rooms = await RoomRepository.create(roomData);
    if (!createRoomData) throw new HttpException(401, "could not create room");
    return createRoomData;
  }

  public async updateRoom(roomId: number, roomData: object): Promise<Rooms> {
    const updateRoomData: Rooms = await RoomRepository.update(roomId, roomData);
    return updateRoomData;
  }

  public async softDeleteRoom(roomId: number): Promise<Rooms> {
    const deleteRoomData: Rooms = await RoomRepository.softDelete(roomId);
    if (!deleteRoomData) return null;
    return deleteRoomData;
  }

  public async hardDeleteRoom(roomId: number): Promise<Rooms> {
    const deleteRoomData: Rooms = await RoomRepository.delete(roomId);
    if (!deleteRoomData) return null;
    return deleteRoomData;
  }

  public async recoverRoom(roomId: number): Promise<Rooms> {
    // fix any type
    const recoverRoomData: any = await RoomRepository.recover(roomId);
    if (!recoverRoomData) return null;
    return recoverRoomData;
  }
}
