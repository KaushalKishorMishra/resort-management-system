import { HttpException } from "@/exceptions/httpException";
import { Rooms } from "@/interfaces/rooms.interface";
import { RoomService } from "@/services/room.service";
import { NextFunction, Request, Response } from "express";
import Container from "typedi";

export class RoomController {
  public room = Container.get(RoomService);

  public getRoom = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const rooms: Rooms[] = await this.room.findAllRooms();
      if (!rooms) throw new HttpException(404, "no rooms found");
      res
        .status(200)
        .json({ status: 200, data: rooms, message: "findAll room" });
    } catch (error) {
      next(error);
    }
  };

  public getRoomById = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const roomId = req.params.roomId;

      const room: Rooms = await this.room.findOneRoom({ id: roomId });

      if (!room) throw new HttpException(404, "room not found");

      res.status(200).json({
        status: 200,
        data: room,
        message: "findOne room",
      });
    } catch (error) {
      next(error);
    }
  };

  public createRoom = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const roomData: Rooms = req.body;
      console.log(roomData);
      const findRoomData: Rooms = await this.room.findOneRoom({
        name: roomData.name,
      });

      console.log(findRoomData);
      if (null !== findRoomData) {
        throw new HttpException(401, "room already exists");
      }
      const createRoomData: Rooms = await this.room.createRoom(roomData);
      res.status(200).json({
        status: 200,
        data: createRoomData,
        message: "room created successfully",
      });
    } catch (error) {
      next(error);
    }
  };

  public updateRoom = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const roomId: number = Number(req.params.roomId);
      const roomData: Rooms = req.body;

      const findRoom: Rooms = await this.room.findOneRoom({ id: roomId });

      if (findRoom.id == roomId) throw new HttpException(404, "room not found");

      const updateRoomData: Rooms = await this.room.updateRoom(
        roomId,
        roomData,
      );

      if (!updateRoomData)
        throw new HttpException(401, "could not update room");

      res.status(200).json({
        status: 200,
        data: updateRoomData,
        message: "successfully updated room",
      });
    } catch (error) {
      next(error);
    }
  };

  public deleteRoom = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const roomId: number = Number(req.params.roomId);

      const findRoom: Rooms = await this.room.findOneRoom({ id: roomId });

      if (roomId === findRoom.id)
        throw new HttpException(404, "room not found");

      const deletedRoom: Rooms = await this.room.deleteRoom(roomId);
      if (!deletedRoom) throw new HttpException(401, "could not delete room");

      res.status(200).json({
        status: 200,
        data: deletedRoom,
        message: "successfully deleted room",
      });
    } catch (error) {
      next(error);
    }
  };
}
