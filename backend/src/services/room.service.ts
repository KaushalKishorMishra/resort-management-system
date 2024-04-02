import { Service } from "typedi";
import { EntityRepository, Repository } from "typeorm";
// import { UserRepository } from "../repository/user.repository";
import { RoomRepository } from "../repository/room.repository";
import { Rooms } from "@/interfaces/rooms.interface";

@Service()
@EntityRepository()
export class RoomService extends Repository<Rooms> {
  public async findAllRooms(): Promise<Rooms[]> {
    const rooms: Rooms[] = await RoomRepository.findALl();
    return rooms;
  }

  public async findOneRoom(key: object): Promise<Rooms> {
    const room: Rooms = await RoomRepository.findOne(key);
    if (!room) return null;
    return room;
  }

  public async findOneDeletedRoom(key: object): Promise<Rooms> {
    const room: Rooms = await RoomRepository.findOneDeleted(key);
    if (!room) return null;
    return room;
  }

  public async createRoom(roomData: Rooms): Promise<Rooms> {
    const createRoomData: Rooms = await RoomRepository.create(roomData);
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
