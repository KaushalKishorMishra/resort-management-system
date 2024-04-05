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

  public getRoomByOption = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const roomOption: any = req.body;

      const room: Rooms = await this.room.findOneRoom(roomOption);

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
      const roomId = Number(req.params.id);

      const roomData: Rooms = req.body;

      const findRoom: Rooms = await this.room.findOneRoom({ id: roomId });

      if (findRoom.id !== roomId)
        throw new HttpException(404, "room doesn't exist");

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

  public softDeleteRoom = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const roomId = Number(req.params.id);

      const findRoom: Rooms = await this.room.findOneRoom({ id: roomId });

      if (roomId !== findRoom.id)
        throw new HttpException(404, "room not found");

      const deletedRoom: Rooms = await this.room.softDeleteRoom(roomId);
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

  public hardDeleteRoom = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const roomId = Number(req.params.id);

      const findRoom: Rooms = await this.room.findOneRoom({ id: roomId });

      if (roomId !== findRoom.id)
        throw new HttpException(404, "room not found");

      const deletedRoom: Rooms = await this.room.hardDeleteRoom(roomId);
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

  public recoverRoom = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const roomId = Number(req.params.id);

      const findRoom: Rooms = await this.room.findOneDeletedRoom({
        id: roomId,
      });

      if (roomId !== findRoom.id)
        throw new HttpException(404, "room not found");

      const recoverRoom: Rooms = await this.room.recoverRoom(roomId);
      if (!recoverRoom) throw new HttpException(401, "could not recover room");

      res.status(200).json({
        status: 200,
        data: recoverRoom,
        message: "successfully recovered room",
      });
    } catch (error) {
      next(error);
    }
  };
}
